-- Documents table
create type document_type as enum ('transcript', 'passport', 'certificate', 'other');

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade not null,
  application_id uuid references public.applications(id) on delete set null,
  document_type document_type default 'other',
  file_name text not null,
  file_url text not null,
  file_size integer,
  upload_date timestamp with time zone default now(),
  verified boolean default false
);

-- Enable RLS
alter table public.documents enable row level security;

-- Policies
create policy "Users can view own documents" on public.documents
  for select using (auth.uid() = user_id);

create policy "Users can insert own documents" on public.documents
  for insert with check (auth.uid() = user_id);

create policy "Users can delete own documents" on public.documents
  for delete using (auth.uid() = user_id);
