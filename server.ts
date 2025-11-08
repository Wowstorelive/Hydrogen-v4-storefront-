import {createRequestHandler} from '@shopify/remix-oxygen';
import {createStorefrontClient, storefrontRedirect} from '@shopify/hydrogen';

export default {
  async fetch(request, env, executionContext) {
    try {
      const {storefront} = createStorefrontClient({
        cache: await caches.open('hydrogen'),
        waitUntil: executionContext.waitUntil.bind(executionContext),
        i18n: {
          language: 'EN',
          country: 'US',
        },
        publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
        privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN,
        storeDomain: env.PUBLIC_STORE_DOMAIN,
        storefrontApiVersion: env.PUBLIC_STOREFRONT_API_VERSION || '2024-10',
        storefrontId: env.PUBLIC_STOREFRONT_ID,
        storefrontHeaders: {
          requestGroupId: request.headers.get('request-id'),
          buyerIp: request.headers.get('oxygen-buyer-ip'),
          cookie: request.headers.get('cookie'),
          purpose: request.headers.get('purpose'),
        },
      });

      const handleRequest = createRequestHandler({
        build: await import('./build/server/index.js'),
        mode: process.env.NODE_ENV,
        getLoadContext: () => ({
          env,
          storefront,
          // Add PostgreSQL CMS API URLs to context
          cmsApiUrl: env.PUBLIC_CMS_API_URL || 'https://api.wowstore.live',
        }),
      });

      const response = await handleRequest(request);

      if (response.status === 404) {
        return storefrontRedirect({request, response, storefront});
      }

      return response;
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', {status: 500});
    }
  },
};
