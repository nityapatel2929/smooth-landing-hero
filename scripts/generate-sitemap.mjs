import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { loadEnv } from 'vite';

const BASE_URL = 'https://abpinteriors.in';
const env = loadEnv('production', process.cwd(), 'VITE_');
const apiUrl = process.env.VITE_SUPABASE_URL || env.VITE_SUPABASE_URL;
const apiKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY;
const staticPaths = [
  '/', '/services', '/projects', '/about', '/contact', '/blog',
  '/interior-construction-ahmedabad/', '/residential-interior-construction/',
  '/commercial-interior-construction/', '/hotel-interior-construction/',
  '/restaurant-interior-construction/', '/corporate-office-interior-construction/',
  '/showroom-retail-interior-construction/', '/plywood-hardware-ahmedabad/',
];

async function readPublicRows(table, select, filter) {
  if (!apiUrl || !apiKey) return [];
  const url = new URL(`/rest/v1/${table}`, apiUrl);
  url.searchParams.set('select', select);
  url.searchParams.set(filter, 'eq.true');
  const response = await fetch(url, { headers: { apikey: apiKey } });
  if (!response.ok) {
    console.warn(`Could not read public ${table} for sitemap (HTTP ${response.status}).`);
    return [];
  }
  return response.json();
}

const [projects, posts] = await Promise.all([
  readPublicRows('projects', 'slug', 'is_visible'),
  readPublicRows('blog_posts', 'slug', 'is_published'),
]);

const urls = new Set(staticPaths.map((path) => `${BASE_URL}${path}`));
for (const project of projects) if (typeof project.slug === 'string' && project.slug) urls.add(`${BASE_URL}/projects/${encodeURIComponent(project.slug)}`);
for (const post of posts) if (typeof post.slug === 'string' && post.slug) urls.add(`${BASE_URL}/blog/${encodeURIComponent(post.slug)}`);

const xmlEscape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const entries = [...urls].sort().map((url) => `  <url><loc>${xmlEscape(url)}</loc></url>`).join('\n');
await mkdir(resolve('public'), { recursive: true });
await writeFile(resolve('public/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`);
console.log(`Generated sitemap with ${urls.size} indexable URLs.`);