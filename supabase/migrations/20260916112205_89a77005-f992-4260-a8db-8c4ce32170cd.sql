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
CREATE OR REPLACE FUNCTION public.claim_first_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN RETURN false; END IF;
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'::public.app_role) THEN RETURN true; END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (auth.uid(), 'admin'::public.app_role);
  RETURN true;
EXCEPTION WHEN unique_violation THEN
  RETURN false;
END;
$$;
REVOKE ALL ON FUNCTION public.claim_first_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.claim_first_admin() TO authenticated;