import { Module } from '@nestjs/common';
import { UserPrismaRepository } from 'src/application/repositories/prisma/user-prisma.respository';
import { USER_REPOSITORY } from 'src/shared/constants/repositories.constants';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: USER_REPOSITORY, // O token constante para o UserRepository
      useFactory: (prismaService: PrismaService) => {
        return new UserPrismaRepository(prismaService);
      },
      inject: [PrismaService], // Injetando o PrismaService
    },
  ],
  exports: [USER_REPOSITORY], // Apenas exporta o token do repositório, não a implementação duplicada
})
export class DatabaseModule {}
