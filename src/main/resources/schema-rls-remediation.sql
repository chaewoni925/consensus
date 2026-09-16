-- ========================================================
-- Supabase RLS Remediation Script for recruit_period
-- ========================================================

-- 1. Enable Row Level Security (RLS)
ALTER TABLE public.recruit_period ENABLE ROW LEVEL SECURITY;

-- 2. Revoke direct API access privileges from public roles (anon, authenticated)
-- (Spring Boot connects directly using postgres user credentials, which bypasses RLS)
REVOKE ALL ON public.recruit_period FROM anon, authenticated;

-- Optional: If read access via Supabase PostgREST API is required in the future for authenticated users,
-- uncomment the lines below:
-- GRANT SELECT ON public.recruit_period TO authenticated;
-- CREATE POLICY "Allow authenticated read recruit_period"
-- ON public.recruit_period FOR SELECT
-- TO authenticated
-- USING (true);
