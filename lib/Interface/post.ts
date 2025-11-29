// FILE: lib/interface/post.ts

// Response types (what you get back from the API) - matches your backend
export interface PostResponse {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  users?: {  // Made optional to handle null
    id: string;
    name: string;
    email: string;
  } | null;  // Can be null
}

// Delete response
export interface DeletePostResponse {
  message: string;
}

// Re-export schema types for convenience
export type { CreatePostData, UpdatePostData } from '../schema/postSchema';







