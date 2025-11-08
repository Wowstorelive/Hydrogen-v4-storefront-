import {Suspense} from 'react';
import {Await, useRouteLoaderData} from 'react-router';
import {LayoutWinter} from '~/components/layouts/winter/Layout';
import type {RootLoader} from '~/root';

export function PageLayout({children}: {children?: React.ReactNode}) {
  const rootData = useRouteLoaderData<RootLoader>('root');

  // Provide default data to prevent crashes
  const defaultCmsSettings = {
    header: {logo: null, topLinks: []},
    social: [],
    other: {
      shippingText: 'Free shipping on orders over €50',
      phoneNumber: '+31 20 123 4567',
    },
  };

  const defaultCmsMenu = {
    items: [
      {id: '1', title: 'Shop', url: '/collections/all', children: []},
      {id: '2', title: 'About', url: '/pages/about', children: []},
      {id: '3', title: 'Contact', url: '/pages/contact', children: []},
    ],
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await
        resolve={Promise.resolve(rootData)}
        errorElement={<div>Error loading page data</div>}
      >
        {(data) => (
          <LayoutWinter
            layout={{shop: {name: 'WowStore'}}}
            cmsSettings={data?.cmsSettings || defaultCmsSettings}
            cmsMenu={data?.cmsMenu || defaultCmsMenu}
          >
            {children}
          </LayoutWinter>
        )}
      </Await>
    </Suspense>
  );
}
