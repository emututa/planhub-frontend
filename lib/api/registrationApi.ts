
import { client } from '../index';
import { 
  Registration,
  RegisterForEventData,
  RegistrationResponse,
  MyRegistrationsResponse
} from '../Interface/registration';

export const registrationRoutes = {
  // POST /api/registrations - Register for event with name and email
  registerForEvent: async (data: RegisterForEventData): Promise<RegistrationResponse> => {
    return await client.post<RegistrationResponse>('/registrations', data);
  },

  // GET /api/registrations/my-registrations?email=xxx - Get user's registrations by email
  getMyRegistrations: async (email: string): Promise<MyRegistrationsResponse> => {
    return await client.get<MyRegistrationsResponse>(`/registrations/my-registrations?email=${email}`);
  },

  // GET /api/registrations/event/:eventId - Get all registrations for an event
  getEventRegistrations: async (eventId: string): Promise<Registration[]> => {
    return await client.get<Registration[]>(`/registrations/event/${eventId}`);
  },

  // GET /api/registrations/:id - Get specific registration
  getRegistrationById: async (id: string): Promise<Registration> => {
    return await client.get<Registration>(`/registrations/${id}`);
  },

  // DELETE /api/registrations/:id - Cancel registration
  cancelRegistration: async (id: string, email: string): Promise<{ message: string }> => {
    return await client.delete<{ message: string }>(`/registrations/${id}`, {
      data: { email }
    });
  },
};