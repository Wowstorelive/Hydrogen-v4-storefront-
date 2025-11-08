# TODAY ONLY: Owen Winter Theme Integration

## ⏰ Time: 4-6 hours | Goal: Design live by end of day

**Repository**: https://github.com/Wowstorelive/Hydrogen-v4-storefront-  
**Live Site**: https://01k9gqzvxj1vhxtj3f8g1gfra3-6a8b530aeeafc79c3d92.myshopify.dev/

---

## 🚀 STEP 1: Setup (30 minutes)

### 1.1 Get the Package
```bash
cd /workspace
# Extract the integration package (already provided)
tar -xzf owen-winter-theme-integration-FINAL.tar.gz
```

### 1.2 Navigate to Repository
```bash
cd Hydrogen-v4-storefront-
```

### 1.3 Install Dependencies
```bash
npm install @headlessui/react@^1.7.2 @tippyjs/react@^4.2.6 clsx@^1.2.1 \
  embla-carousel-autoplay@^7.1.0 embla-carousel-react@^7.1.0 \
  react-hot-toast@^2.4.1 react-i18next@^13.4.0 i18next@^23.7.3 \
  i18next-browser-languagedetector@^7.2.0 i18next-http-backend@^2.4.1 \
  react-intersection-observer@^9.4.1 react-use@^17.4.0 uuid@^9.0.1

npm install -D @tailwindcss/forms@^0.5.3 @tailwindcss/typography@^0.5.9
```

---

## 🎨 STEP 2: Styles & Config (20 minutes)

### 2.1 Backup & Replace Tailwind Config
```bash
cp tailwind.config.js tailwind.config.js.backup
cp /workspace/owen-extracted/tailwind.config.js ./tailwind.config.js
```

**Edit `tailwind.config.js`** - Remove RTL plugin:
```javascript
import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // ... (keep all the extend config from owen-extracted)
    },
  },
  darkMode: 'class',
  plugins: [formsPlugin, typographyPlugin], // Removed rtlPlugin
};
```

### 2.2 Copy Styles
```bash
cp app/styles/app.css app/styles/app.css.backup
cp /workspace/owen-extracted/styles/app.css app/styles/app.css
cp /workspace/owen-extracted/styles/custom-font.css app/styles/custom-font.css
cp -r /workspace/owen-extracted/styles/fonts app/styles/
```

### 2.3 Update root.tsx for Fonts
**Edit `app/root.tsx`** - Add font import:

```typescript
import customFont from '~/styles/custom-font.css?url';

export function links() {
  return [
    {rel: 'preconnect', href: 'https://cdn.shopify.com'},
    {rel: 'preconnect', href: 'https://shop.app'},
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
    {rel: 'stylesheet', href: customFont}, // ADD THIS LINE
  ];
}
```

---

## 🧩 STEP 3: Core Components (90 minutes)

### 3.1 Copy All Component Directories
```bash
# Copy all at once
cp -r /workspace/owen-extracted/components/elements app/components/
cp -r /workspace/owen-extracted/components/global app/components/
cp -r /workspace/owen-extracted/components/cards app/components/
cp -r /workspace/owen-extracted/components/product app/components/
cp -r /workspace/owen-extracted/components/compare app/components/
cp -r /workspace/owen-extracted/components/wishlist app/components/
cp -r /workspace/owen-extracted/components/search app/components/
cp -r /workspace/owen-extracted/components/account app/components/

# Create layouts directory and copy winter theme
mkdir -p app/components/layouts
cp -r /workspace/owen-extracted/components/winter app/components/layouts/
```

### 3.2 Mass Import Update (CRITICAL!)
```bash
# Update ALL imports from Remix to React Router
find app/components -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i "s/@remix-run\/react/react-router/g" {} +

# Verify the changes
grep -r "@remix-run/react" app/components/ | wc -l
# Should return 0
```

### 3.3 Remove Sanity-Specific Component
```bash
rm -f app/components/elements/PortableTextContent.tsx
```

---

## 🎯 STEP 4: Custom MegaMenu (30 minutes)

**Create `app/components/global/MegaMenu.tsx`**:

