create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  first_name text,
  last_name text,
  company_name text,
  profession text,
  activity text,
  specialty text,
  siret text,
  vat_applicable boolean not null default false,
  hourly_rate numeric,
  service_area text,
  travel_fee numeric,
  professional_email text,
  phone text,
  logo_url text,
  document_style text not null default 'sobre',
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  request_type text not null,
  form_data jsonb not null,
  ai_result jsonb,
  status text not null default 'draft',
  created_at timestamptz not null default now()
);

alter table public.requests drop constraint if exists requests_request_type_check;
alter table public.requests add constraint requests_request_type_check check (
  request_type in (
    'caf',
    'rsa',
    'prime-activite',
    'chomage',
    'aide-logement',
    'logement-social',
    'securite-sociale',
    'retraite',
    'impots',
    'ants',
    'urssaf',
    'resiliation',
    'contestation',
    'lettre-proprietaire',
    'aide-financiere',
    'CAF',
    'RSA',
    'Prime d''activite'
  )
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  request_id uuid references public.requests(id) on delete set null,
  title text not null,
  file_url text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.requests enable row level security;
alter table public.documents enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "requests_select_own" on public.requests;
create policy "requests_select_own" on public.requests
  for select using (auth.uid() = user_id);

drop policy if exists "requests_insert_own" on public.requests;
create policy "requests_insert_own" on public.requests
  for insert with check (auth.uid() = user_id);

drop policy if exists "requests_update_own" on public.requests;
create policy "requests_update_own" on public.requests
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "documents_select_own" on public.documents;
create policy "documents_select_own" on public.documents
  for select using (auth.uid() = user_id);

drop policy if exists "documents_insert_own" on public.documents;
create policy "documents_insert_own" on public.documents
  for insert with check (auth.uid() = user_id);

drop policy if exists "documents_update_own" on public.documents;
create policy "documents_update_own" on public.documents
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "documents_delete_own" on public.documents;
create policy "documents_delete_own" on public.documents
  for delete using (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

drop policy if exists "storage_documents_select_own" on storage.objects;
create policy "storage_documents_select_own" on storage.objects
  for select using (
    bucket_id = 'documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "storage_documents_insert_own" on storage.objects;
create policy "storage_documents_insert_own" on storage.objects
  for insert with check (
    bucket_id = 'documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "storage_documents_update_own" on storage.objects;
create policy "storage_documents_update_own" on storage.objects
  for update using (
    bucket_id = 'documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "storage_documents_delete_own" on storage.objects;
create policy "storage_documents_delete_own" on storage.objects
  for delete using (
    bucket_id = 'documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, first_name, last_name, professional_email)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.email
  )
  on conflict (id) do update set
    email = excluded.email,
    first_name = coalesce(excluded.first_name, public.profiles.first_name),
    last_name = coalesce(excluded.last_name, public.profiles.last_name),
    professional_email = coalesce(public.profiles.professional_email, excluded.professional_email),
    updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
