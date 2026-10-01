import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type PageContent = Record<string, unknown>;
export type SiteSettings = Tables<'site_settings'>;
export type Service = Tables<'services'>;
export type Project = Tables<'projects'>;
export type Testimonial = Tables<'testimonials'>;
export type BlogPost = Tables<'blog_posts'>;
export type Faq = Tables<'faqs'>;
export type GalleryItem = { url: string; caption?: string };

export const fallbackSettings: SiteSettings = {
  id: 'fallback',
  singleton: true,
  business_name: 'ABP Interior',
  phone: '+91 9377640080',
  whatsapp_number: '+919377640080',
  email: 'arvindpatel5862@gmail.com',
  address: 'G19 Satva Elegance, Silverstar Char Rasta, Chandlodiya, Ahmedabad, Gujarat',
  social_links: {},
  logo_url: null,
  favicon_url: null,
  created_at: '',
  updated_at: '',
};

export async function getPageContent(pageKey: string): Promise<PageContent> {
  const { data } = await supabase.from('page_content').select('content').eq('page_key', pageKey).maybeSingle();
  return (data?.content as PageContent | null) ?? {};
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const { data } = await supabase.from('site_settings').select('*').eq('singleton', true).maybeSingle();
  return data ?? fallbackSettings;
}

export async function getVisibleServices(): Promise<Service[]> {
  const { data } = await supabase.from('services').select('*').eq('is_visible', true).order('sort_order');
  return data ?? [];
}

export async function getVisibleProjects(): Promise<Project[]> {
  const { data } = await supabase.from('projects').select('*').eq('is_visible', true).order('sort_order');
  return data ?? [];
}

export async function getVisibleTestimonials(): Promise<Testimonial[]> {
  const { data } = await supabase.from('testimonials').select('*').eq('is_visible', true).order('sort_order');
  return data ?? [];
}

export async function getVisibleFaqs(pageKey: string, blogPostId?: string): Promise<Faq[]> {
  let query = supabase.from('faqs').select('*').eq('is_visible', true).eq('page_key', pageKey).order('sort_order');
  if (blogPostId) query = query.eq('blog_post_id', blogPostId);
  const { data } = await query;
  return data ?? [];
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const { data } = await supabase.from('blog_posts').select('*').eq('is_published', true).order('published_at', { ascending: false });
  return data ?? [];
}

export async function getPublishedPost(slug: string): Promise<BlogPost | null> {
  const { data } = await supabase.from('blog_posts').select('*').eq('slug', slug).eq('is_published', true).maybeSingle();
  return data;
}

export function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

export function asStringArray(value: unknown, fallback: string[] = []): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : fallback;
}

export function whatsappUrl(number: string): string {
  return `https://wa.me/${number.replace(/[^\d]/g, '')}`;
}

export function iconNameToKey(name: string): string {
  return name || 'Package';
}

export function galleryItems(value: unknown): GalleryItem[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is GalleryItem => typeof item === 'object' && item !== null && typeof (item as { url?: unknown }).url === 'string');
}