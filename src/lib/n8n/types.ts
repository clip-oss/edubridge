export interface EssayGenerationPayload {
  user_id: string;
  prompt: string;
  content?: string;
  action: 'generate' | 'feedback' | 'improve';
  profile?: {
    name: string;
    interests: string;
    gpa: number;
  };
}

export interface EssayGenerationResponse {
  success: boolean;
  outline?: string[];
  draft?: string;
  suggestions?: string[];
  score?: number;
}

export interface SchoolMatchingPayload {
  user_id: string;
  profile: {
    gpa: number;
    interests: string[];
    budget: string;
    location_preference: string[];
  };
}

export interface SchoolMatchingResponse {
  success: boolean;
  matches: Array<{
    school_id: string;
    name: string;
    match_score: number;
    reasons: string[];
  }>;
}

export interface VisaChecklistPayload {
  user_id: string;
  nationality: string;
  destination_country: string;
  school: string;
}

export interface VisaChecklistResponse {
  success: boolean;
  requirements: Array<{
    item: string;
    description: string;
    deadline?: string;
    status: 'pending' | 'completed';
  }>;
}

export interface ChatBotPayload {
  user_id: string;
  message: string;
  context?: {
    current_page: string;
    application_stage: string;
  };
}

export interface ChatBotResponse {
  success: boolean;
  reply: string;
  confidence: number;
  suggested_actions?: string[];
}
