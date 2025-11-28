import { z } from 'zod';

// Register User Schema
export const registerUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(150, 'Email is too long'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(255, 'Password is too long'),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
  mobile: z
    .string()
    .min(10, 'Mobile number must be at least 10 digits')
    .max(20, 'Mobile number is too long')
    .regex(/^[0-9+\-\s()]+$/, 'Invalid mobile number format')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Login User Schema
export const loginUserSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
});

// Update User Schema
export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .optional(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(150, 'Email is too long')
    .optional(),
  mobile: z
    .string()
    .min(10, 'Mobile number must be at least 10 digits')
    .max(20, 'Mobile number is too long')
    .regex(/^[0-9+\-\s()]+$/, 'Invalid mobile number format')
    .optional()
});

// Change Password Schema
export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(6, 'New password must be at least 6 characters')
    .max(255, 'Password is too long'),
  confirmNewPassword: z
    .string()
    .min(1, 'Please confirm your new password')
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match",
  path: ["confirmNewPassword"],
});

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
});

// Reset Password Schema
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(255, 'Password is too long'),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Type exports
export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;