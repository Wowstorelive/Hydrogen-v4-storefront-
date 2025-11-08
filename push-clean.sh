#!/bin/bash
# WowStore - Simple Clean Push Script
# This uses a completely new branch with no token history

set -e

echo "🚀 WowStore - Clean Push (No Token History)"
echo "============================================"
echo ""

# Verify we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in wowstore-hydrogen-oxygen directory!"
    exit 1
fi

echo "✅ Ready to push clean code"
echo ""

# Delete and recreate main branch from clean-main
echo "🔄 Creating fresh main branch..."
git branch -D main 2>/dev/null || true
git checkout -b main

echo "⬆️  Pushing to GitHub..."
echo ""

git push -u origin main --force

echo ""
echo "✅ SUCCESS! Clean code pushed to GitHub"
echo ""
echo "🎯 Next: Go to Shopify Admin → Hydrogen → Connect repository"
echo ""
