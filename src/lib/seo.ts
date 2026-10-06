import { useEffect } from 'react';
import { DEFAULT_SHARE_IMAGE, SEO_BASE_URL } from './seo-content';

type PageSeoOptions = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  type?: 'website' | 'article';
  robots?: string;
  structuredData?: Record<string, unknown> | null;
};

function setMeta(attribute: 'name' | 'property', key: string, value: string) {
  let element = Array.from(document.head.querySelectorAll<HTMLMetaElement>('meta')).find((meta) => meta.getAttribute(attribute) === key);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = value;
}

export function usePageSeo({ title, description, path, image, type = 'website', robots = 'index, follow', structuredData }: PageSeoOptions) {
  const structuredDataText = structuredData ? JSON.stringify(structuredData) : '';

  useEffect(() => {
    const canonicalUrl = `${SEO_BASE_URL}${path === '/' ? '/' : path}`;
    const shareImage = image || DEFAULT_SHARE_IMAGE;
    document.title = title;

    setMeta('name', 'description', description);
    setMeta('name', 'robots', robots);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:image', shareImage);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', shareImage);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const existingSchema = document.getElementById('route-structured-data');
    existingSchema?.remove();
    if (structuredDataText) {
      const script = document.createElement('script');
      script.id = 'route-structured-data';
      script.type = 'application/ld+json';
      script.textContent = structuredDataText;
      document.head.appendChild(script);
    }
  }, [description, image, path, robots, structuredDataText, title, type]);
}