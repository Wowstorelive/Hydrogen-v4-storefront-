import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {getCMSNavigation, getCMSSiteSettings} from '~/lib/cms.client';

export async function loader({context}: LoaderFunctionArgs) {
  // Fetch CMS data from PostgreSQL
  const [navigation, siteSettings] = await Promise.all([
    getCMSNavigation().catch(() => []),
    getCMSSiteSettings().catch(() => ({})),
  ]);

  return {
    navigation,
    siteSettings,
    env: {
      PUBLIC_STORE_DOMAIN: context.env.PUBLIC_STORE_DOMAIN,
    },
  };
}

export default function App() {
  const {navigation, siteSettings} = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50">
        {/* Header with CMS Navigation */}
        <header className="bg-white border-b shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <a href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                {siteSettings.site_name || '🌊 WowStore'}
              </a>
              <div className="hidden md:flex gap-6">
                {navigation.slice(0, 5).map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <a href="/cart" className="text-gray-700 hover:text-blue-600">
                  🛒 Cart
                </a>
              </div>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-auto">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">🌊 WowStore</h3>
                <p className="text-gray-400">
                  Ocean Conservation E-commerce Platform
                </p>
                <p className="text-gray-400 mt-2">
                  5% of profits go to Ocean Conservancy
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {navigation.slice(0, 5).map((item) => (
                    <li key={item.id}>
                      <a href={item.url} className="text-gray-400 hover:text-white transition-colors">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Our Mission</h3>
                <p className="text-gray-400">
                  Every purchase protects our oceans. Shop with purpose.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>© 2024 WowStore. All rights reserved. Built with 💙 for Ocean Conservation</p>
            </div>
          </div>
        </footer>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Error - WowStore</title>
        <Links />
      </head>
      <body className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops!</h1>
          <p className="text-gray-600 mb-8">Something went wrong.</p>
          <a href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Return Home
          </a>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
