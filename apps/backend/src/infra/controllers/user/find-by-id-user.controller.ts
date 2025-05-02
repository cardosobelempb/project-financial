import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';

import {
  BadRequestError,
  NotAllwedError,
  ResourceNotFoundError,
  right,
} from '@shared/core';
import { FindByIdUserService, IUser, UserPresenter } from '@user/core';

@Controller('users')
export class FindByIdUserController {
  constructor(private readonly findByIdUserService: FindByIdUserService) {}

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  async handle(@Param('userId') userId: string) {
    const result = await this.findByIdUserService.execute({ userId });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new ResourceNotFoundError(error.message);
        case NotAllwedError:
          throw new NotAllwedError(error.message);
        default:
          throw new BadRequestError(error.message);
      }
    }

    const user = result.value.user;

    return { user: UserPresenter.toHTTP(user) };
  }
}
