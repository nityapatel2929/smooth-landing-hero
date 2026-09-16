GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON storage.objects TO authenticated;
CREATE POLICY "Admins manage CMS media" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'cms-media' AND private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (bucket_id = 'cms-media' AND private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Authenticated users read CMS media" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'cms-media');