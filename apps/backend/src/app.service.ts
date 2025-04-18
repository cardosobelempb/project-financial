import { Injectable } from '@nestjs/common';
import { somar } from '@shared/core';

@Injectable()
export class AppService {
  getHello(): string {
    return `${somar(1, 2)}`;
  }
}
