#!/bin/bash
# WowStore - Automated Git History Fix & Push Script
# This script removes the commits with tokens and pushes clean code

set -e

echo "🔧 WowStore - Git History Fix & Push"
echo "====================================="
echo ""

# Verify we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in the wowstore-hydrogen-oxygen directory!"
    echo "Please run: cd ~/Downloads/wowstore-hydrogen-oxygen"
    exit 1
fi

echo "✅ Found wowstore-hydrogen-oxygen directory"
echo ""

# Show current status
echo "📊 Current Git Status:"
git log --oneline -5
echo ""

# Reset to first commit (before tokens were added)
echo "🔄 Resetting to clean commit (removing token history)..."
git reset --soft ce97720

# Stage all current files
echo "📦 Staging all files..."
git add .

# Commit with clean history
echo "💾 Creating clean commit..."
git commit -m "Initial commit: WowStore Hydrogen for Oxygen (clean - no tokens)"

# Show new status
echo ""
echo "✅ New Git History:"
git log --oneline -3
echo ""

# Push with force (replaces GitHub history)
echo "⬆️  Pushing to GitHub (force push to replace history)..."
echo ""
echo "⚠️  You may need to enter your GitHub username and Personal Access Token"
echo ""

git push -u origin main --force

echo ""
echo "✅ SUCCESS! Code pushed to GitHub"
echo ""
echo "🎯 Next Steps:"
echo "1. Go to: https://github.com/Wowstorelive/Hydrogen-v4-storefront-"
echo "2. Verify your code is there (no tokens in history)"
echo "3. Go to Shopify Admin → Hydrogen → Create storefront"
echo "4. Connect this repository"
echo "5. Follow CHECKLIST.md for the rest"
echo ""
echo "🌊 WowStore is ready to deploy! 🚀"
