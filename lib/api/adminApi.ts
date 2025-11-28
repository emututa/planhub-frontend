import { client } from '../index';
import { 
  AuthResponse, 
  RegisterData, 
  LoginData, 
  Admin 
} from '../Interface/auth';

export const adminRoutes = {
  // POST /api/admin/init-first (Initialize first admin)
  initFirstAdmin: async (data: RegisterData): Promise<AuthResponse> => {
    return await client.post<AuthResponse>('/admin/init-first', data);
  },

  // POST /api/admin/login
  login: async (data: LoginData): Promise<AuthResponse> => {
    return await client.post<AuthResponse>('/admin/login', data);
  },

  // POST /api/admin/create (Admin creates another admin)
  createAdmin: async (data: RegisterData): Promise<Admin> => {
    return await client.post<Admin>('/admin/create', data);
  },

  // GET /api/admin
  getAllAdmins: async (): Promise<Admin[]> => {
    return await client.get<Admin[]>('/admin');
  },

  // DELETE /api/admin/:id
  deleteAdmin: async (id: string): Promise<{ message: string }> => {
    return await client.delete<{ message: string }>(`/admin/${id}`);
  },

  // GET /api/admin/registrations/pending
  getPendingRegistrations: async () => {
    return await client.get('/admin/registrations/pending');
  },

  // GET /api/admin/registrations/approved
  getApprovedRegistrations: async () => {
    return await client.get('/admin/registrations/approved');
  },

  // POST /api/admin/registrations/:id/approve
  approveRegistration: async (id: string) => {
    return await client.post(`/admin/registrations/${id}/approve`);
  },

  // POST /api/admin/registrations/:id/reject
  rejectRegistration: async (id: string) => {
    return await client.post(`/admin/registrations/${id}/reject`);
  },
};
