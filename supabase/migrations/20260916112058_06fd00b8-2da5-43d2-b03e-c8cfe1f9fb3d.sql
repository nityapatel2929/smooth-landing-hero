GRANT INSERT ON public.user_roles TO authenticated;
CREATE OR REPLACE FUNCTION private.no_admin_exists()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$ SELECT NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin'::public.app_role); $$;
REVOKE ALL ON FUNCTION private.no_admin_exists() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.no_admin_exists() TO authenticated, service_role;
CREATE POLICY "First signed-in user can claim admin"
ON public.user_roles FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid() AND role = 'admin'::public.app_role AND private.no_admin_exists());