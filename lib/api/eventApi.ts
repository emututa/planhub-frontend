// api/routes/event.ts

import { client } from '../index';
import { 
  Event,
  CreateEventData,
  UpdateEventData,
  DeleteEventResponse,
  EventResponse
} from '../Interface/event';

export const eventRoutes = {
  // GET /api/events - Get all events
  getAllEvents: async (): Promise<EventResponse[]> => {
    return await client.get<EventResponse[]>('/events');
  },

  // GET /api/events/upcoming - Get upcoming events only
  getUpcomingEvents: async (): Promise<EventResponse[]> => {
    return await client.get<EventResponse[]>('/events/upcoming');
  },

  // GET /api/events/started - Get started/past events
  getStartedEvents: async (): Promise<EventResponse[]> => {
    return await client.get<EventResponse[]>('/events/started');
  },

  // GET /api/events/:id - Get single event by ID
  getEventById: async (id: string): Promise<EventResponse> => {
    return await client.get<EventResponse>(`/events/${id}`);
  },

  // POST /api/events - Create new event (requires authentication)
  createEvent: async (data: CreateEventData): Promise<EventResponse> => {
    return await client.post<EventResponse>('/events', data);
  },

  // PUT /api/events/:id - Update event (requires authentication)
  updateEvent: async (id: string, data: UpdateEventData): Promise<EventResponse> => {
    return await client.put<EventResponse>(`/events/${id}`, data);
  },

  // DELETE /api/events/:id - Delete event (requires authentication)
  deleteEvent: async (id: string): Promise<DeleteEventResponse> => {
    return await client.delete<DeleteEventResponse>(`/events/${id}`);
  },
};