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
