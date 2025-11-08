#!/bin/bash
# WowStore - Push Fixed Dependencies

set -e

echo "🔧 WowStore - Pushing Fixed Dependencies"
echo "========================================"
echo ""

if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in wowstore-hydrogen-oxygen directory!"
    exit 1
fi

echo "✅ Fixed npm dependencies with exact versions"
echo "✅ Added .npmrc configuration"
echo ""
echo "⬆️  Pushing to GitHub..."
echo ""

git push -u origin main --force

echo ""
echo "✅ SUCCESS! Fixed code pushed to GitHub"
echo ""
echo "🎯 Oxygen will now rebuild automatically"
echo "⏱️  Wait 2-3 minutes for deployment"
echo ""
