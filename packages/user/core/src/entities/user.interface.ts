import { Either, NotFoundError } from '@shared/core';
import { z } from 'zod';

export namespace IUser {
  export enum Roles {
    ADMIN = 'ADMIN',
    CLIENT = 'CLIENT',
    USER = 'USER',
  }
  export interface IProps {
    name: string
    email: string
    password: string
    role?: Roles
    emailVerified?: Date | null
    image?: string
    address?: string
    paymentMethod?: string
    createdAt: Date
    updatedAt?: Date | null
  }

  export interface IPresent {
    name: string
    email: string
    password: string
    role?: Roles
    emailVerified?: Date | null
    image?: string
    address?: string
    paymentMethod?: string
    createdAt: Date
    updatedAt?: Date | null
  }

  export interface ICreateUser extends IProps {
    confirmPassword: string
  }

  export interface IUpdateUser extends Partial<IProps> {}

  export interface IPropsWithPassword {
    oldPassword: string
    newPassword: string
    confirmPassword: string
  }

  export interface IUserWithToken extends IProps {
    token: string
  }

  export type Response = Either<
    NotFoundError,
    {
      user: IPresent
    }
    >

  export const CreateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Tipagem automática (Zod <3)
export type Request = z.infer<typeof CreateUserSchema>;
}
