#!/bin/bash

# Exit immediately if a command fails
set -e

# Ensure Git LFS is set up (important for Render)
git lfs install
git lfs pull

# Install root, client, and server dependencies
npm install
npm run install-all

# Build frontend
npm run build-client