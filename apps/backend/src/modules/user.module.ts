import { Module } from '@nestjs/common';
import { HashGenerator } from '@shared/core';
import {
  DeleteUserService,
  FindByIdUserService,
  RegisterUserService,
  UserRepository,
} from '@user/core';
import { DeleteUserController } from 'src/infra/controllers/user/delete-user.controller';
import { RegisterUserController } from '../infra/controllers/auth/register-user.controller';
import { FindByIdUserController } from '../infra/controllers/user/find-by-id-user.controller';
import { USER_REPOSITORY } from '../shared/constants/repositories.constants';
import { CryptoGraphyModule } from './cryptography.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule, CryptoGraphyModule], // Importando o DatabaseModule para ter acesso ao USER_REPOSITORY
  controllers: [
    FindByIdUserController,
    RegisterUserController,
    DeleteUserController,
  ],
  providers: [
    {
      provide: RegisterUserService,
      useFactory: (
        userRepository: UserRepository,
        hashGenerator: HashGenerator,
      ) => {
        return new RegisterUserService(userRepository, hashGenerator);
      },
      inject: [USER_REPOSITORY, HashGenerator], // Usando o token USER_REPOSITORY
    },
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
