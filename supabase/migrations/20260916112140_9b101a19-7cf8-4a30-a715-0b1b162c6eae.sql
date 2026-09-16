DROP POLICY IF EXISTS "First signed-in user can claim admin" ON public.user_roles;
DROP FUNCTION IF EXISTS public.claim_first_admin();