import { Prisma, User as UserMapper } from '@prisma/client';
import { EmailVO, NameVO, UUIDVO } from '@shared/core';
import { IUser, User } from '@user/core';

export class UserPrismaMapper {
  static toDomain(raw: UserMapper): User {
    return User.create(
      {
        id: new UUIDVO(raw.id),
        name: new NameVO(raw.name),
        email: new EmailVO(raw.email),
        password: raw.password ?? undefined,
        image: raw.image ?? undefined,
        paymentMethod: raw.paymentMethod ?? undefined,
        role: raw.role as IUser.IRoles,
        emailVerified: raw.emailVerified,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UUIDVO(raw.id),
    );
  }

  static toPrisma(entity: User): Prisma.UserUncheckedCreateInput {
    return {
      id: entity.id.getValue(),
      name: entity.name.getValue(),
      email: entity.email.getValue(),
      password: entity.password,
      image: entity.image,
      paymentMethod: entity.paymentMethod,
      emailVerified: entity.emailVerified,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt ?? undefined,
    };
  }
}
