# Per-environment resources: Resource Group + App Service Plan + Web App

resource "azurerm_resource_group" "app" {
  name     = local.rg_name
  location = local.location
}

resource "azurerm_service_plan" "app" {
  name                = local.asp_name
  resource_group_name = azurerm_resource_group.app.name
  location            = azurerm_resource_group.app.location
  os_type             = "Linux"
  sku_name            = var.app_service_sku
}

resource "azurerm_linux_web_app" "app" {
  name                = local.webapp_name
  resource_group_name = azurerm_resource_group.app.name
  location            = azurerm_resource_group.app.location
  service_plan_id     = azurerm_service_plan.app.id

  identity {
    type = "SystemAssigned"
  }

  site_config {
    application_stack {
      docker_registry_url = "https://${local.acr_name}.azurecr.io"
      docker_image_name   = "${local.project_name}:latest"
    }

    always_on = true
  }

  app_settings = {
    WEBSITES_ENABLE_APP_SERVICE_STORAGE  = "false"
    DOCKER_ENABLE_CI                     = "true"
    # Application Insights connection string — sourced from var.appinsights_connection_string.
    # Set TF_VAR_appinsights_connection_string (or a .tfvars file) to enable browser telemetry.
    # Vite bakes this value into the static bundle at build time; it is NOT a runtime secret.
    VITE_APPINSIGHTS_CONNECTION_STRING   = var.appinsights_connection_string
  }

  lifecycle {
    ignore_changes = [
      site_config[0].application_stack[0].docker_image_name,
    ]
  }
}
