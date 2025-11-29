// api/Interface/event.ts

export interface Event {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  event_date: string;
  created_at: string;
  updated_at: string;
  status?: 'upcoming' | 'started';
  timeUntilStart?: number;
  hasStarted?: boolean;
  event_registrations?: EventRegistration[];
}

export interface EventRegistration {
  id: string;
  event_id: string;
  user_id: string;
  registered_at: string;
  users?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CreateEventData {
  title: string;
  description?: string;
  image_url?: string;
  event_date: string;
}

export interface UpdateEventData {
  title?: string;
  description?: string;
  image_url?: string;
  event_date?: string;
}

export interface EventResponse {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  event_date: string;
  created_at: string;
  updated_at: string;
  status: 'upcoming' | 'started';
  timeUntilStart: number;
  hasStarted: boolean;
  event_registrations?: EventRegistration[];
}

export interface DeleteEventResponse {
  message: string;
}