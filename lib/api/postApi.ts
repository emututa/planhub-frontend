// FILE: lib/api/postApi.ts

import { client } from '../index';
import { 
  CreatePostData,
  UpdatePostData,
  DeletePostResponse,
  PostResponse
} from '../Interface/post';

export const postRoutes = {
  // GET /api/posts - Get all posts
  getAllPosts: async (): Promise<PostResponse[]> => {
    return await client.get<PostResponse[]>('/posts');
  },

  // GET /api/posts/:id - Get single post by ID
  getPostById: async (id: string): Promise<PostResponse> => {
    return await client.get<PostResponse>(`/posts/${id}`);
  },

  // GET /api/posts/user/:userId - Get posts by user
  getPostsByUserId: async (userId: string): Promise<PostResponse[]> => {
    return await client.get<PostResponse[]>(`/posts/user/${userId}`);
  },

  // POST /api/posts - Create new post (requires authentication)
  createPost: async (data: CreatePostData): Promise<PostResponse> => {
    return await client.post<PostResponse>('/posts', data);
  },

  // PUT /api/posts/:id - Update post (requires authentication)
  updatePost: async (id: string, data: UpdatePostData): Promise<PostResponse> => {
    return await client.put<PostResponse>(`/posts/${id}`, data);
  },

  // DELETE /api/posts/:id - Delete post (requires authentication)
  deletePost: async (id: string): Promise<DeletePostResponse> => {
    return await client.delete<DeletePostResponse>(`/posts/${id}`);
  },
};