variable "appinsights_connection_string" {
  description = "Azure Application Insights connection string. Set this via TF_VAR_appinsights_connection_string or a .tfvars file. The value is injected as the VITE_APPINSIGHTS_CONNECTION_STRING App Service Application Setting at deploy time so the browser SDK can send telemetry. Leave empty to disable telemetry."
  type        = string
  default     = ""
  sensitive   = true
}

variable "subscription_id" {
  description = "Azure Subscription ID"
  type        = string
  default     = ""
}

variable "tenant_id" {
  description = "Azure Tenant ID"
  type        = string
  default     = ""
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "contoso-university"
}

variable "location" {
  description = "Azure region for all resources"
  type        = string
  default     = "eastus"
}

variable "acr_sku" {
  description = "SKU for Azure Container Registry"
  type        = string
  default     = "Basic"
}

variable "app_service_sku" {
  description = "SKU for App Service Plan"
  type        = string
  default     = "B1"
}
