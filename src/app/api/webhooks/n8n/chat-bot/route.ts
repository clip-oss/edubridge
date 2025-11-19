import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const body = await request.json();

    if (user) {
      await supabase.from('webhook_logs').insert({
        webhook_type: 'chat_bot',
        user_id: user.id,
        request_payload: body,
        status: 'pending'
      });
    }

    const N8N_WEBHOOK_URL = process.env.N8N_CHATBOT_WEBHOOK_URL;
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
      reply: 'I can help you with that! For document requirements, you typically need your transcript, passport copy, and language test scores. Would you like me to show you a detailed checklist?',
      confidence: 0.92,
      suggested_actions: ['View document checklist', 'Upload documents']
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
