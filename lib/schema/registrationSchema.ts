// FILE: lib/schemas/registrationSchema.ts
import { z } from 'zod';

// Event Registration Schema
export const eventRegistrationSchema = z.object({
  event_id: z
    .string()
    .min(1, 'Event ID is required'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(150, 'Email is too long')
});

// Cancel Registration Schema
export const cancelRegistrationSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
});

// Type exports
export type EventRegistrationInput = z.infer<typeof eventRegistrationSchema>;
export type CancelRegistrationInput = z.infer<typeof cancelRegistrationSchema>;
