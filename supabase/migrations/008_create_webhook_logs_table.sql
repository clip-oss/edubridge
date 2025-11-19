-- Webhook logs table for n8n integration
create type webhook_status as enum ('pending', 'success', 'failed');

create table if not exists public.webhook_logs (
  id uuid primary key default gen_random_uuid(),
  webhook_type text not null,
  user_id uuid references public.users(id) on delete cascade not null,
  request_payload jsonb,
  response_payload jsonb,
  status webhook_status default 'pending',
  error_message text,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.webhook_logs enable row level security;

-- Policies
create policy "Users can view own webhook logs" on public.webhook_logs
  for select using (auth.uid() = user_id);

-- Index for faster queries
create index webhook_logs_user_id_idx on public.webhook_logs(user_id);
create index webhook_logs_type_idx on public.webhook_logs(webhook_type);
