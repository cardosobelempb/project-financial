import { RegisterUserService } from '@auth/core';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { BadRequestError, ConflictError, ResourceNotFoundError, right } from '@shared/core';
import { IUser } from '@user/core';

@Controller('/register')
export class RegisterUserController {
  constructor(private readonly registerUserService: RegisterUserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body()
    request: IUser.ICreateRequest,
    // @Res() res: Response,
    // @Req() req: Request,
  ): Promise<IUser.ICreateResponse> {
    const { name, email, password } = request;

    const result = await this.registerUserService.execute({
      email,
      name,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new ResourceNotFoundError(error.message);
        case ConflictError:
          throw new ConflictError(error.message);
        default:
          throw new BadRequestError(error.message);
      }
    }

    // const uri = `${req.protocol}://${req.get('host')}${req.originalUrl}/${result.value.user.id.getValue()}`;
    // res.location(uri).send();

    return right({});
  }
}
