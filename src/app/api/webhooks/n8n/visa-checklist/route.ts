import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const body = await request.json();

    if (user) {
      await supabase.from('webhook_logs').insert({
        webhook_type: 'visa_checklist',
        user_id: user.id,
        request_payload: body,
        status: 'pending'
      });
    }

    const N8N_WEBHOOK_URL = process.env.N8N_VISA_CHECKLIST_WEBHOOK_URL;
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
      requirements: [
        { item: 'Valid passport', description: 'Must be valid for at least 6 months', status: 'pending' },
        { item: 'Acceptance letter', description: 'Official letter from university', status: 'pending' },
        { item: 'Financial proof', description: 'Bank statements showing sufficient funds', status: 'pending' },
        { item: 'TB test certificate', description: 'Required for UK student visa', status: 'pending' }
      ]
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
