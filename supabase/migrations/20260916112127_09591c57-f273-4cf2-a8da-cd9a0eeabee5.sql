DROP POLICY IF EXISTS "First signed-in user can claim admin" ON public.user_roles;
DROP FUNCTION IF EXISTS public.claim_first_admin();
DROP FUNCTION IF EXISTS private.claim_first_admin();
DROP FUNCTION IF EXISTS private.no_admin_exists();