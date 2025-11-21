import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    'https://mbbylvfsusypuvxeufdc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iYnlsdmZzdXN5cHV2eGV1ZmRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1ODczNzQsImV4cCI6MjA3OTE2MzM3NH0.8cVMVs9dt6Tz6pIOVITqtoG_Bq581_rA8M2qzhWwvDM'
  )
}
