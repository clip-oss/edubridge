-- Applications table
create type application_status as enum ('draft', 'in_progress', 'submitted', 'accepted', 'rejected');
create type package_tier as enum ('starter', 'premium', 'concierge');
create type payment_status as enum ('pending', 'paid', 'refunded');

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade not null,
  school_id uuid references public.schools(id) on delete cascade not null,
  status application_status default 'draft',
  package_tier package_tier not null,
  amount_paid decimal(10,2),
  payment_status payment_status default 'pending',
  submission_date timestamp with time zone,
  decision_date timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.applications enable row level security;

-- Policies
create policy "Users can view own applications" on public.applications
  for select using (auth.uid() = user_id);

create policy "Users can insert own applications" on public.applications
  for insert with check (auth.uid() = user_id);

create policy "Users can update own applications" on public.applications
  for update using (auth.uid() = user_id);
