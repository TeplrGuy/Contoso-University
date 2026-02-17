# ── ACR Outputs (only from staging workspace) ──────────────────────────
output "acr_login_server" {
  description = "ACR login server URL"
  value       = local.env == "staging" ? azurerm_container_registry.acr[0].login_server : "See staging workspace"
}

# ── Web App Outputs ────────────────────────────────────────────────────
output "webapp_name" {
  description = "Azure Web App name"
  value       = azurerm_linux_web_app.app.name
}

output "webapp_url" {
  description = "Azure Web App default hostname"
  value       = "https://${azurerm_linux_web_app.app.default_hostname}"
}

output "resource_group_name" {
  description = "Resource group name for this environment"
  value       = azurerm_resource_group.app.name
}
