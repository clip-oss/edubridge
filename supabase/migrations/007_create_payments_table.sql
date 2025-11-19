-- Payments table
create type payment_record_status as enum ('pending', 'succeeded', 'failed', 'refunded');

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade not null,
  application_id uuid references public.applications(id) on delete set null,
  stripe_payment_id text,
  amount decimal(10,2) not null,
  currency text default 'usd',
  status payment_record_status default 'pending',
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.payments enable row level security;

-- Policies
create policy "Users can view own payments" on public.payments
  for select using (auth.uid() = user_id);
