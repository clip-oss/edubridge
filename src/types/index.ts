export interface User {
  id: string;
  email: string;
  full_name: string;
  country?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  date_of_birth?: string;
  nationality?: string;
  current_school?: string;
  grade?: string;
  gpa?: number;
  interests?: string;
  goals?: string;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  user_id: string;
  school_id: string;
  status: 'draft' | 'in_progress' | 'submitted' | 'accepted' | 'rejected';
  package_tier: 'starter' | 'premium' | 'concierge';
  amount_paid?: number;
  payment_status: 'pending' | 'paid' | 'refunded';
  submission_date?: string;
  decision_date?: string;
  created_at: string;
  updated_at: string;
}

export interface School {
  id: string;
  name: string;
  country: string;
  city: string;
  logo_url?: string;
  acceptance_rate?: number;
  tuition_range?: string;
  description?: string;
  website_url?: string;
  ranking?: number;
  created_at: string;
}

export interface Essay {
  id: string;
  application_id: string;
  prompt: string;
  content: string;
  ai_feedback?: {
    suggestions: string[];
    score?: number;
  };
  version: number;
  status: 'draft' | 'ai_reviewed' | 'human_reviewed' | 'final';
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  application_id?: string;
  document_type: 'transcript' | 'passport' | 'certificate' | 'other';
  file_name: string;
  file_url: string;
  file_size: number;
  upload_date: string;
  verified: boolean;
}

export interface Payment {
  id: string;
  user_id: string;
  application_id?: string;
  stripe_payment_id?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed' | 'refunded';
  created_at: string;
}

export interface WebhookLog {
  id: string;
  webhook_type: string;
  user_id: string;
  request_payload: Record<string, unknown>;
  response_payload?: Record<string, unknown>;
  status: 'pending' | 'success' | 'failed';
  error_message?: string;
  created_at: string;
}
