export interface Registration {
  id: string;
  event_id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected';
  registered_at: string;
  approved_by?: string;
  approved_at?: string;
  users?: {
    id: string;
    name: string;
    email: string;
    mobile?: string;
  };
  events?: {
    id: string;
    title: string;
    description: string;
    event_date: string;
    image_url?: string;
  };
}

export interface RegisterForEventData {
  event_id: string;
  name: string;
  email: string;
}

export interface RegistrationResponse {
  message: string;
  registration: Registration;
}

