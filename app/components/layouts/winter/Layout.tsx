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
  // Ensure we always have valid data
  const safeSettings = cmsSettings || {
    header: {logo: null, topLinks: []},
    social: [],
    other: {shippingText: '', phoneNumber: ''},
  };

  const safeMenu = cmsMenu || {items: []};
  const safeTitle = layout?.shop?.name || 'WowStore';

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>

        <Header
          title={safeTitle}
          menu={safeMenu}
          settings={safeSettings}
        />

        <main role="main" id="mainContent" className="flex-grow">
          {children}
        </main>
      </div>
      <Footer settings={safeSettings} />
    </>
  );
}
