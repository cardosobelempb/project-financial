import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';

import { BadRequestError, NotAllwedError, right } from '@shared/core';
import { DeleteUserService, IUser } from '@user/core';

@Controller('users')
export class DeleteUserController {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(
    @Param('userId') userId: string,
  ): Promise<IUser.IDeleteResponse> {
    console.log('DeleteUserController =>', userId);

    const result = await this.deleteUserService.execute({ userId });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case BadRequestException:
          throw new BadRequestException(error.message);
        case NotAllwedError:
          throw new NotAllwedError(error.message);
        default:
          throw new BadRequestError(error.message);
      }
    }

    return right({});
  }
}
