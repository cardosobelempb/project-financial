import {
  ConflictError,
  Either,
  EmailVO,
  NameVO,
  NotAllwedError,
  ResourceNotFoundError,
  UUIDVO,
} from '@shared/core'
import { UserPresenter } from '../infrastruecture'
import { User } from '../domain'
export namespace IUser {
  export enum IRoles {
    ADMIN = 'ADMIN',
    CLIENT = 'CLIENT',
    USER = 'USER',
  }

  export interface IProps {
    id?: UUIDVO
    name: NameVO
    email: EmailVO
    password?: string
    role?: IRoles
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

  export interface ICreateRequest {
    name: string
    email: string
    password: string
  }

  export type ICreateResponse = Either<
    ResourceNotFoundError | ConflictError,
    {}
  >

  export interface IDeleteRequest {
    userId: string
  }

  export type IDeleteResponse = Either<
    ResourceNotFoundError | NotAllwedError,
    {}
  >

  export interface IFindByIdRequest {
    userId: string
  }

  export type IFindByIdResponse = Either<
    ResourceNotFoundError | NotAllwedError,
    {
      user: User
    }
  >

  export type IFindByIdPresenter = {
    user: UserPresenter
  }
}
