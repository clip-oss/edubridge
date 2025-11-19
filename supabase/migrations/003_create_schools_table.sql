-- Schools table
create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text not null,
  city text,
  logo_url text,
  acceptance_rate decimal(5,2),
  tuition_range text,
  description text,
  website_url text,
  ranking integer,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.schools enable row level security;

-- Everyone can view schools
create policy "Anyone can view schools" on public.schools
  for select using (true);

-- Insert sample schools
insert into public.schools (name, country, city, acceptance_rate, tuition_range) values
  ('Oxford University', 'UK', 'Oxford', 17.5, '$30,000 - $50,000'),
  ('Cambridge University', 'UK', 'Cambridge', 21.0, '$30,000 - $50,000'),
  ('Imperial College London', 'UK', 'London', 14.3, '$35,000 - $55,000'),
  ('LSE', 'UK', 'London', 8.9, '$25,000 - $45,000'),
  ('MIT', 'USA', 'Cambridge', 3.9, '$55,000 - $75,000'),
  ('Stanford University', 'USA', 'Stanford', 4.3, '$55,000 - $75,000'),
  ('Harvard University', 'USA', 'Cambridge', 3.4, '$55,000 - $75,000'),
  ('Yale University', 'USA', 'New Haven', 4.6, '$55,000 - $75,000');
