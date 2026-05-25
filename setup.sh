#!/bin/bash
echo "=== HSE Management System Setup ==="
echo ""
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js not found. Install from https://nodejs.org"
    exit 1
fi
echo "[1/2] Installing dependencies..."
npm install
echo ""
echo "[2/2] Starting development server at http://localhost:3000"
npm run dev
