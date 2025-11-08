import {useLoaderData} from '@remix-run/react';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {getCMSPageBySlug} from '~/lib/cms.client';

const FEATURED_PRODUCTS_QUERY = `#graphql
  query FeaturedProducts {
    products(first: 8) {
      nodes {
        id
        title
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 1) {
          nodes {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;

export async function loader({context}: LoaderFunctionArgs) {
  // Fetch CMS homepage content from PostgreSQL
  const homePage = await getCMSPageBySlug('home').catch(() => null);
  
  // Fetch featured products from Shopify
  const {products} = await context.storefront.query(FEATURED_PRODUCTS_QUERY);
  
  // Black Friday configuration
  const blackFriday = {
    isActive: true,
    discount: 25,
    startDate: 'November 29, 2024',
    endDate: 'December 2, 2024',
  };

  return {
    homePage,
    products: products.nodes,
    blackFriday,
  };
}

export default function Index() {
  const {homePage, products, blackFriday} = useLoaderData<typeof loader>();

  return (
    <div>
      {/* Black Friday Banner */}
      {blackFriday.isActive && (
        <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-pulse">
                🌊 Black Friday Ocean Sale!
              </h1>
              <p className="text-2xl md:text-3xl mb-6 font-semibold">
                Save {blackFriday.discount}% on Ocean Conservation Products
              </p>
              <p className="text-lg md:text-xl mb-8 text-blue-100">
                {blackFriday.startDate} - {blackFriday.endDate}
              </p>
              <p className="text-base md:text-lg mb-8 text-blue-50">
                Every Purchase Protects Our Oceans 🐋 | 5% Goes to Ocean Conservancy
              </p>
              <a
                href="/collections/all"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-xl font-bold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Shop Now & Save the Ocean 🌊
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section from CMS */}
      {homePage && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">{homePage.title}</h2>
              {homePage.excerpt && (
                <p className="text-xl text-gray-600 mb-8">{homePage.excerpt}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <a
                key={product.id}
                href={`/products/${product.handle}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                {product.images.nodes[0] && (
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.images.nodes[0].url}
                      alt={product.images.nodes[0].altText || product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xl font-bold text-blue-600">
                    ${product.priceRange.minVariantPrice.amount}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
            Why Shop with WowStore?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl mb-4">🌊</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Ocean Conservation</h3>
              <p className="text-gray-600">
                5% of every sale goes directly to Ocean Conservancy's WowMoment program
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">AI-Powered Service</h3>
              <p className="text-gray-600">
                24/7 customer support across WhatsApp, Instagram, TikTok, and more
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Fast Shipping</h3>
              <p className="text-gray-600">
                Quick delivery with eco-friendly packaging and carbon-neutral shipping
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 text-blue-50">
              Start shopping and help protect our oceans today
            </p>
            <a
              href="/collections/all"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-xl font-bold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Browse All Products
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
