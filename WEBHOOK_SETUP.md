# n8n Webhook Integration Guide

This guide explains how to connect your n8n workflows to the EduBridge platform.

## Overview

EduBridge uses n8n webhooks to power AI features like essay feedback, school matching, and the chatbot. All endpoints return mock data by default, allowing the platform to function without n8n during development.

## Setup Steps

### 1. Create n8n Workflows

For each feature, create a workflow in n8n with:
- **Webhook trigger** node (respond immediately)
- Your AI/automation logic
- **Respond to Webhook** node with JSON output

### 2. Get Webhook URLs

After activating your workflow, n8n provides a URL like:
```
https://your-n8n.com/webhook/essay-generation
```

### 3. Add to Environment Variables

Update your `.env.local`:
```env
N8N_ESSAY_WEBHOOK_URL=https://your-n8n.com/webhook/essay-generation
N8N_SCHOOL_MATCHING_WEBHOOK_URL=https://your-n8n.com/webhook/school-matching
N8N_VISA_CHECKLIST_WEBHOOK_URL=https://your-n8n.com/webhook/visa-checklist
N8N_CHATBOT_WEBHOOK_URL=https://your-n8n.com/webhook/chatbot
```

### 4. Test the Connection

```bash
curl -X POST http://localhost:3000/api/webhooks/n8n/essay-generation \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Why Oxford?", "content": "Test essay..."}'
```

## Webhook Specifications

### Essay Generation

**Endpoint**: `/api/webhooks/n8n/essay-generation`

**Request Payload**:
```json
{
  "user_id": "uuid",
  "prompt": "Essay prompt text",
  "content": "Current essay content",
  "action": "feedback"
}
```

**Expected Response**:
```json
{
  "success": true,
  "suggestions": [
    "Add more specific examples",
    "Strengthen conclusion"
  ],
  "score": 75
}
```

### School Matching

**Endpoint**: `/api/webhooks/n8n/school-matching`

**Request Payload**:
```json
{
  "user_id": "uuid",
  "profile": {
    "gpa": 3.8,
    "interests": ["Computer Science", "AI"],
    "budget": "30000-50000",
    "location_preference": ["UK", "USA"]
  }
}
```

**Expected Response**:
```json
{
  "success": true,
  "matches": [
    {
      "school_id": "uuid",
      "name": "Oxford University",
      "match_score": 87,
      "reasons": ["Strong CS program", "Matches GPA"]
    }
  ]
}
```

### Visa Checklist

**Endpoint**: `/api/webhooks/n8n/visa-checklist`

**Request Payload**:
```json
{
  "user_id": "uuid",
  "nationality": "Moldova",
  "destination_country": "UK",
  "school": "Oxford University"
}
```

**Expected Response**:
```json
{
  "success": true,
  "requirements": [
    {
      "item": "Valid passport",
      "description": "Must be valid for 6 months",
      "status": "pending"
    }
  ]
}
```

### Chat Bot

**Endpoint**: `/api/webhooks/n8n/chat-bot`

**Request Payload**:
```json
{
  "user_id": "uuid",
  "message": "What documents do I need?",
  "context": {
    "current_page": "documents",
    "application_stage": "essay_writing"
  }
}
```

**Expected Response**:
```json
{
  "success": true,
  "reply": "For your application, you'll need...",
  "confidence": 0.95,
  "suggested_actions": ["Upload transcript", "View checklist"]
}
```

## n8n Workflow Examples

### Essay Feedback Workflow

1. **Webhook** - Receive essay content
2. **HTTP Request** - Call OpenAI/Claude API
3. **Function** - Parse AI response
4. **Respond to Webhook** - Return structured feedback

### School Matching Workflow

1. **Webhook** - Receive student profile
2. **Supabase** - Query schools database
3. **Function** - Calculate match scores
4. **Respond to Webhook** - Return ranked matches

## Monitoring

All webhook calls are logged to the `webhook_logs` table in Supabase:

```sql
SELECT * FROM webhook_logs
WHERE webhook_type = 'essay_generation'
ORDER BY created_at DESC
LIMIT 10;
```

## Troubleshooting

**Webhook not responding:**
- Check n8n workflow is activated
- Verify URL in .env.local
- Check n8n logs for errors

**Mock data showing instead of n8n response:**
- Ensure webhook URL is not set to `PLACEHOLDER_URL`
- Check environment variable is loaded correctly

**Authentication errors:**
- Webhooks currently allow unauthenticated requests for testing
- Add authentication as needed for production

## Security Notes

For production, consider adding:
- Webhook secret validation
- Rate limiting
- Request signing

Example with secret:
```typescript
const secret = request.headers.get('x-webhook-secret');
if (secret !== process.env.N8N_WEBHOOK_SECRET) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```
