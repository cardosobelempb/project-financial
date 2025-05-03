import { EmailVO, NameVO, PasswordVO, UUIDVO } from '@shared/core'
import { IUser } from '../../interfaces'
import { User } from './user.entity'

export function userFactory(override: Partial<IUser.IProps> = {}, id?: UUIDVO) {
  const user = User.create(
    {
      name: new NameVO('Lucas Cardoso'),
      email: new EmailVO('lucas@gmail.com'),
      password: new PasswordVO('$2a$12$T3ObT0q.pxZ1PXL7l6YOy.BygRM0HBogIPpQOgjHoqM8vrrt9h46W'),
      role: IUser.IRoles.USER,
      ...override,
    },
    id,
  )

  return user
}
