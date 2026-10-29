-- Rosário Meditativo — content schema (MVP, anon read)

create extension if not exists "pgcrypto";

create type public.mystery_type as enum (
  'joyful',
  'sorrowful',
  'glorious',
  'luminous'
);

create table public.mysteries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type public.mystery_type not null,
  sort_order integer not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint mysteries_sort_order_non_negative check (sort_order >= 0)
);

create unique index mysteries_type_sort_order_idx
  on public.mysteries (type, sort_order);

create table public.passages (
  id uuid primary key default gen_random_uuid(),
  mystery_id uuid not null references public.mysteries (id) on delete cascade,
  text text not null,
  reference text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint passages_sort_order_non_negative check (sort_order >= 0)
);

create index passages_mystery_id_idx on public.passages (mystery_id);

create table public.commentaries (
  id uuid primary key default gen_random_uuid(),
  mystery_id uuid not null references public.mysteries (id) on delete cascade,
  text text not null,
  author text not null,
  source text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint commentaries_sort_order_non_negative check (sort_order >= 0)
);

create index commentaries_mystery_id_idx on public.commentaries (mystery_id);

create table public.images (
  id uuid primary key default gen_random_uuid(),
  mystery_id uuid not null references public.mysteries (id) on delete cascade,
  url text not null,
  title text,
  artist text,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint images_sort_order_non_negative check (sort_order >= 0)
);

create index images_mystery_id_idx on public.images (mystery_id);

create table public.deeper_references (
  id uuid primary key default gen_random_uuid(),
  mystery_id uuid not null references public.mysteries (id) on delete cascade,
  title text not null,
  description text,
  url_or_reference text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint deeper_references_sort_order_non_negative check (sort_order >= 0)
);

create index deeper_references_mystery_id_idx on public.deeper_references (mystery_id);

alter table public.mysteries enable row level security;
alter table public.passages enable row level security;
alter table public.commentaries enable row level security;
alter table public.images enable row level security;
alter table public.deeper_references enable row level security;

create policy "Anon read mysteries"
  on public.mysteries
  for select
  to anon
  using (true);

create policy "Anon read passages"
  on public.passages
  for select
  to anon
  using (true);

create policy "Anon read commentaries"
  on public.commentaries
  for select
  to anon
  using (true);

create policy "Anon read images"
  on public.images
  for select
  to anon
  using (true);

create policy "Anon read deeper_references"
  on public.deeper_references
  for select
  to anon
  using (true);
