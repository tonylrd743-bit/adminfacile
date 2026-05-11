alter table public.profiles
  add column if not exists company_name text,
  add column if not exists profession text,
  add column if not exists activity text,
  add column if not exists specialty text,
  add column if not exists siret text,
  add column if not exists vat_applicable boolean not null default false,
  add column if not exists hourly_rate numeric,
  add column if not exists service_area text,
  add column if not exists travel_fee numeric,
  add column if not exists professional_email text,
  add column if not exists phone text,
  add column if not exists logo_url text,
  add column if not exists document_style text not null default 'sobre',
  add column if not exists updated_at timestamptz not null default now();

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
