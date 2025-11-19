# EduBridge Platform

AI-powered education consulting platform helping students apply to schools abroad.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Automation**: n8n webhooks

## Features

- Apple-style landing page with smooth animations
- AI-powered essay assistance
- Smart school matching
- Visa document checklist
- Real-time application tracking
- Document upload and management
- Stripe payment integration
- n8n webhook integration for AI workflows

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account (test mode)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/edubridge-platform.git
cd edubridge-platform
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Fill in your credentials in `.env.local`:
- Supabase URL and keys
- Stripe keys
- n8n webhook URLs (optional)

4. Set up Supabase

Create a new project on [supabase.com](https://supabase.com), then run the migrations in `supabase/migrations/` in order.

5. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js pages and API routes
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── (marketing)/       # Public pages (landing, pricing)
│   ├── (dashboard)/       # Protected dashboard pages
│   └── api/               # API routes and webhooks
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── marketing/        # Landing page components
│   ├── dashboard/        # Dashboard components
│   └── shared/           # Shared components
├── lib/                   # Utilities and integrations
└── types/                # TypeScript types
```

## n8n Integration

See [WEBHOOK_SETUP.md](./WEBHOOK_SETUP.md) for webhook integration details.

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
STRIPE_SECRET_KEY=
N8N_ESSAY_WEBHOOK_URL=
```

See `.env.example` for all variables.

## Deployment

```bash
vercel
```

## License

Proprietary - All rights reserved
