import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { loadEnv } from 'vite';
import { publicPageSeo, serviceSeoPages, SEO_BASE_URL, DEFAULT_SHARE_IMAGE, DEFAULT_DESCRIPTION } from '../src/lib/seo-content.ts';

const distDir = resolve('dist');
const baseHtml = await readFile(resolve(distDir, 'index.html'), 'utf8');
const env = loadEnv('production', process.cwd(), 'VITE_');
const apiUrl = process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL;
const apiKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY;

async function readPublicRows(table, select, filter) {
  if (!apiUrl || !apiKey) return [];
  const url = new URL(`/rest/v1/${table}`, apiUrl);
  url.searchParams.set('select', select);
  url.searchParams.set(filter, 'eq.true');
  const response = await fetch(url, { headers: { apikey: apiKey } });
  if (!response.ok) {
    console.warn(`Could not read public ${table} for page metadata (HTTP ${response.status}).`);
    return [];
  }
  return response.json();
}

function escapeHtml(value = '') {
  return String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function replaceMeta(html, attribute, key, value) {
  const pattern = new RegExp(`<meta(?=[^>]*\\b${attribute}="${key.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}")[^>]*>`, 'i');
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

function replaceLink(html, rel, href) {
  const pattern = new RegExp(`<link(?=[^>]*\\brel="${rel}")[^>]*>`, 'i');
  const tag = `<link rel="${rel}" href="${escapeHtml(href)}" />`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

function setRouteSchema(html, schema) {
  const tag = '<script type="application/ld+json" id="route-structured-data">' + JSON.stringify(schema).replaceAll('<', '\\u003c') + '</script>';
  return html.includes('id="route-structured-data"')
    ? html.replace(/<script[^>]*id="route-structured-data"[^>]*>[\s\S]*?<\/script>/i, tag)
    : html.replace('</head>', `    ${tag}\n  </head>`);
}

function routeHtml({ path, title, description, image, type = 'website', schema = null }) {
  const canonical = `${SEO_BASE_URL}${path}`;
  let html = baseHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = replaceMeta(html, 'name', 'description', description);
  html = replaceMeta(html, 'name', 'robots', 'index, follow');
  html = replaceMeta(html, 'property', 'og:title', title);
  html = replaceMeta(html, 'property', 'og:description', description);
  html = replaceMeta(html, 'property', 'og:url', canonical);
  html = replaceMeta(html, 'property', 'og:type', type);
  html = replaceMeta(html, 'property', 'og:image', image || DEFAULT_SHARE_IMAGE);
  html = replaceMeta(html, 'name', 'twitter:card', 'summary_large_image');
  html = replaceMeta(html, 'name', 'twitter:title', title);
  html = replaceMeta(html, 'name', 'twitter:description', description);
  html = replaceMeta(html, 'name', 'twitter:image', image || DEFAULT_SHARE_IMAGE);
  html = replaceLink(html, 'canonical', canonical);
  if (schema) html = setRouteSchema(html, schema);
  return html;
}

async function writeRoute(path, options) {
  const filePath = resolve(distDir, `.${path.endsWith('/') ? path : `${path}/`}index.html`);
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, routeHtml({ path, ...options }));
}

const crumbsSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: `${SEO_BASE_URL}${item.path}` })),
});

for (const page of publicPageSeo) {
  const section = page.path === '/services' ? 'Services' : page.path === '/projects' ? 'Projects' : page.path === '/about' ? 'About' : page.path === '/contact' ? 'Contact' : page.path === '/blog' ? 'Blog' : null;
  const schema = section ? crumbsSchema([{ name: 'Home', path: '/' }, { name: section, path: page.path }]) : null;
  await writeRoute(page.path, { title: page.title, description: page.description, schema });
}

for (const page of serviceSeoPages) {
  const parents = [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: page.category, path: page.path }];
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      crumbsSchema(parents),
      { '@type': 'Service', name: page.h1, description: page.description, areaServed: { '@type': 'City', name: 'Ahmedabad' }, provider: { '@id': `${SEO_BASE_URL}/#business` } },
    ],
  };
  await writeRoute(`${page.path}/`, { title: page.title, description: page.description, schema });
}

const adminHtml = routeHtml({ path: '/admin', title: 'Admin | ABP Interior', description: 'ABP Interior content management.', schema: null }).replace('<meta name="robots" content="index, follow" />', '<meta name="robots" content="noindex, nofollow" />');
await mkdir(resolve(distDir, 'admin'), { recursive: true });
await writeFile(resolve(distDir, 'admin/index.html'), adminHtml);

const [projects, posts] = await Promise.all([
  readPublicRows('projects', 'slug,title,category,description,cover_image_url,location', 'is_visible'),
  readPublicRows('blog_posts', 'slug,title,content,cover_image_url,published_at,seo_title,seo_description', 'is_published'),
]);

for (const project of projects) {
  if (!project.slug || !project.title) continue;
  const path = `/projects/${encodeURIComponent(project.slug)}`;
  const description = (project.description || `Explore ${project.title}, a ${project.category || 'interior'} project by ABP Interior in Ahmedabad.`).slice(0, 300);
  const title = `${project.title} | ${project.category || 'Interior Project'} in Ahmedabad | ABP Interior`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      crumbsSchema([{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }, { name: project.title, path }]),
      { '@type': 'CreativeWork', name: project.title, description, ...(project.cover_image_url ? { image: project.cover_image_url } : {}), about: project.category, ...(project.location ? { contentLocation: { '@type': 'Place', name: project.location } } : {}) },
    ],
  };
  await writeRoute(path, { title, description, image: project.cover_image_url, schema });
}

for (const post of posts) {
  if (!post.slug || !post.title) continue;
  const path = `/blog/${encodeURIComponent(post.slug)}`;
  const plainText = (post.content || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const description = (post.seo_description || plainText || DEFAULT_DESCRIPTION).slice(0, 300);
  const title = post.seo_title || `${post.title} | ABP Interior`;
  const article = { '@type': 'Article', headline: post.title, description, ...(post.published_at ? { datePublished: post.published_at } : {}), ...(post.cover_image_url ? { image: post.cover_image_url } : {}), publisher: { '@id': `${SEO_BASE_URL}/#business` }, mainEntityOfPage: `${SEO_BASE_URL}${path}` };
  const schema = { '@context': 'https://schema.org', '@graph': [crumbsSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: post.title, path }]), article] };
  await writeRoute(path, { title, description, image: post.cover_image_url, type: 'article', schema });
}

console.log(`Generated route metadata for ${publicPageSeo.length + serviceSeoPages.length + projects.length + posts.length} public pages.`);