# 🌊 WowStore Hydrogen Storefront

> Ocean Conservation E-commerce powered by Shopify Hydrogen & Oxygen

## Overview

WowStore is a next-generation e-commerce platform that combines Shopify's Hydrogen framework with a custom PostgreSQL CMS. Every purchase contributes 5% to Ocean Conservancy's WowMoment program.

### Key Features

- ✅ **Shopify Oxygen** - Official hosting with global CDN
- ✅ **PostgreSQL CMS** - Custom content management
- ✅ **Black Friday Ready** - Automated sale banner (Nov 29 - Dec 2)
- ✅ **Auto Deployment** - Push to GitHub = auto deploy
- ✅ **27 AI Agents** - Multi-channel customer service
- ✅ **616 n8n Workflows** - Full automation

## Quick Start

### Prerequisites

- Node.js 18+
- Shopify store with Hydrogen app installed
- Storefront API token
- GitHub account

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:3000
```

### Deploy to Oxygen

See [DEPLOYMENT-OXYGEN.md](./DEPLOYMENT-OXYGEN.md) for complete deployment guide.

Quick version:
1. Get Storefront API token from Shopify
2. Push code to GitHub
3. Connect repository in Shopify Hydrogen channel
4. Merge Oxygen workflow PR
5. Configure environment variables
6. Done! 🎉

## Architecture

```
Hydrogen Storefront (Oxygen)
    ↓
    ├─► Shopify Storefront API
    │   └─► Products, Cart, Checkout
    │
    └─► PostgreSQL CMS API (api.wowstore.live)
        └─► Pages, Navigation, Media, SEO
```

## Configuration

### Environment Variables

Required variables (set in Oxygen dashboard):

```env
PUBLIC_STORE_DOMAIN=dtf2yg-gg.myshopify.com
PUBLIC_STOREFRONT_API_TOKEN=shpat_your_token_here
PUBLIC_STOREFRONT_API_VERSION=2024-10
PUBLIC_CMS_API_URL=https://api.wowstore.live
PUBLIC_BLACK_FRIDAY_START=2024-11-29T00:00:00Z
PUBLIC_BLACK_FRIDAY_END=2024-12-02T23:59:59Z
PUBLIC_BLACK_FRIDAY_DISCOUNT=25
```

### PostgreSQL CMS Integration

The storefront connects to your self-hosted PostgreSQL database:

- **API**: `https://api.wowstore.live` (PostgREST)
- **Tables**: `cms_pages`, `cms_media`, `cms_navigation`, `cms_seo_metadata`
- **Client**: `app/lib/cms.client.ts`

## Project Structure

```
wowstore-hydrogen-oxygen/
├── app/
│   ├── routes/
│   │   └── _index.tsx          # Homepage
│   ├── lib/
│   │   └── cms.client.ts       # PostgreSQL CMS client
│   ├── entry.server.tsx        # Server entry
│   └── root.tsx                # Root layout
├── public/                     # Static assets
├── server.ts                   # Oxygen server config
├── package.json                # Dependencies
├── vite.config.ts             # Build config
└── tsconfig.json              # TypeScript config
```

## Features

### Black Friday Sale

Automatic banner displays:
- **Dates**: Nov 29 - Dec 2, 2024
- **Discount**: 25% off
- **Message**: Ocean conservation theme
- **Location**: Homepage hero section

### PostgreSQL CMS

Custom content management:
- Pages with JSONB content
- Media library
- Navigation menus
- SEO metadata
- Site settings

### Shopify Integration

Full Storefront API integration:
- Product listings
- Product details
- Cart management
- Checkout flow
- Customer accounts

## Development

### Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run typecheck        # TypeScript validation

# Deployment
npm run deploy           # Deploy to Oxygen (CLI)
```

### Adding Routes

Create files in `app/routes/`:

```tsx
// app/routes/about.tsx
export default function About() {
  return <div>About Page</div>;
}
```

### Adding CMS Content

Use the CMS client:

```tsx
import {getCMSPageBySlug} from '~/lib/cms.client';

export async function loader() {
  const page = await getCMSPageBySlug('about');
  return {page};
}
```

## Deployment

### Oxygen (Recommended)

1. **Push to GitHub**
2. **Connect in Shopify**
3. **Auto deploys on every push**

See [DEPLOYMENT-OXYGEN.md](./DEPLOYMENT-OXYGEN.md) for details.

### Custom Domain

Configure `shop.wowstore.live`:
1. Add domain in Oxygen dashboard
2. Create CNAME: `shop.wowstore.live` → `shops.myshopify.com`
3. SSL auto-configured

## Monitoring

### Oxygen Dashboard

- View deployments
- Check logs
- Monitor performance
- View analytics

### PostgreSQL CMS

Check API health:
```bash
curl https://api.wowstore.live/cms_pages?limit=1
```

## Troubleshooting

### Build Fails

1. Check environment variables in Oxygen
2. Verify Storefront API token
3. Check build logs in Oxygen dashboard

### Products Not Loading

1. Verify Storefront API scopes
2. Check `PUBLIC_STORE_DOMAIN`
3. Ensure products are published

### CMS Content Missing

1. Check PostgREST is running
2. Verify `PUBLIC_CMS_API_URL`
3. Test API endpoint

## Support

- **Hydrogen Docs**: https://shopify.dev/docs/storefronts/headless/hydrogen
- **Oxygen Docs**: https://shopify.dev/docs/storefronts/headless/hydrogen/deployments
- **CMS API**: PostgREST at api.wowstore.live

## License

Proprietary - WowStore B.V.

---

Built with 💙 for Ocean Conservation
