-- ========================================================
-- Supabase RLS Remediation Script for All Public Tables
-- ========================================================

-- 1. Enable Row Level Security (RLS) on all exposed public tables
ALTER TABLE public.recruit_period ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriber ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member ENABLE ROW LEVEL SECURITY;

-- 2. Revoke direct PostgREST API access from public roles (anon, authenticated)
-- (Spring Boot backend connects directly via PostgreSQL driver as superuser/owner, bypassing RLS)
REVOKE ALL ON public.recruit_period FROM anon, authenticated;
REVOKE ALL ON public.application FROM anon, authenticated;
REVOKE ALL ON public.history FROM anon, authenticated;
REVOKE ALL ON public.activity FROM anon, authenticated;
REVOKE ALL ON public.generation FROM anon, authenticated;
REVOKE ALL ON public.report FROM anon, authenticated;
REVOKE ALL ON public.subscriber FROM anon, authenticated;
REVOKE ALL ON public.member FROM anon, authenticated;
