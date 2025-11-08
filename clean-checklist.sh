#!/bin/bash
# Remove all token references from CHECKLIST.md

set -e

echo "🔧 Removing token references from CHECKLIST.md..."

# Replace the entire section 1
sed -i.bak '21,32d' CHECKLIST.md

# Insert clean version at line 21
sed -i.bak '20a\
\
### 1. Get Storefront API Token (5 min)\
\
**Get your Shopify credentials:**\
\
1. Go to: **Shopify Admin** → **Settings** → **Apps and sales channels**\
2. Click: **Develop apps**\
3. Create/select: "WowStore Hydrogen"\
4. Copy your **Storefront API token**\
\
✅ **Save your token** - you'\''ll need it for Oxygen!\
\
**Skip this step** - you'\''re ready to deploy!\
\
---\
' CHECKLIST.md

# Remove backup
rm -f CHECKLIST.md.bak

echo "✅ Cleaned CHECKLIST.md"
echo ""
echo "Now run:"
echo "  git add CHECKLIST.md"
echo "  git commit -m 'Remove all token references'"
echo "  git push -u origin main --force"
