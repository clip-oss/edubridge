import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id || 'demo-user';
    const body = await request.json();

    // Log webhook call
    if (user) {
      await supabase.from('webhook_logs').insert({
        webhook_type: 'essay_generation',
        user_id: userId,
        request_payload: body,
        status: 'pending'
      });
    }

    // Call n8n webhook if configured
    const N8N_WEBHOOK_URL = process.env.N8N_ESSAY_WEBHOOK_URL;
    if (N8N_WEBHOOK_URL && N8N_WEBHOOK_URL !== 'PLACEHOLDER_URL') {
      const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      return NextResponse.json(await n8nResponse.json());
    }

    // Mock response for development
    return NextResponse.json({
      success: true,
      suggestions: [
        'Consider adding more specific examples from your experience',
        'Strengthen your conclusion with a forward-looking statement',
        'Your opening paragraph effectively captures attention'
      ],
      score: 75
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
