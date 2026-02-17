#!/usr/bin/env bash
set -euo pipefail

#############################################################################
# az-bootstrap.sh
#
# Creates the foundational Azure resources needed before Terraform can run:
#   1. Resource Group for Terraform state
#   2. Storage Account + Blob Container for state backend
#   3. Service Principal with Contributor role
#
# Usage:
#   chmod +x scripts/az-bootstrap.sh
#   ./scripts/az-bootstrap.sh
#
# Prerequisites:
#   - Azure CLI installed and logged in (az login)
#   - Sufficient permissions to create resource groups, storage, and SPs
#
# This script is idempotent — safe to run multiple times.
#############################################################################

# ── Configuration ──────────────────────────────────────────────────────────
PROJECT_NAME="${PROJECT_NAME:-contoso-university}"
LOCATION="${LOCATION:-eastus}"
STATE_RG="${STATE_RG:-rg-${PROJECT_NAME}-tfstate}"
STATE_SA_NAME="${STATE_SA_NAME:-st$(echo "${PROJECT_NAME}" | tr -d '-')tfstate}"
STATE_CONTAINER="${STATE_CONTAINER:-tfstate}"
SP_NAME="${SP_NAME:-sp-${PROJECT_NAME}-github}"

# ── Helpers ────────────────────────────────────────────────────────────────
info()  { echo -e "\033[1;34m[INFO]\033[0m  $*"; }
ok()    { echo -e "\033[1;32m[OK]\033[0m    $*"; }
warn()  { echo -e "\033[1;33m[WARN]\033[0m  $*"; }

# ── 1. Resource Group for Terraform state ──────────────────────────────────
info "Creating resource group: ${STATE_RG}"
az group create \
  --name "${STATE_RG}" \
  --location "${LOCATION}" \
  --output none
ok "Resource group '${STATE_RG}' ready"

# ── 2. Storage Account + Container ─────────────────────────────────────────
info "Creating storage account: ${STATE_SA_NAME}"
az storage account create \
  --name "${STATE_SA_NAME}" \
  --resource-group "${STATE_RG}" \
  --location "${LOCATION}" \
  --sku Standard_LRS \
  --kind StorageV2 \
  --min-tls-version TLS1_2 \
  --allow-blob-public-access false \
  --output none
ok "Storage account '${STATE_SA_NAME}' ready"

info "Creating blob container: ${STATE_CONTAINER}"
az storage container create \
  --name "${STATE_CONTAINER}" \
  --account-name "${STATE_SA_NAME}" \
  --auth-mode login \
  --output none 2>/dev/null || true
ok "Blob container '${STATE_CONTAINER}' ready"

# ── 3. Service Principal ──────────────────────────────────────────────────
SUBSCRIPTION_ID=$(az account show --query id -o tsv)
TENANT_ID=$(az account show --query tenantId -o tsv)

info "Creating service principal: ${SP_NAME}"
SP_JSON=$(az ad sp create-for-rbac \
  --name "${SP_NAME}" \
  --role Contributor \
  --scopes "/subscriptions/${SUBSCRIPTION_ID}" \
  --sdk-auth 2>/dev/null || true)

if [ -z "${SP_JSON}" ]; then
  warn "Service principal may already exist. Resetting credentials..."
  SP_APP_ID=$(az ad sp list --display-name "${SP_NAME}" --query "[0].appId" -o tsv)
  SP_JSON=$(az ad sp create-for-rbac \
    --name "${SP_NAME}" \
    --role Contributor \
    --scopes "/subscriptions/${SUBSCRIPTION_ID}" \
    --sdk-auth)
fi

CLIENT_ID=$(echo "${SP_JSON}" | python3 -c "import sys,json; print(json.load(sys.stdin)['clientId'])")
CLIENT_SECRET=$(echo "${SP_JSON}" | python3 -c "import sys,json; print(json.load(sys.stdin)['clientSecret'])")

ok "Service principal '${SP_NAME}' ready"

# ── 4. Storage Account Key (for Terraform backend) ────────────────────────
STATE_SA_KEY=$(az storage account keys list \
  --account-name "${STATE_SA_NAME}" \
  --resource-group "${STATE_RG}" \
  --query "[0].value" -o tsv)

# ── Summary ────────────────────────────────────────────────────────────────
echo ""
echo "╔══════════════════════════════════════════════════════════════════════╗"
echo "║                    BOOTSTRAP COMPLETE                              ║"
echo "╠══════════════════════════════════════════════════════════════════════╣"
echo "║  Add these as GitHub Repository Secrets:                           ║"
echo "╠══════════════════════════════════════════════════════════════════════╣"
echo ""
echo "  AZURE_CREDENTIALS (entire JSON block below):"
echo "  ${SP_JSON}"
echo ""
echo "  ARM_CLIENT_ID=${CLIENT_ID}"
echo "  ARM_CLIENT_SECRET=${CLIENT_SECRET}"
echo "  ARM_SUBSCRIPTION_ID=${SUBSCRIPTION_ID}"
echo "  ARM_TENANT_ID=${TENANT_ID}"
echo ""
echo "  TF_STATE_STORAGE_ACCOUNT=${STATE_SA_NAME}"
echo "  TF_STATE_RESOURCE_GROUP=${STATE_RG}"
echo "  TF_STATE_CONTAINER=${STATE_CONTAINER}"
echo "  TF_STATE_KEY=${STATE_SA_KEY}"
echo ""
echo "╠══════════════════════════════════════════════════════════════════════╣"
echo "║  Next steps:                                                       ║"
echo "║  1. Add the secrets above to GitHub → Settings → Secrets           ║"
echo "║  2. Run the 'Infrastructure' workflow (infra.yml) manually         ║"
echo "║  3. After infra is provisioned, CI/CD pipelines will work          ║"
echo "╚══════════════════════════════════════════════════════════════════════╝"
