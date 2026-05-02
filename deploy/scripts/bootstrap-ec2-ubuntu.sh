#!/usr/bin/env bash
# Deprecated: use bootstrap-ec2.sh (supports Ubuntu and Amazon Linux / ec2-user).
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec bash "$SCRIPT_DIR/bootstrap-ec2.sh"
