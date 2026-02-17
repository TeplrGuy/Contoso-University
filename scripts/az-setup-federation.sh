#!/usr/bin/env bash
set -euo pipefail

#############################################################################
# az-setup-federation.sh
#
# Configures OIDC federated credentials on an Azure App Registration
# so GitHub Actions can authenticate WITHOUT any secrets.
#
# Usage:
#   chmod +x scripts/az-setup-federation.sh
#   ./scripts/az-setup-federation.sh
#
# Prerequisites:
#   - Azure CLI installed and logged in (az login)
#   - Sufficient permissions to manage App Registrations & role assignments
#
# This script is idempotent — safe to run multiple times.
#############################################################################

# ── Configuration ──────────────────────────────────────────────────────────
GITHUB_ORG="${GITHUB_ORG:-TeplrGuy}"
GITHUB_REPO="${GITHUB_REPO:-Contoso-University}"
APP_NAME="${APP_NAME:-sp-contoso-university-github}"
LOCATION="${LOCATION:-eastus}"

# ── Helpers ────────────────────────────────────────────────────────────────
info()  { echo -e "\033[1;34m[INFO]\033[0m  $*"; }
ok()    { echo -e "\033[1;32m[OK]\033[0m    $*"; }
warn()  { echo -e "\033[1;33m[WARN]\033[0m  $*"; }

SUBSCRIPTION_ID=$(az account show --query id -o tsv)
TENANT_ID=$(az account show --query tenantId -o tsv)

# ── 1. Create App Registration ────────────────────────────────────────────
info "Creating App Registration: ${APP_NAME}"
APP_ID=$(az ad app list --display-name "${APP_NAME}" --query "[0].appId" -o tsv 2>/dev/null)

if [ -z "$APP_ID" ] || [ "$APP_ID" = "None" ]; then
  APP_ID=$(az ad app create --display-name "${APP_NAME}" --query appId -o tsv)
  ok "Created App Registration with Client ID: ${APP_ID}"
else
  ok "App Registration already exists with Client ID: ${APP_ID}"
fi

# ── 2. Create Service Principal ───────────────────────────────────────────
info "Ensuring Service Principal exists"
SP_ID=$(az ad sp list --filter "appId eq '${APP_ID}'" --query "[0].id" -o tsv 2>/dev/null)

if [ -z "$SP_ID" ] || [ "$SP_ID" = "None" ]; then
  SP_ID=$(az ad sp create --id "${APP_ID}" --query id -o tsv)
  ok "Created Service Principal"
else
  ok "Service Principal already exists"
fi

# ── 3. Assign Contributor role ────────────────────────────────────────────
info "Assigning Contributor role to subscription"
az role assignment create \
  --assignee "${APP_ID}" \
  --role "Contributor" \
  --scope "/subscriptions/${SUBSCRIPTION_ID}" \
  --output none 2>/dev/null || true
ok "Contributor role assigned"

# ── 4. Add Federated Credentials ─────────────────────────────────────────
add_federated_credential() {
  local NAME="$1"
  local SUBJECT="$2"
  local DESCRIPTION="$3"

  info "Adding federated credential: ${NAME}"

  # Check if it already exists
  EXISTING=$(az ad app federated-credential list --id "${APP_ID}" --query "[?name=='${NAME}'].name" -o tsv 2>/dev/null)
  if [ -n "$EXISTING" ]; then
    ok "Federated credential '${NAME}' already exists — skipping"
    return
  fi

  az ad app federated-credential create --id "${APP_ID}" --parameters "{
    \"name\": \"${NAME}\",
    \"issuer\": \"https://token.actions.githubusercontent.com\",
    \"subject\": \"${SUBJECT}\",
    \"description\": \"${DESCRIPTION}\",
    \"audiences\": [\"api://AzureADTokenExchange\"]
  }" --output none

  ok "Added federated credential: ${NAME}"
}

# Main branch (push events)
add_federated_credential \
  "github-actions-main" \
  "repo:${GITHUB_ORG}/${GITHUB_REPO}:ref:refs/heads/main" \
  "GitHub Actions - main branch pushes"

# Pull requests
add_federated_credential \
  "github-actions-pr" \
  "repo:${GITHUB_ORG}/${GITHUB_REPO}:pull_request" \
  "GitHub Actions - pull requests"

# Staging environment
add_federated_credential \
  "github-actions-staging" \
  "repo:${GITHUB_ORG}/${GITHUB_REPO}:environment:staging" \
  "GitHub Actions - staging environment"

# Production environment
add_federated_credential \
  "github-actions-production" \
  "repo:${GITHUB_ORG}/${GITHUB_REPO}:environment:production" \
  "GitHub Actions - production environment"

# ── Summary ────────────────────────────────────────────────────────────────
echo ""
echo "╔══════════════════════════════════════════════════════════════════════╗"
echo "║                 OIDC FEDERATION SETUP COMPLETE                     ║"
echo "╠══════════════════════════════════════════════════════════════════════╣"
echo "║  No secrets needed! Add these as GitHub Repository Variables:      ║"
echo "╠══════════════════════════════════════════════════════════════════════╣"
echo ""
echo "  AZURE_CLIENT_ID=${APP_ID}"
echo "  AZURE_TENANT_ID=${TENANT_ID}"
echo "  AZURE_SUBSCRIPTION_ID=${SUBSCRIPTION_ID}"
echo ""
echo "╠══════════════════════════════════════════════════════════════════════╣"
echo "║  Go to: GitHub → Settings → Secrets and variables → Actions       ║"
echo "║  → Variables tab → Add the 3 variables above                      ║"
echo "║                                                                    ║"
echo "║  Then run the Infrastructure workflow (infra.yml) manually.        ║"
echo "║  No secrets required — OIDC handles authentication!               ║"
echo "╚══════════════════════════════════════════════════════════════════════╝"
