# 🚀 WowStore Hydrogen - Oxygen Deployment Guide

## ✅ Your Configuration

**Shopify Store:**
- Store Domain: `dtf2yg-gg.myshopify.com`
- Primary Domain: `wowstore.live`  
- Storefront: `wowstore-live-e73ceb638e20e1167a63.o2.myshopify.dev`
- Customer Account: `account.wowstore.live`

**PostgreSQL CMS:**
- API URL: `https://api.wowstore.live`
- Already deployed and running ✅

**Target Deployment:**
- Platform: Shopify Oxygen (Official)
- Custom Domain: `shop.wowstore.live` (we'll configure this)

---

## 📋 Prerequisites (5 minutes)

### 1. Get Storefront API Token

1. Go to: **Shopify Admin** → **Settings** → **Apps and sales channels**
2. Click: **Develop apps** (top right)
3. Click: **Create an app** (or select existing)
   - App name: "WowStore Hydrogen Storefront"
4. Click: **Configure Storefront API scopes**
5. Check these scopes:
   - ✅ `unauthenticated_read_product_listings`
   - ✅ `unauthenticated_read_product_inventory`
   - ✅ `unauthenticated_read_product_tags`
   - ✅ `unauthenticated_write_checkouts`
   - ✅ `unauthenticated_read_checkouts`
6. Click: **Save**
7. Click: **Install app**
8. Copy the **Storefront API access token** (starts with `shpat_`)

### 2. Install Hydrogen Channel

1. Go to: **Shopify Admin** → **Settings** → **Apps and sales channels**
2. Visit: https://apps.shopify.com/hydrogen
3. Click: **Install**
4. Authorize the Hydrogen app

---

## 🚀 Deployment Steps (10 minutes)

### Step 1: Push to GitHub

```bash
cd /home/claude/wowstore-hydrogen-oxygen

# Initialize Git
git init
git branch -m main

# Configure Git
git config user.email "david@wowstore.live"
git config user.name "WowStore Team"

# Add all files
git add .

# Commit
git commit -m "Initial commit: WowStore Hydrogen on Oxygen"

# Add GitHub remote
git remote add origin https://github.com/Wowstorelive/Hydrogen-v4-storefront-.git

# Push to GitHub
git push -u origin main --force
```

### Step 2: Connect to Oxygen

1. **In Shopify Admin:**
   - Go to: **Sales channels** → **Hydrogen**
   - Click: **Create storefront**
   
2. **Storefront Setup:**
   - Name: `WowStore Production`
   - Select: **Set up GitHub continuous deployment now** ✅
   
3. **Connect GitHub:**
   - Select your GitHub account: `Wowstorelive`
   - Select repository: `Hydrogen-v4-storefront-`
   - Click: **Connect**

4. **Oxygen Creates:**
   - Pulls your code
   - Creates preview deployment
   - Opens PR for GitHub Actions workflow

### Step 3: Merge Oxygen Workflow

1. **Review PR:**
   - Shopify opens a PR in your repo
   - Adds `.github/workflows/oxygen-deployment-[ID].yml`
   - Click: **Review and merge on GitHub**

2. **Merge PR:**
   - Review the workflow file
   - Click: **Merge pull request**
   - Click: **Confirm merge**

3. **Automatic Deployment:**
   - Oxygen automatically deploys
   - Creates production environment
   - Generates preview URL

### Step 4: Configure Environment Variables

1. **In Hydrogen Storefront:**
   - Click: **Storefront settings**
   - Click: **Environment variables**

2. **Add Variables:**
   ```
   PUBLIC_STORE_DOMAIN = dtf2yg-gg.myshopify.com
   PUBLIC_STOREFRONT_API_TOKEN = shpat_[your_token]
   PUBLIC_STOREFRONT_API_VERSION = 2024-10
   PUBLIC_CMS_API_URL = https://api.wowstore.live
   PUBLIC_BLACK_FRIDAY_START = 2024-11-29T00:00:00Z
   PUBLIC_BLACK_FRIDAY_END = 2024-12-02T23:59:59Z
   PUBLIC_BLACK_FRIDAY_DISCOUNT = 25
   ```

3. **Click: Save**

4. **Oxygen will redeploy automatically**

### Step 5: Configure Custom Domain

1. **In Hydrogen Storefront:**
   - Click: **Domains**
   - Click: **Add domain**
   - Enter: `shop.wowstore.live`
   - Click: **Add**

2. **DNS Configuration:**
   - Add CNAME record in your DNS:
     ```
     Type: CNAME
     Name: shop
     Value: shops.myshopify.com
     TTL: 3600
     ```

3. **Wait for SSL:**
   - Oxygen automatically provisions SSL
   - Usually takes 5-15 minutes

---

## ✅ Verification (2 minutes)

### Test Your Deployment

```bash
# Check preview URL (from Oxygen dashboard)
curl -I https://your-preview-url.oxygen.shopifypreview.com

# After custom domain is configured
curl -I https://shop.wowstore.live
```

### What to Check:

- ✅ Black Friday banner displays
- ✅ Featured products load from Shopify
- ✅ PostgreSQL CMS navigation works
- ✅ SSL certificate is valid
- ✅ Page loads in < 2 seconds

---

## 🎯 Next Steps

### Enable PR Comments (Optional)

1. **In Hydrogen Storefront:**
   - Click: **Storefront settings**
   - Click: **Oxygen deployments**
   - Check: **Comment on pull requests**
   - Select: **Anyone with the link** (for easy sharing)

### Continuous Deployment

Every time you push to GitHub:
- Oxygen automatically builds
- Creates preview deployment
- Updates production on merge to main

---

## 📊 Architecture

```
Your Setup:
┌─────────────────────────────────────┐
│  GitHub Repository                   │
│  (Wowstorelive/Hydrogen-v4...)      │
└────────────┬────────────────────────┘
             │ (Auto Deploy)
             ↓
┌─────────────────────────────────────┐
│  Shopify Oxygen                      │
│  - Builds code                       │
│  - Deploys globally                  │
│  - Manages SSL                       │
│  - CDN distribution                  │
└────────────┬────────────────────────┘
             │
             ├──→ Shopify Storefront API
             │    (Products, Cart, Checkout)
             │
             └──→ PostgreSQL CMS API
                  (Pages, Navigation, Media)
                  https://api.wowstore.live
```

---

## 🔧 Troubleshooting

### Build Fails

**Check:**
1. Storefront API token is correct
2. All environment variables are set
3. Node version is 18+ (set in package.json)

**View logs:**
- Hydrogen Dashboard → Deployments → Click deployment → View logs

### Products Not Loading

**Check:**
1. Storefront API token has correct scopes
2. `PUBLIC_STORE_DOMAIN` is set correctly
3. Products are published in Shopify

### CMS Content Missing

**Check:**
1. `PUBLIC_CMS_API_URL` points to `https://api.wowstore.live`
2. PostgREST is running: `kubectl get pods -n production -l app=postgrest`
3. API is accessible: `curl https://api.wowstore.live/cms_pages?limit=1`

---

## 💡 Key Differences from GKE

| Aspect | Oxygen | GKE (Previous) |
|--------|--------|----------------|
| Deployment | GitHub push → Auto deploy | Manual kubectl apply |
| SSL | Automatic | Manual cert-manager |
| CDN | Included (global) | Manual setup |
| Scaling | Automatic | Manual HPA |
| Cost | Free tier available | GKE costs |
| Maintenance | Zero | K8s management |
| Support | Official Shopify | Community only |

---

## 🎉 Success!

Once deployed, you'll have:

✅ **Live at:** `https://shop.wowstore.live`
✅ **Black Friday ready**
✅ **PostgreSQL CMS** integrated
✅ **Shopify products** loading
✅ **Auto deployments** on push
✅ **Global CDN**
✅ **Automatic SSL**
✅ **Zero infrastructure management**

---

**Estimated Total Time: 15-20 minutes**

**Questions?** Check the Shopify Hydrogen docs:
- https://shopify.dev/docs/storefronts/headless/hydrogen/deployments/github
- https://shopify.dev/docs/storefronts/headless/hydrogen/getting-started
