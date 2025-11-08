/**
 * PostgreSQL CMS API Client
 * Connects to PostgREST API for CMS content
 */

const CMS_API_URL = process.env.PUBLIC_CMS_API_URL || 'https://cms.wowstore.live';
const API_URL = process.env.PUBLIC_API_URL || 'https://api.wowstore.live';

export interface CMSPage {
  id: string;
  title: string;
  slug: string;
  page_type: string;
  status: string;
  template?: string;
  hero_image_id?: string;
  excerpt?: string;
  content?: any;
  author?: string;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CMSMedia {
  id: string;
  url: string;
  alt_text?: string;
  title?: string;
  media_type: string;
  file_size?: number;
  dimensions?: any;
}

export interface CMSNavigation {
  id: string;
  label: string;
  url: string;
  position: number;
  parent_id?: string;
  is_active: boolean;
}

/**
 * Fetch CMS pages from PostgreSQL
 */
export async function getCMSPages(filters?: {
  status?: string;
  page_type?: string;
  limit?: number;
}): Promise<CMSPage[]> {
  const params = new URLSearchParams();
  
  if (filters?.status) {
    params.append('status', `eq.${filters.status}`);
  }
  if (filters?.page_type) {
    params.append('page_type', `eq.${filters.page_type}`);
  }
  if (filters?.limit) {
    params.append('limit', filters.limit.toString());
  }
  
  params.append('order', 'published_at.desc');
  
  const response = await fetch(`${API_URL}/cms_pages?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch CMS pages: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Fetch single CMS page by slug
 */
export async function getCMSPageBySlug(slug: string): Promise<CMSPage | null> {
  const response = await fetch(
    `${API_URL}/cms_pages?slug=eq.${slug}&status=eq.published&limit=1`
  );
  
  if (!response.ok) {
    return null;
  }
  
  const pages = await response.json();
  return pages[0] || null;
}

/**
 * Fetch navigation menu
 */
export async function getCMSNavigation(): Promise<CMSNavigation[]> {
  const response = await fetch(
    `${API_URL}/cms_navigation?is_active=eq.true&order=position.asc`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch navigation: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Fetch site settings
 */
export async function getCMSSiteSettings() {
  const response = await fetch(`${API_URL}/cms_site_settings?limit=1`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch site settings: ${response.statusText}`);
  }
  
  const settings = await response.json();
  return settings[0] || {};
}

/**
 * Fetch media by ID
 */
export async function getCMSMedia(mediaId: string): Promise<CMSMedia | null> {
  const response = await fetch(`${API_URL}/cms_media?id=eq.${mediaId}&limit=1`);
  
  if (!response.ok) {
    return null;
  }
  
  const media = await response.json();
  return media[0] || null;
}
