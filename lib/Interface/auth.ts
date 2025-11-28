export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  created_at?: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  mobile: string;
  created_at?: string;
}

export interface AuthResponse {
  user?: User;
  admin?: Admin;
  token: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  mobile: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  mobile?: string;
}
