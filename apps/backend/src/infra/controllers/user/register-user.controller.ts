import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { BadRequestError, ConflictError, NotFoundError } from '@shared/core';
import { IUser, RegisterUserService } from '@user/core';
import { Request, Response } from 'express';

@Controller('/register')
export class RegisterUserController {
  constructor(
    private readonly registerUserService: RegisterUserService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body() request: IUser.Request,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<void> {
    const { name, email, password } = request;

    const response = await this.registerUserService.execute({
      email,
      name,
      password,
    });

    const uri = `${req.protocol}://${req.get('host')}${req.originalUrl}/${response.value}`;
    console.log('uri => ', uri, "response => ", response);

    if (response.isLeft()) {
      const error = response.value;

      switch (error.constructor) {
        case NotFoundError:
          throw new ConflictError(error.message);
        default:
          throw new BadRequestError(error.message);
      }
    }

    res.location(uri).send();
  }
}
