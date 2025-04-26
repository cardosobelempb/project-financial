import { UniqueUUID } from '@shared/core'

import { User } from './user.entity'
import { IUser } from './user.interface'

export function userFactory(
  override: Partial<IUser.IProps> = {},
  id?: UniqueUUID,
) {
  const user = User.create(
    {
      name: 'Lucas Cardoso',
      email: 'lucas@gmail.com',
      password:
        '$2a$12$T3ObT0q.pxZ1PXL7l6YOy.BygRM0HBogIPpQOgjHoqM8vrrt9h46W',

      role: IUser.Roles.USER,
      ...override,
    },
    id,
  )

  return user
}
