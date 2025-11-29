
import { z } from 'zod';

// ============================================
// EVENT SCHEMAS
// ============================================

// Create Event Schema (Frontend)
export const createEventSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title too long')
    .trim(),
  
  description: z
    .string()
    .max(5000, 'Description too long')
    .trim()
    .optional()
    .or(z.literal('')),
  
  image_url: z
    .string()
    .url('Invalid image URL')
    .optional()
    .or(z.literal('')),
  
  event_date: z
    .string()
    .refine((date) => {
      const parsed = new Date(date);
      return !isNaN(parsed.getTime());
    }, 'Invalid date format')
    .refine((date) => {
      const parsed = new Date(date);
      const now = new Date();
      return parsed >= now;
    }, 'Event date must be in the future')
});

// Update Event Schema (Frontend)
export const updateEventSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title too long')
    .trim()
    .optional(),
  
  description: z
    .string()
    .max(5000, 'Description too long')
    .trim()
    .optional()
    .or(z.literal('')),
  
  image_url: z
    .string()
    .url('Invalid image URL')
    .optional()
    .or(z.literal('')),
  
  event_date: z
    .string()
    .refine((date) => {
      const parsed = new Date(date);
      return !isNaN(parsed.getTime());
    }, 'Invalid date format')
    .optional()
});

// Event ID Param Schema
export const eventIdSchema = z.object({
  id: z.string().uuid('Invalid event ID')
});

// ============================================
// ADDITIONAL FRONTEND SCHEMAS
// ============================================

// Event Filter Schema
export const eventFilterSchema = z.object({
  search: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sortBy: z.enum(['date', 'title', 'created_at']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional()
});

// Event Response Schema (what you get from backend)
export const eventResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  image_url: z.string().nullable(),
  event_date: z.string(),
  created_by: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string()
});

// ============================================
// TYPE EXPORTS
// ============================================

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type EventFilterInput = z.infer<typeof eventFilterSchema>;
export type EventResponse = z.infer<typeof eventResponseSchema>;

// ============================================
// FORM DEFAULT VALUES
// ============================================

export const createEventDefaults: Partial<CreateEventInput> = {
  title: '',
  description: '',
  image_url: '',
  event_date: ''
};

export const updateEventDefaults: Partial<UpdateEventInput> = {
  title: '',
  description: '',
  image_url: '',
  event_date: ''
};

// ============================================
// VALIDATION HELPERS
// ============================================

/**
 * Validates create event form data
 */
export const validateCreateEvent = (data: unknown) => {
  try {
    return {
      success: true,
      data: createEventSchema.parse(data),
      errors: null
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        errors: error.flatten().fieldErrors
      };
    }
    return {
      success: false,
      data: null,
      errors: { _form: ['Validation failed'] }
    };
  }
};

/**
 * Validates update event form data
 */
export const validateUpdateEvent = (data: unknown) => {
  try {
    return {
      success: true,
      data: updateEventSchema.parse(data),
      errors: null
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        errors: error.flatten().fieldErrors
      };
    }
    return {
      success: false,
      data: null,
      errors: { _form: ['Validation failed'] }
    };
  }
};

/**
 * Format date for input field (YYYY-MM-DD HH:MM)
 */
export const formatDateForInput = (date: string | Date): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

/**
 * Format date for display
 */
export const formatDateForDisplay = (date: string | Date): string => {
  return new Date(date).toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};