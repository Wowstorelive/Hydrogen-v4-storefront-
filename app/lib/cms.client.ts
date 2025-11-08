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
