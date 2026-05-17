alter table public.profiles
  add column if not exists subscription_status text not null default 'free',
  add column if not exists stripe_customer_id text,
  add column if not exists stripe_subscription_id text,
  add column if not exists subscription_updated_at timestamptz;

alter table public.profiles drop constraint if exists profiles_subscription_status_check;
alter table public.profiles add constraint profiles_subscription_status_check
  check (subscription_status in ('free', 'premium', 'pro', 'canceled', 'past_due'));
