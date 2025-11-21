import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient(
    'https://mbbylvfsusypuvxeufdc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iYnlsdmZzdXN5cHV2eGV1ZmRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxOTg4NzgsImV4cCI6MjA0Nzc3NDg3OH0.Ej8x7xiMXENskHK0M3L0mbwhUvlYUl6Fazt1cbkq-dE',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Handle server component cookie setting
          }
        },
      },
    }
  )
}
