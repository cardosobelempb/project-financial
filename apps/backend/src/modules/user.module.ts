import { Module } from '@nestjs/common';
import {
  DeleteUserService,
  FindByIdUserService,
  UserRepository,
} from '@user/core';
import { DeleteUserController } from 'src/infra/controllers/user/delete-user.controller';
import { FindByIdUserController } from '../infra/controllers/user/find-by-id-user.controller';
import { USER_REPOSITORY } from '../shared/constants/repositories.constants';
import { CryptoGraphyModule } from './cryptography.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule, CryptoGraphyModule], // Importando o DatabaseModule para ter acesso ao USER_REPOSITORY
  controllers: [
    FindByIdUserController,
    DeleteUserController,
  ],
  providers: [
    {
      provide: DeleteUserService,
      useFactory: (userRepository: UserRepository) => {
        return new DeleteUserService(userRepository);
      },
      inject: [USER_REPOSITORY], // Usando o token USER_REPOSITORY
    },
    {
      provide: FindByIdUserService,
      useFactory: (userRepository: UserRepository) => {
        return new FindByIdUserService(userRepository);
      },
      inject: [USER_REPOSITORY], // Usando o token USER_REPOSITORY
    },
  ],
})
export class UserModule {}