```typescript
import {Link} from 'react-router';

type MenuItem = {
  id: string;
  title: string;
  url: string;
  children?: MenuItem[];
};

type MegaMenuProps = {
  menu: {items: MenuItem[]};
  showShipping?: boolean;
  wrapperClass?: string;
  shippingText?: string;
};

export function MegaMenu({
  menu,
  showShipping = false,
  wrapperClass = 'bg-black text-white w-full',
  shippingText,
}: MegaMenuProps) {
  if (!menu?.items) return null;

  return (
    <nav className={wrapperClass}>
      <div className="container">
        <div className="flex items-center justify-between h-14">
          <ul className="flex items-center gap-8">
            {menu.items.map((item) => (
              <li key={item.id} className="menu-item relative">
                <Link to={item.url} className="hover-effect">
                  <span data-title={item.title}>{item.title}</span>
                </Link>

                {item.children && item.children.length > 0 && (
                  <div className="dropdown-menu absolute left-0 top-full pt-4 z-50">
                    <div className="bg-white text-black shadow-lg p-6 rounded-lg min-w-[600px]">
                      <div className="grid grid-cols-3 gap-6">
                        {item.children.map((child) => (
                          <div key={child.id}>
                            <Link
                              to={child.url}
                              className="font-semibold text-lg mb-3 block hover:text-amber-500"
                            >
                              {child.title}
                            </Link>
                            {child.children && (
                              <ul className="space-y-2">
                                {child.children.map((subChild) => (
                                  <li key={subChild.id}>
                                    <Link
                                      to={subChild.url}
                                      className="text-sm text-gray-600 hover:text-amber-500 menu-link"
                                    >
                                      {subChild.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {showShipping && shippingText && (
            <div className="text-sm">{shippingText}</div>
          )}
        </div>
      </div>
    </nav>
  );
}
```

---

## 🔌 STEP 5: CMS Integration (30 minutes)

### 5.1 Extend CMS Client
**Edit `app/lib/cms.client.ts`** - Add these functions:

```typescript
const CMS_API_URL = 'https://api.wowstore.live';

// Existing functions stay...

// ADD THESE NEW FUNCTIONS:

export async function getCMSSettings() {
  try {
    const response = await fetch(`${CMS_API_URL}/cms_settings`);
    if (!response.ok) {
      // Mock data for development
      return {
        header: {
          logo: null,
          topLinks: [],
        },
        social: [],
        other: {
          shippingText: 'Free shipping on orders over €50',
          phoneNumber: '+31 20 123 4567',
        },
      };
    }
    return response.json();
  } catch (error) {
    console.error('CMS settings error:', error);
    return {
      header: {logo: null, topLinks: []},
      social: [],
      other: {shippingText: 'Free shipping', phoneNumber: ''},
    };
  }
}

export async function getCMSMenu() {
  try {
    const response = await fetch(`${CMS_API_URL}/cms_menu`);
    if (!response.ok) {
      // Mock data for development
      return {
        items: [
          {id: '1', title: 'Shop', url: '/collections/all', children: []},
          {id: '2', title: 'About', url: '/pages/about', children: []},
          {id: '3', title: 'Contact', url: '/pages/contact', children: []},
        ],
      };
    }
    return response.json();
  } catch (error) {
    console.error('CMS menu error:', error);
    return {
      items: [
        {id: '1', title: 'Shop', url: '/collections/all', children: []},
      ],
    };
  }
}
```

### 5.2 Update Root Loader
**Edit `app/root.tsx`** - Update imports and loader:

```typescript
import {getCMSSettings, getCMSMenu} from '~/lib/cms.client';

async function loadCriticalData({context}: Route.LoaderArgs) {
  const {storefront} = context;

  const [header, cmsSettings, cmsMenu] = await Promise.all([
    storefront.query(HEADER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        headerMenuHandle: 'main-menu',
      },
    }),
    getCMSSettings(),
    getCMSMenu(),
  ]);

  return {
    header,
    cmsSettings,
    cmsMenu,
  };
}
```

---

## 🏗️ STEP 6: Winter Layout Integration (45 minutes)

### 6.1 Update Winter Layout
**Edit `app/components/layouts/winter/Layout.tsx`**:

```typescript
import {Header} from './Header';
import {Footer} from './Footer';

type LayoutProps = {
  children: React.ReactNode;
  layout?: {shop: {name: string}};
  cmsSettings: any;
  cmsMenu: any;
};

export function LayoutWinter({
  children,
  layout,
  cmsSettings,
  cmsMenu,
}: LayoutProps) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>

        {cmsSettings && cmsMenu && layout?.shop.name && (
          <Header
            title={layout.shop.name}
            menu={cmsMenu}
            settings={cmsSettings}
          />
        )}

        <main role="main" id="mainContent" className="flex-grow">
          {children}
        </main>
      </div>
      {cmsSettings && <Footer settings={cmsSettings} />}
    </>
  );
}
```

### 6.2 Update Winter Header
**Edit `app/components/layouts/winter/Header.tsx`**:

Find and replace these imports:
```typescript
// REMOVE these lines:
import {MegaMenu} from '~/components/sanity/MegaMenu';
import {CountdownTimer} from '~/components/sanity/CountdownTimer';

// ADD this line:
import {MegaMenu} from '~/components/global/MegaMenu';

// COMMENT OUT CountdownTimer usage (or remove if present)
// <CountdownTimer settings={settings} />
```

### 6.3 Update Winter Footer
**Edit `app/components/layouts/winter/Footer.tsx`**:

Ensure imports use React Router:
```typescript
import {Link} from 'react-router';
import {Form} from 'react-router';
// etc.
```

### 6.4 Replace PageLayout
**Edit `app/components/PageLayout.tsx`**:

