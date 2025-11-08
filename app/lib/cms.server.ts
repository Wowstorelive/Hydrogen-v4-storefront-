const CMS_API_URL = 'https://api.wowstore.live';

export async function getCMSPageBySlug(slug: string) {
  try {
    const response = await fetch(`${CMS_API_URL}/cms_pages?slug=eq.${slug}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error('CMS fetch error:', error);
    return null;
  }
}

export async function getCMSNavigation() {
  try {
    const response = await fetch(`${CMS_API_URL}/cms_navigation?order=sort_order`);
    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error('CMS navigation error:', error);
    return [];
  }
}

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
