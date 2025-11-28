import { client } from '../index';
import { 
  AuthResponse, 
  RegisterData, 
  LoginData, 
  UpdateUserData, 
  User 
} from '../Interface/auth';

export const userRoutes = {
  // POST /api/users/register
  register: async (data: RegisterData): Promise<AuthResponse> => {
    return await client.post<AuthResponse>('/users/register', data);
  },

  // POST /api/users/login
  login: async (data: LoginData): Promise<AuthResponse> => {
    return await client.post<AuthResponse>('/users/login', data);
  },

  // GET /api/users
  getAllUsers: async (): Promise<User[]> => {
    return await client.get<User[]>('/users');
  },

  // GET /api/users/:id
  getUserById: async (id: string): Promise<User> => {
    return await client.get<User>(`/users/${id}`);
  },

  // PUT /api/users/:id
  updateUser: async (id: string, data: UpdateUserData): Promise<User> => {
    return await client.put<User>(`/users/${id}`, data);
  },

  // DELETE /api/users/:id
  deleteUser: async (id: string): Promise<{ message: string }> => {
    return await client.delete<{ message: string }>(`/users/${id}`);
  },
};
