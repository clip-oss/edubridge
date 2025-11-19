-- Essays table
create type essay_status as enum ('draft', 'ai_reviewed', 'human_reviewed', 'final');

create table if not exists public.essays (
  id uuid primary key default gen_random_uuid(),
  application_id uuid references public.applications(id) on delete cascade not null,
  prompt text not null,
  content text,
  ai_feedback jsonb,
  version integer default 1,
  status essay_status default 'draft',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.essays enable row level security;

-- Policies (join through applications)
create policy "Users can view own essays" on public.essays
  for select using (
    exists (
      select 1 from public.applications
      where applications.id = essays.application_id
      and applications.user_id = auth.uid()
    )
  );

create policy "Users can insert own essays" on public.essays
  for insert with check (
    exists (
      select 1 from public.applications
      where applications.id = essays.application_id
      and applications.user_id = auth.uid()
    )
  );

create policy "Users can update own essays" on public.essays
  for update using (
    exists (
      select 1 from public.applications
      where applications.id = essays.application_id
      and applications.user_id = auth.uid()
    )
  );
