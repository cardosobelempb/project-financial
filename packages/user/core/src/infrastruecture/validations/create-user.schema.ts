import { z } from 'zod'

export const CreateUserSchema = z.object({
  email: z
    .string()
    .email()
    .refine(val => val !== 'example@domain.com', {
      message: 'Email cannot be from example@domain.com',
    }),
  name: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' }),
  password: z
    .string()
    .min(3, { message: 'Password must be at least 3 characters long' }),
})
