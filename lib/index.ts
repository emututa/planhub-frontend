// import axios, { AxiosInstance } from 'axios';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// class ApiClient {
//   private client: AxiosInstance;

//   constructor() {
//     this.client = axios.create({
//       baseURL: `${API_BASE_URL}/api`, // /api added here
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     // Request interceptor - add token
//     this.client.interceptors.request.use(
//       (config) => {
//         if (typeof window !== 'undefined') {
//           const token = localStorage.getItem('token');
//           if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//           }
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     // Response interceptor - handle errors
//     this.client.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         if (error.response?.status === 401) {
//           if (typeof window !== 'undefined') {
//             localStorage.removeItem('token');
//             localStorage.removeItem('user');
//             window.location.href = '/login';
//           }
//         }
//         return Promise.reject(error);
//       }
//     );
//   }

//   // GET request
//   async get<T>(url: string): Promise<T> {
//     const response = await this.client.get<T>(url);
//     return response.data;
//   }

//   // POST request
//   async post<T>(url: string, data?: any): Promise<T> {
//     const response = await this.client.post<T>(url, data);
//     return response.data;
//   }

//   // PUT request
//   async put<T>(url: string, data?: any): Promise<T> {
//     const response = await this.client.put<T>(url, data);
//     return response.data;
//   }

//   // DELETE request
//   async delete<T>(url: string): Promise<T> {
//     const response = await this.client.delete<T>(url);
//     return response.data;
//   }
// }

// export const client = new ApiClient();











import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${API_BASE_URL}/api`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor - add token (check both user and admin tokens)
    this.client.interceptors.request.use(
      (config) => {
        if (typeof window !== 'undefined') {
          // First try admin token, then user token
          const adminToken = localStorage.getItem('admin_token'); // Changed to admin_token
          const userToken = localStorage.getItem('token');
          
          const token = adminToken || userToken;
          
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          if (typeof window !== 'undefined') {
            // Check which token failed
            const adminToken = localStorage.getItem('admin_token'); // Changed to admin_token
            const userToken = localStorage.getItem('token');
            
            if (adminToken) {
              // Admin token failed
              localStorage.removeItem('admin_token'); // Changed to admin_token
              localStorage.removeItem('admin_user'); // Changed to admin_user
              window.location.href = '/admin/login';
            } else if (userToken) {
              // User token failed
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/login';
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // GET request
  async get<T>(url: string): Promise<T> {
    const response = await this.client.get<T>(url);
    return response.data;
  }

  // POST request
  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  // PUT request
  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  // DELETE request
  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }
}

export const client = new ApiClient();