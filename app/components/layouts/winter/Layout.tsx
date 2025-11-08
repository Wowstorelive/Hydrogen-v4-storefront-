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
