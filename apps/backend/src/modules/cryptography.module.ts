import { Module } from '@nestjs/common';
import { HashComparer, HashGenerator } from '@shared/core';
import { BcryptHasher } from 'src/infra/cryptography/bcrypt-hasher';

@Module({
  providers: [
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [HashComparer, HashGenerator],
})
export class CryptoGraphyModule {}
