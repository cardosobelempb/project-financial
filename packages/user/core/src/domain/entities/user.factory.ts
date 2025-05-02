import { EmailVO, NameVO, UUIDVO } from '@shared/core'
import { User } from './user.entity'
import { IUser } from '../../interfaces'

export function userFactory(override: Partial<IUser.IProps> = {}, id?: UUIDVO) {
  const user = User.create(
    {
      name: new NameVO('Lucas Cardoso'),
      email: new EmailVO('lucas@gmail.com'),
      password: '$2a$12$T3ObT0q.pxZ1PXL7l6YOy.BygRM0HBogIPpQOgjHoqM8vrrt9h46W',
      role: IUser.IRoles.USER,
      ...override,
    },
    id,
  )

  return user
}