```typescript
import {Suspense} from 'react';
import {Await, useRouteLoaderData} from 'react-router';
import {LayoutWinter} from '~/components/layouts/winter/Layout';
import type {RootLoader} from '~/root';

export function PageLayout({children}: {children?: React.ReactNode}) {
  const rootData = useRouteLoaderData<RootLoader>('root');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={Promise.resolve(rootData)}>
        {(data) => (
          <LayoutWinter
            layout={{shop: {name: 'WowStore'}}}
            cmsSettings={data?.cmsSettings}
            cmsMenu={data?.cmsMenu}
          >
            {children}
          </LayoutWinter>
        )}
      </Await>
    </Suspense>
  );
}
```

---

## 🧰 STEP 7: Hooks & Utilities (15 minutes)

```bash
# Copy hooks
cp -r /workspace/owen-extracted/hooks app/

# Copy lib utilities (skip cms.client.ts)
for file in /workspace/owen-extracted/lib/*.ts; do
  filename=$(basename "$file")
  if [ "$filename" != "cms.client.ts" ]; then
    cp "$file" app/lib/
  fi
done

# Update imports in hooks
find app/hooks -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i "s/@remix-run\/react/react-router/g" {} +
```

---

## 🧪 STEP 8: Test & Fix (60 minutes)

### 8.1 Start Dev Server
```bash
npm run dev
```

### 8.2 Check Console for Errors
Visit: http://localhost:3000

**Common Issues & Fixes:**

#### Issue: Module not found
```bash
# Find the missing import
grep -r "MissingComponent" app/
# Fix the import path
```

#### Issue: Type errors
```typescript
// Add type assertions where needed
const data = rootData as any;
```

#### Issue: Sanity references still present
```bash
# Find remaining sanityData
grep -r "sanityData" app/
# Replace with cmsSettings/cmsMenu
```

### 8.3 Test Checklist
- [ ] Homepage loads with winter theme
- [ ] Header visible with logo
- [ ] Mega menu appears (even if empty)
- [ ] Footer visible
- [ ] Product pages load
- [ ] Cart works
- [ ] No critical console errors

---

## 🏗️ STEP 9: Build for Production (20 minutes)

### 9.1 Build
```bash
npm run build
```

**If build fails**, fix errors and rebuild.

### 9.2 Preview
```bash
npm run preview
```

Test the production build locally.

---

## 🚀 STEP 10: Deploy (15 minutes)

```bash
# Deploy to Oxygen
shopify hydrogen deploy
```

### 10.1 Verify Live Site
Visit: https://01k9gqzvxj1vhxtj3f8g1gfra3-6a8b530aeeafc79c3d92.myshopify.dev/

---

## ✅ SUCCESS CHECKLIST

By end of day, you should have:

- [ ] Winter theme styles applied
- [ ] Header with WowStore branding
- [ ] Mega menu structure (even if basic)
- [ ] Footer visible
- [ ] Product pages styled
- [ ] Cart drawer functional
- [ ] Mobile responsive
- [ ] Production build successful
- [ ] Deployed to live site

---

## 🆘 EMERGENCY SHORTCUTS

### If Running Out of Time:

**Priority 1 (MUST HAVE):**
- ✅ Styles (Step 2)
- ✅ Basic layout (Step 6)
- ✅ Header/Footer visible

**Priority 2 (NICE TO HAVE):**
- ⚠️ Mega menu fully functional
- ⚠️ All component features
- ⚠️ Compare/Wishlist

**Priority 3 (TOMORROW):**
- 🔄 Perfect mobile responsive
- 🔄 All animations
- 🔄 Advanced features

---

## 📊 Time Tracking

| Step | Task | Time | Status |
|------|------|------|--------|
| 1 | Setup | 30m | ⏳ |
| 2 | Styles & Config | 20m | ⏳ |
| 3 | Core Components | 90m | ⏳ |
| 4 | MegaMenu | 30m | ⏳ |
| 5 | CMS Integration | 30m | ⏳ |
| 6 | Winter Layout | 45m | ⏳ |
| 7 | Hooks & Utilities | 15m | ⏳ |
| 8 | Test & Fix | 60m | ⏳ |
| 9 | Build | 20m | ⏳ |
| 10 | Deploy | 15m | ⏳ |
| **TOTAL** | | **5h 35m** | |

---

## 💡 Pro Tips

1. **Don't get stuck** - If something doesn't work, comment it out and move on
2. **Test frequently** - Run `npm run dev` after each major step
3. **Use mock data** - CMS endpoints return mock data if API fails
4. **Focus on visual** - Today is about design, not perfect functionality
5. **Commit often** - Git commit after each successful step

---

## 🎯 End of Day Goal

**Visual transformation complete:**
- WowStore looks professional with winter theme
- Header, footer, and basic navigation work
- Product pages are styled
- Ready for tomorrow's n8n work

---

**LET'S DO THIS! 🚀**

Start with Step 1 and work through systematically. You've got this! 💪
