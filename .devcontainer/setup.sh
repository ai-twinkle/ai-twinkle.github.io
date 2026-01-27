#!/bin/bash
# Wings - Dev Container Setup Script (Copied from star-inc/asuna)
# SPDX-License-Identifier: BSD-3-Clause (https://ncurl.xyz/s/mI23sevHR)

# Shell options
set -e

# Grant sudo permission
SUDO=""
if [ "$EUID" != 0 ]; then
    SUDO="sudo"
fi

# Install bun
curl -fsSL https://bun.sh/install | bash

# Install bun packages
NODE_ENV="development" \
    "$HOME/.bun/bin/bun" install

# Echo success message
echo "Setup completed successfully!"
echo "Please close all terminal instances and reopen them for the changes to take effect."
