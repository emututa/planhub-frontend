// FILE: lib/schemas/postSchema.ts

import { z } from 'zod';

// Create Post Schema
export const createPostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title too long'),
  description: z.string().max(5000, 'Description too long').optional(),
  image_url: z.string().url('Invalid image URL').optional()
});

// Update Post Schema
export const updatePostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title too long').optional(),
  description: z.string().max(5000, 'Description too long').optional(),
  image_url: z.string().url('Invalid image URL').optional()
});

// Type exports from schemas
export type CreatePostData = z.infer<typeof createPostSchema>;
export type UpdatePostData = z.infer<typeof updatePostSchema>;