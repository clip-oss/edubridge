-- Profiles table for student information
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade not null,
  date_of_birth date,
  nationality text,
  current_school text,
  grade text,
  gpa decimal(3,2),
  interests text,
  goals text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id)
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = user_id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = user_id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = user_id);
