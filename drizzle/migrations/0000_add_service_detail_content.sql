ALTER TABLE public.services
  ADD COLUMN IF NOT EXISTS detail_path text,
  ADD COLUMN IF NOT EXISTS detail_heading text,
  ADD COLUMN IF NOT EXISTS detail_body text,
  ADD COLUMN IF NOT EXISTS seo_title text,
  ADD COLUMN IF NOT EXISTS seo_description text;