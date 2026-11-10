-- Anon content reads via the Data API (supabase-js / PostgREST).
--
-- RLS policies in 20251029000000 allow SELECT for anon, but Postgres checks
-- table GRANTs before policies. Since 2026-10-30, new tables in public are
-- not granted to anon automatically, so a query fails with 42501
-- (permission denied for table) and the policy never runs.
-- GRANT SELECT is idempotent for databases that already applied the
-- initial migration.

grant select on table public.mysteries to anon;
grant select on table public.passages to anon;
grant select on table public.commentaries to anon;
grant select on table public.images to anon;
grant select on table public.deeper_references to anon;
