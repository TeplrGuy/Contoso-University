# Azure Container Registry (shared across all environments)
# Only created in the "staging" workspace to avoid duplication
resource "azurerm_resource_group" "acr" {
  count    = local.env == "staging" ? 1 : 0
  name     = "rg-${local.project_name}-shared"
  location = local.location
}

resource "azurerm_container_registry" "acr" {
  count               = local.env == "staging" ? 1 : 0
  name                = local.acr_name
  resource_group_name = azurerm_resource_group.acr[0].name
  location            = azurerm_resource_group.acr[0].location
  sku                 = var.acr_sku
  admin_enabled       = false
}
