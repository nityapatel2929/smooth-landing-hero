CREATE SCHEMA IF NOT EXISTS private;

CREATE OR REPLACE FUNCTION private.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
GRANT USAGE ON SCHEMA private TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.has_role(UUID, public.app_role) TO anon, authenticated, service_role;

ALTER POLICY "Users can view their own roles" ON public.user_roles USING (auth.uid() = user_id OR private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can manage leads" ON public.leads USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Anyone can view visible services" ON public.services USING (is_visible = true OR private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can manage services" ON public.services USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Anyone can view visible projects" ON public.projects USING (is_visible = true OR private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can manage projects" ON public.projects USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Anyone can view published blog posts" ON public.blog_posts USING (is_published = true OR private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can manage blog posts" ON public.blog_posts USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Anyone can view visible testimonials" ON public.testimonials USING (is_visible = true OR private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can manage testimonials" ON public.testimonials USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Anyone can view visible FAQs" ON public.faqs USING ((is_visible = true AND (page_key = 'contact' OR EXISTS (SELECT 1 FROM public.blog_posts WHERE blog_posts.id = faqs.blog_post_id AND blog_posts.is_published = true))) OR private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can manage FAQs" ON public.faqs USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can manage page content" ON public.page_content USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can manage site settings" ON public.site_settings USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can upload CMS media" ON storage.objects WITH CHECK (bucket_id = 'cms-media' AND private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can update CMS media" ON storage.objects USING (bucket_id = 'cms-media' AND private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (bucket_id = 'cms-media' AND private.has_role(auth.uid(), 'admin'::public.app_role));
ALTER POLICY "Admins can delete CMS media" ON storage.objects USING (bucket_id = 'cms-media' AND private.has_role(auth.uid(), 'admin'::public.app_role));

DROP FUNCTION public.has_role(UUID, public.app_role);