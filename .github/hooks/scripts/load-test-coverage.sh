#!/usr/bin/env bash
set -euo pipefail

CONFIG_FILE=".github/hooks/load-test-coverage.json"
STRICT_MODE="false"

if [ "${1:-}" = "--strict" ]; then
  STRICT_MODE="true"
fi

if [ ! -f "$CONFIG_FILE" ]; then
  echo "ℹ️  Load test coverage config not found at $CONFIG_FILE — skipping."
  exit 0
fi

node - "$CONFIG_FILE" "$STRICT_MODE" <<'NODE'
const fs = require('fs');
const path = require('path');

const [, , configPath, strictArg] = process.argv;
const strictMode = strictArg === 'true';

const root = process.cwd();
const raw = fs.readFileSync(path.resolve(root, configPath), 'utf8');
const config = JSON.parse(raw);
const routes = Array.isArray(config.routes) ? config.routes : [];
const threshold = Number(config.minimumCoveragePercent ?? 100);

if (routes.length === 0) {
  console.log('ℹ️  No load-test coverage routes configured.');
  process.exit(0);
}

const missing = routes.filter((item) => !fs.existsSync(path.resolve(root, item.scenario)));
const covered = routes.length - missing.length;
const coverage = Math.floor((covered / routes.length) * 100);

if (missing.length === 0) {
  console.log(`✅ Load test coverage: ${covered}/${routes.length} routes (${coverage}%)`);
  process.exit(0);
}

console.log(`⚠️  Load test coverage: ${covered}/${routes.length} routes (${coverage}%)`);
console.log(`⚠️  Required threshold: ${threshold}%`);
console.log('Missing load-test scenarios:');
for (const item of missing) {
  console.log(`  - ${item.route} -> ${item.scenario}`);
}

if (strictMode && coverage < threshold) {
  process.exit(1);
}
NODE
