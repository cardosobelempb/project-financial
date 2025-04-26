import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeEnvService } from './env.interface';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<TypeEnvService, true>) {}

  get<T extends keyof TypeEnvService>(key: T) {
    return this.configService.get(key, { infer: true });
  }
}
