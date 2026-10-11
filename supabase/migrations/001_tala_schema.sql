-- Tala marketplace schema (Kinshasa)
-- Apply in Supabase SQL editor after creating project "Tala", or: supabase db push

create extension if not exists "pgcrypto";

create table if not exists public.sellers (
  id text primary key,
  name text not null,
  verified boolean not null default false,
  agent_package text check (agent_package is null or agent_package in ('pro', 'agence')),
  member_since text,
  commune text,
  phone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  synced_at timestamptz default now()
);

create table if not exists public.listings (
  id text primary key,
  title text not null,
  description text not null default '',
  category text not null,
  kind text not null check (kind in ('rent', 'sale', 'classified')),
  price numeric not null default 0,
  currency text not null check (currency in ('USD', 'CDF')),
  price_period text,
  commune text not null,
  neighborhood text,
  bedrooms int,
  bathrooms int,
  area_m2 numeric,
  year int,
  mileage_km int,
  fuel text,
  transmission text,
  brand text,
  model text,
  condition text,
  featured boolean not null default false,
  boosted_until timestamptz,
  seller_id text references public.sellers(id) on delete set null,
  image_url text,
  image_hue int,
  image_emoji text,
  tags jsonb not null default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  synced_at timestamptz default now()
);

create table if not exists public.favorites (
  listing_id text not null,
  device_id text not null default 'local',
  saved_at timestamptz not null default now(),
  synced_at timestamptz default now(),
  primary key (listing_id, device_id)
);

create table if not exists public.chat_threads (
  id text primary key,
  listing_id text,
  listing_title text,
  peer_name text,
  peer_verified boolean default false,
  last_message text,
  unread int not null default 0,
  updated_at timestamptz default now(),
  synced_at timestamptz default now()
);

create table if not exists public.chat_messages (
  id text primary key,
  thread_id text references public.chat_threads(id) on delete cascade,
  sender text not null check (sender in ('me', 'peer')),
  text text not null,
  created_at timestamptz default now(),
  synced_at timestamptz default now()
);

create index if not exists listings_category_idx on public.listings(category);
create index if not exists listings_commune_idx on public.listings(commune);
create index if not exists listings_featured_idx on public.listings(featured);
create index if not exists listings_created_idx on public.listings(created_at desc);
create index if not exists chat_messages_thread_idx on public.chat_messages(thread_id);
create index if not exists favorites_device_idx on public.favorites(device_id);

alter table public.sellers enable row level security;
alter table public.listings enable row level security;
alter table public.favorites enable row level security;
alter table public.chat_threads enable row level security;
alter table public.chat_messages enable row level security;

-- Open policies for anon MVP (tighten with auth later)
do $$ begin
  create policy "tala_sellers_all" on public.sellers for all using (true) with check (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "tala_listings_all" on public.listings for all using (true) with check (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "tala_favorites_all" on public.favorites for all using (true) with check (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "tala_threads_all" on public.chat_threads for all using (true) with check (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "tala_messages_all" on public.chat_messages for all using (true) with check (true);
exception when duplicate_object then null; end $$;
