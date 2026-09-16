DROP FUNCTION IF EXISTS public.claim_first_admin();
CREATE OR REPLACE FUNCTION private.claim_first_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, private
AS $$
BEGIN
  IF auth.uid() IS NULL THEN RETURN false; END IF;
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin'::public.app_role) THEN RETURN false; END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (auth.uid(), 'admin'::public.app_role) ON CONFLICT (user_id, role) DO NOTHING;
  RETURN true;
END;
$$;
REVOKE ALL ON FUNCTION private.claim_first_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.claim_first_admin() TO authenticated, service_role;