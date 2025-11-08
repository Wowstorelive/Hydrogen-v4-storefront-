# 🔐 Oxygen Environment Variables Configuration

## ⚠️ IMPORTANT: Never commit .env to Git!

Your `.env` file is protected by `.gitignore` - it will NOT be pushed to GitHub.

---

## 📋 Environment Variables for Oxygen

Copy these to your **Oxygen Dashboard** → **Storefront settings** → **Environment variables**:

### **Required Variables (Must Set in Oxygen)**

```bash
# Store Configuration
PUBLIC_STORE_DOMAIN=dtf2yg-gg.myshopify.com
PUBLIC_CHECKOUT_DOMAIN=wowstore.live
PUBLIC_STOREFRONT_API_VERSION=2024-10

# Storefront API (Public - safe to expose)
PUBLIC_STOREFRONT_API_TOKEN=[YOUR_STOREFRONT_TOKEN]

# Admin API (Private - server-side only)
PRIVATE_ADMIN_API_TOKEN=[YOUR_ADMIN_TOKEN]

# Customer Account API
CUSTOMER_ACCOUNT_API_CLIENT_ID=[YOUR_CUSTOMER_ACCOUNT_ID]

# PostgreSQL CMS
PUBLIC_CMS_API_URL=https://api.wowstore.live

# Black Friday
PUBLIC_BLACK_FRIDAY_START=2024-11-29T00:00:00Z
PUBLIC_BLACK_FRIDAY_END=2024-12-02T23:59:59Z
PUBLIC_BLACK_FRIDAY_DISCOUNT=25

# Site URL
PUBLIC_SITE_URL=https://shop.wowstore.live
```

---

## 🔒 Security Notes

### **PUBLIC_* Variables**
- ✅ Safe to expose to browser
- ✅ Used in client-side code
- Examples: `PUBLIC_STORE_DOMAIN`, `PUBLIC_STOREFRONT_API_TOKEN`

### **PRIVATE_* Variables**
- ⚠️ NEVER expose to browser
- ⚠️ Server-side only
- Examples: `PRIVATE_ADMIN_API_TOKEN`

### **Variables NOT Needed in Oxygen**
These are for local development only:
- `APP_API_KEY` - Not needed (OAuth not used in storefront)
- `APP_API_SECRET` - Not needed
- `PRIVATE_ACCESS_TOKEN` - Duplicate of PRIVATE_ADMIN_API_TOKEN
- `STORE_ID` - Not needed (derived from domain)

---

## 📝 How to Add Variables in Oxygen

1. **Login to Shopify Admin**
2. **Go to:** Sales channels → Hydrogen
3. **Select:** Your storefront (WowStore Production)
4. **Click:** Storefront settings
5. **Click:** Environment variables
6. **Add each variable:**
   - Name: `PUBLIC_STORE_DOMAIN`
   - Value: `dtf2yg-gg.myshopify.com`
   - Click: **Add**
7. **Repeat** for all variables above
8. **Click:** Save

**Result:** Oxygen automatically redeploys with new variables

---

## 🧪 Local Development

For local testing, your `.env` file works automatically:

```bash
# Start local dev server
npm run dev

# Variables are loaded from .env
# Open http://localhost:3000
```

---

## ✅ Verification

### **Check Variables in Oxygen:**

1. Go to: **Storefront settings** → **Environment variables**
2. Verify all variables are listed
3. Values should be hidden (for security)

### **Test After Deployment:**

1. Open your Oxygen preview URL
2. Check browser console (should see no errors)
3. Products should load from Shopify
4. Black Friday banner should display

---

## 🚨 Troubleshooting

### **Products Not Loading**

Check these variables are set:
- `PUBLIC_STORE_DOMAIN`
- `PUBLIC_STOREFRONT_API_TOKEN`
- `PUBLIC_STOREFRONT_API_VERSION`

### **Black Friday Banner Missing**

Check these variables:
- `PUBLIC_BLACK_FRIDAY_START`
- `PUBLIC_BLACK_FRIDAY_END`
- `PUBLIC_BLACK_FRIDAY_DISCOUNT`

### **CMS Content Not Loading**

Check this variable:
- `PUBLIC_CMS_API_URL=https://api.wowstore.live`

---

## 🔄 Updating Variables

**To change a variable:**

1. Go to: **Environment variables** in Oxygen
2. Click: **Edit** next to the variable
3. Update the value
4. Click: **Save**
5. Oxygen will prompt: **Redeploy environments?**
6. Click: **Redeploy production**

**Result:** Oxygen redeploys with new value (~2 minutes)

---

## 📊 Variable Summary

| Variable | Type | Required | Purpose |
|----------|------|----------|---------|
| PUBLIC_STORE_DOMAIN | Public | ✅ Yes | Your Shopify store |
| PUBLIC_STOREFRONT_API_TOKEN | Public | ✅ Yes | Product data access |
| PRIVATE_ADMIN_API_TOKEN | Private | ✅ Yes | Server operations |
| PUBLIC_CMS_API_URL | Public | ✅ Yes | PostgreSQL CMS |
| PUBLIC_CHECKOUT_DOMAIN | Public | ⚠️ Optional | Custom checkout |
| CUSTOMER_ACCOUNT_API_CLIENT_ID | Private | ⚠️ Optional | Customer accounts |
| BLACK_FRIDAY_* | Public | ⚠️ Optional | Sale configuration |

---

## ✅ Final Checklist

Before deploying, verify:

- [ ] All required variables added in Oxygen
- [ ] `.env` file is in `.gitignore` (protected)
- [ ] No credentials in Git history
- [ ] Variables match your actual Shopify store
- [ ] CMS API URL is correct

---

**Ready to deploy!** 🚀
