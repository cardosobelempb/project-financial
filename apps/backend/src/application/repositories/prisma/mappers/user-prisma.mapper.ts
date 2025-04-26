import { Prisma, User as UserMapper } from '@prisma/client'
import { UniqueUUID } from '@shared/core'
import { User } from '@user/core'

export class UserPrismaMapper {
  static toDomain(raw: UserMapper): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password ?? '',
      },
      new UniqueUUID(raw.id),
    )
  }

  static toPrisma(entity: User): Prisma.UserUncheckedCreateInput {
    return {
      id: entity.id.toString(),
      name: entity.name,
      email: entity.email,
      password: entity.password,
    }
  }
}
