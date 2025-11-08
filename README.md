# Owen Winter Theme Integration Package for WowStore

## 🎨 Overview

This package contains the **Owen Hydrogen Template (Winter Theme)** extracted and prepared for integration into the **WowStore Hydrogen v4** storefront. All Sanity, Supabase, and Algolia dependencies have been identified and prepared for replacement with WowStore's custom infrastructure.

**Target Site**: https://wowstore.live/  
**Repository**: https://github.com/Wowstorelive/Hydrogen-v4-storefront-  
**License**: Purchased (Order #482, October 20, 2025)

---

## 📦 What's Inside

### 📁 `owen-extracted/`
Complete Owen winter theme components, styles, and assets ready for integration.

```
owen-extracted/
├── components/
│   ├── winter/          # Winter theme Header, Footer, Layout
│   ├── global/          # Cart, Drawers, Context, Mega Menu
│   ├── elements/        # Buttons, Inputs, Icons, Modals
│   ├── cards/           # Product Cards, Bundle Cards
│   ├── product/         # Product Gallery, Options
│   ├── compare/         # Product Comparison
│   ├── wishlist/        # Wishlist Functionality
│   ├── search/          # Search & Recommendations
│   ├── account/         # Account Management
│   └── orderTracking/   # Order Tracking
├── styles/
│   ├── app.css          # Main stylesheet (535 lines)
│   ├── custom-font.css  # IBM Plex Serif font definitions
│   └── fonts/           # Font files (.woff2)
├── lib/                 # Utility functions
├── hooks/               # Custom React hooks
├── tailwind.config.js   # Tailwind CSS configuration
└── theme.config.ts      # Theme settings
```

### 📄 Documentation Files

1. **`INTEGRATION_GUIDE.md`** (12 phases, comprehensive)
   - Step-by-step integration instructions
   - Dependency management
   - CMS integration
   - Component migration
   - Testing and deployment

2. **`QUICK_START_FOR_CLAUDE_CODE.md`**
   - Quick reference for Claude Code
   - Checklist-based approach
   - Debugging tips
   - Progress tracking

3. **`owen-theme-dependencies-analysis.md`**
   - Complete dependency analysis
   - What to remove (Sanity, Supabase, Algolia)
   - What to keep (useful libraries)
   - Replacement strategy

4. **`wowstore-analysis.md`**
   - Current WowStore architecture
   - Existing features
   - Integration points
   - Custom CMS structure

5. **`LICENSE_AND_USAGE.md`**
   - Licensing information
   - Usage rights
   - Legal compliance
   - Package contents

---

## 🚀 Quick Start

### For Claude Code (Recommended)

```bash
# 1. Extract the package
tar -xzf owen-winter-theme-integration-package.tar.gz

# 2. Read the quick start guide
cat QUICK_START_FOR_CLAUDE_CODE.md

# 3. Follow the checklist
# Start with Phase 1 and work through systematically
```

### For Manual Integration

```bash
# 1. Extract the package
tar -xzf owen-winter-theme-integration-package.tar.gz

# 2. Read the comprehensive guide
cat INTEGRATION_GUIDE.md

# 3. Follow the 12-phase integration process
```

---

## 🎯 Integration Goals

### ✅ Keep
- Owen winter theme design and aesthetics
- Mega menu with animations
- Product features (compare, wishlist, bundles)
- Cart drawer and checkout flow
- Search UI components
- All styling and fonts

### ❌ Remove
- Sanity CMS (`@sanity/client`, `@portabletext/react`, `groq`)
- Supabase (`@supabase/supabase-js`)
- Algolia search (if present)
- All `sanityData` references

### 🔄 Replace
- Sanity CMS → Custom CMS at `api.wowstore.live`
- Supabase → Shopify Customer Account API
- Algolia → Vertex AI Search (Google Cloud)
- Remix v2 imports → React Router v7 imports

---

## 🚨 Critical Rules

### Import Conversion Required

Owen theme uses **Remix v2**, but WowStore uses **React Router v7**:

```typescript
// ❌ WRONG (Owen theme)
import { useLoaderData, Link, Form } from '@remix-run/react';

// ✅ CORRECT (WowStore)
import { useLoaderData, Link, Form } from 'react-router';

// ⚠️ NEVER USE
import { ... } from 'react-router-dom';
```

**Action Required**: Update ALL imports in ALL copied components.

### Data Structure Conversion

```typescript
// ❌ OLD (Owen theme with Sanity)
function Header({sanityData}) {
  const menu = sanityData?.menu;
  const settings = sanityData?.settings;
}

// ✅ NEW (WowStore with Custom CMS)
function Header({cmsMenu, cmsSettings}) {
  const menu = cmsMenu;
  const settings = cmsSettings;
}
```

---

## 📋 Integration Checklist

### Phase 1: Setup ✅
- [ ] Extract integration package
- [ ] Review all documentation
- [ ] Understand current WowStore architecture

### Phase 2: Dependencies ✅
- [ ] Install new npm packages
- [ ] Remove Sanity/Supabase/Algolia packages
- [ ] Update package.json

### Phase 3: Configuration ✅
- [ ] Update Tailwind config
- [ ] Copy styles (app.css, custom-font.css)
- [ ] Copy font files

### Phase 4: Components ✅
- [ ] Copy and update `elements/` components
- [ ] Copy and update `global/` components
- [ ] Copy and update `layouts/winter/` components
- [ ] Copy and update `cards/` components
- [ ] Copy and update `product/` components
- [ ] Copy and update `compare/` components
- [ ] Copy and update `wishlist/` components
- [ ] Copy and update `search/` components

### Phase 5: CMS Integration ✅
- [ ] Extend `app/lib/cms.client.ts`
- [ ] Add `getCMSSettings()` function
- [ ] Add `getCMSMenu()` function
- [ ] Add `getCMSModules()` function
- [ ] Update `app/root.tsx` loader

### Phase 6: Layout Integration ✅
- [ ] Update `PageLayout.tsx`
- [ ] Integrate `LayoutWinter`
- [ ] Pass CMS data to layout

### Phase 7: Mega Menu ✅
- [ ] Create custom `MegaMenu.tsx` (no Sanity)
- [ ] Implement dropdown animations
- [ ] Add mobile responsive design
- [ ] Connect to CMS menu data

### Phase 8: Testing ✅
- [ ] Homepage loads correctly
- [ ] Mega menu works
- [ ] Product pages render
- [ ] Cart functions
- [ ] Compare works
- [ ] Wishlist works
- [ ] Search works
- [ ] Mobile responsive
- [ ] No console errors

### Phase 9: Deployment ✅
- [ ] Build for production
- [ ] Deploy to Oxygen
- [ ] Verify live site

---

## 🔧 Technical Details

### Stack Comparison

| Component | Owen Theme | WowStore |
|-----------|-----------|----------|
| **Hydrogen** | 2025.1.2 | 2025.7.0 |
| **Router** | Remix v2 | React Router v7 |
| **CMS** | Sanity | Custom (api.wowstore.live) |
| **Database** | Supabase | Custom Backend |
| **Search** | Algolia | Vertex AI |
| **Auth** | Supabase | Shopify Customer Account API |

### New Dependencies to Install

```json
{
  "dependencies": {
    "@headlessui/react": "^1.7.2",
    "@tippyjs/react": "^4.2.6",
    "clsx": "^1.2.1",
    "embla-carousel-autoplay": "^7.1.0",
    "embla-carousel-react": "^7.1.0",
    "react-hot-toast": "^2.4.1",
    "react-i18next": "^13.4.0",
    "i18next": "^23.7.3",
    "i18next-browser-languagedetector": "^7.2.0",
    "i18next-http-backend": "^2.4.1",
    "react-intersection-observer": "^9.4.1",
    "react-use": "^17.4.0",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@tailwindcss/forms": "^0.5.3",
    "@tailwindcss/typography": "^0.5.9"
  }
}
```

### Dependencies to Remove

```json
{
  "dependencies": {
    "@sanity/client": "REMOVE",
    "@portabletext/react": "REMOVE",
    "@supabase/supabase-js": "REMOVE",
    "groq": "REMOVE"
  }
}
```

---

## 🎨 Design System

### Color Scheme (Winter Theme)

```css
:root {
  --color-primary: 20 20 20;        /* Dark text */
  --color-contrast: 255 255 255;    /* White backgrounds */
  --color-accent: 191 72 0;         /* Orange accent */
  --color-shop-pay: #5a31f4;        /* Shop Pay purple */
}
```

### Typography

- **Sans**: Helvetica Neue, system-ui
- **Serif**: IBM Plex Serif (included in package)

### Breakpoints

```javascript
screens: {
  sm: '32em',    // 512px
  md: '48em',    // 768px
  lg: '75em',    // 1200px
  xl: '90em',    // 1440px
  '2xl': '96em', // 1536px
}
```

---

## 🔌 CMS API Requirements

Your custom CMS at `api.wowstore.live` needs these endpoints:

### Required Endpoints

```typescript
// 1. Settings (replaces Sanity settings)
GET /cms_settings
Response: {
  header: {
    logo: {url, altText},
    topLinks: [{title, slug, newWindow}]
  },
  social: [{platform, url}],
  other: {
    shippingText: string,
    phoneNumber: string
  }
}

// 2. Menu (replaces Sanity menu)
GET /cms_menu
Response: {
  items: [{
    id, title, url,
    children: [{id, title, url, children: [...]}]
  }]
}

// 3. Modules (for homepage)
GET /cms_modules?page=home
Response: [{
  type: 'banner' | 'products' | 'text',
  data: {...}
}]

// 4. Pages (already exists)
GET /cms_pages?slug=eq.{slug}

// 5. Navigation (already exists)
GET /cms_navigation?order=sort_order
```

---

## 🐛 Common Issues & Solutions

### Issue: Import Errors

```bash
# Find all Remix imports
grep -r "@remix-run/react" app/

# Auto-replace with React Router
find app -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s/@remix-run\/react/react-router/g" {} +
```

### Issue: Sanity Data Undefined

```typescript
// Find all sanityData references
grep -r "sanityData" app/

// Replace with cmsSettings/cmsMenu
```

### Issue: Missing Styles

- Check `app/root.tsx` imports
- Verify Tailwind config path
- Ensure CSS files are in correct location

### Issue: Fonts Not Loading

- Check font file paths in `custom-font.css`
- Ensure fonts are in `app/styles/fonts/`
- Verify import in `root.tsx`

---

## 📊 Component Overview

### 238 Total Files in Owen Theme

**Extracted for Integration:**
- ✅ 100+ React components
- ✅ 3 main stylesheets
- ✅ 2 font files
- ✅ 10+ custom hooks
- ✅ 20+ utility functions

**Excluded (Sanity-specific):**
- ❌ `app/components/sanity/` (entire directory)
- ❌ `app/data/sanity/` (entire directory)
- ❌ Sanity client configurations
- ❌ Portable Text components

---

## 🎯 Success Criteria

You'll know the integration is successful when:

1. ✅ **Visual Match**: Site looks like Owen winter theme
2. ✅ **Mega Menu**: Dropdown navigation works smoothly
3. ✅ **Product Features**: Cards, gallery, variants all functional
4. ✅ **Cart**: Drawer opens, items add/remove correctly
5. ✅ **Compare**: Products can be compared side-by-side
6. ✅ **Wishlist**: Products can be saved
7. ✅ **Search**: Search UI displays results
8. ✅ **Mobile**: Responsive design works on all devices
9. ✅ **No Errors**: Console is clean, no Sanity/Supabase errors
10. ✅ **Build Success**: Production build completes without errors

---

## 🚀 Next Steps After Integration

1. **Vertex AI Integration**
   - Implement search API
   - Add product recommendations
   - Enable personalization

2. **Funnel System**
   - Build conversion funnels
   - Track user journeys
   - Optimize checkout flow

3. **POD Customization**
   - Product customizer UI
   - Design preview
   - Order processing

4. **Performance Optimization**
   - Code splitting
   - Lazy loading
   - Image optimization

5. **Analytics & Tracking**
   - Google Analytics
   - Conversion tracking
   - A/B testing

---

## 📞 Support & Resources

### Documentation
- `INTEGRATION_GUIDE.md` - Complete integration instructions
- `QUICK_START_FOR_CLAUDE_CODE.md` - Quick reference
- `owen-theme-dependencies-analysis.md` - Dependency details
- `wowstore-analysis.md` - Current architecture
- `LICENSE_AND_USAGE.md` - Licensing information

### External Resources
- [React Router v7 Docs](https://reactrouter.com/)
- [Hydrogen Docs](https://shopify.dev/docs/custom-storefronts/hydrogen)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Shopify CLI Docs](https://shopify.dev/docs/api/shopify-cli)

---

## 📅 Version History

**v1.0** (November 8, 2025)
- Initial extraction from Owen Hydrogen Template
- Removed Sanity/Supabase/Algolia dependencies
- Created comprehensive integration documentation
- Prepared for custom CMS integration
- Ready for Claude Code implementation

---

## ⚖️ Legal & Licensing

✅ **Legitimately Purchased**: Order #482, October 20, 2025  
✅ **Licensed for**: wowstore.live domain  
✅ **Customization Rights**: Full modification rights  
✅ **No Redistribution**: Not for resale or sharing  

See `LICENSE_AND_USAGE.md` for complete details.

---

## 🎉 Let's Build Something Amazing!

This package contains everything you need to integrate the beautiful Owen winter theme into WowStore while maintaining full control over your infrastructure.

**Ready to start?** Open `QUICK_START_FOR_CLAUDE_CODE.md` and let's go! 🚀

---

*Integration package prepared by Manus AI for WowStore*  
*November 8, 2025*
