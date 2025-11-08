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
  innerClass?: string;
  itemClass?: string;
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
