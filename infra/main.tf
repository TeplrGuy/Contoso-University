terraform {
  required_version = ">= 1.5.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.80"
    }
  }

  backend "azurerm" {
    resource_group_name  = "rg-contoso-university-tfstate"
    storage_account_name = "stcontosounivtfstate"
    container_name       = "tfstate"
    key                  = "contoso-university.tfstate"
    use_oidc             = true
    use_azuread_auth     = true
  }
}

provider "azurerm" {
  features {}
  subscription_id            = var.subscription_id
  tenant_id                  = var.tenant_id
  use_oidc                   = true
  skip_provider_registration = true
}

locals {
  env          = terraform.workspace
  project_name = var.project_name
  location     = var.location
  # Environment-specific naming
  rg_name      = "rg-${local.project_name}-${local.env}"
  asp_name     = "asp-${local.project_name}-${local.env}"
  webapp_name  = local.env == "production" ? local.project_name : "${local.project_name}-${local.env}"
  # Shared ACR (environment-independent)
  acr_name     = replace("acr${local.project_name}", "-", "")
}
