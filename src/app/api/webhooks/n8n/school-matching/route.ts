import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const body = await request.json();

    if (user) {
      await supabase.from('webhook_logs').insert({
        webhook_type: 'school_matching',
        user_id: user.id,
        request_payload: body,
        status: 'pending'
      });
    }

    const N8N_WEBHOOK_URL = process.env.N8N_SCHOOL_MATCHING_WEBHOOK_URL;
    if (N8N_WEBHOOK_URL && N8N_WEBHOOK_URL !== 'PLACEHOLDER_URL') {
      const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      return NextResponse.json(await n8nResponse.json());
    }

    return NextResponse.json({
      success: true,
      matches: [
        { school_id: '1', name: 'Oxford University', match_score: 87, reasons: ['Strong CS program', 'Matches GPA'] },
        { school_id: '2', name: 'Cambridge University', match_score: 82, reasons: ['Research opportunities'] },
        { school_id: '3', name: 'Imperial College', match_score: 79, reasons: ['Industry connections'] }
      ]
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
