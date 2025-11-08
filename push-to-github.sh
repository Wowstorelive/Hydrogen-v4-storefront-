#!/bin/bash
# WowStore GitHub Push Script
# Run this to push your code to GitHub

set -e

echo "🚀 WowStore - Pushing to GitHub"
echo "================================"
echo ""

# Verify we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in the right directory!"
    echo "Please cd to: /home/claude/wowstore-hydrogen-oxygen"
    exit 1
fi

# Check if .env exists (shouldn't be committed)
if [ -f ".env" ]; then
    echo "✅ Found .env file (protected by .gitignore)"
fi

# Show what we're about to push
echo "📦 Files to push:"
git status --short
echo ""

# Show commits
echo "📝 Commits:"
git log --oneline -5
echo ""

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ SUCCESS! Code pushed to GitHub"
echo ""
echo "🎯 Next Steps:"
echo "1. Go to: https://github.com/Wowstorelive/Hydrogen-v4-storefront-"
echo "2. Verify your code is there"
echo "3. Go to Shopify Admin → Hydrogen → Create storefront"
echo "4. Connect this repository"
echo "5. Follow CHECKLIST.md for the rest"
echo ""
echo "🌊 WowStore deployment in progress! 🚀"
