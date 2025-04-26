import { IPagination } from '@shared/core'
import { User, UserRepository } from '@user/core'
import { PrismaService } from 'src/shared/database/prisma/prisma.service'

import { UserPrismaMapper } from './mappers/user-prisma.mapper'

export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return UserPrismaMapper.toDomain(user)
  }

  findById(id: string): Promise<User> {
    throw new Error('Method not implemented.')
  }

  findMany(params: IPagination): Promise<User[]> {
    throw new Error('Method not implemented.')
  }

  async create(entity: User): Promise<void> {
    const data = UserPrismaMapper.toPrisma(entity)
    await this.prismaService.user.create({ data })
  }

  update(entity: User): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(entity: User): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
