import {
  ConflictError,
  Either,
  EmailVO,
  HashGenerator,
  IService,
  left,
  NameVO,
  ResourceNotFoundError,
  right,
} from '@shared/core'
import { User } from '../../domain/entities/user.entity'
import { IUser } from '../../interfaces/user.interface'
import { UserRepository } from '../../infrastruecture/repositories'

export class RegisterUserService
  implements IService<IUser.ICreateRequest, IUser.ICreateResponse>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}
  async execute(input: IUser.ICreateRequest): Promise<IUser.ICreateResponse> {
    const { email, password, name } = input

    const userWithEmail = await this.userRepository.findByEmail(email)

    if (userWithEmail) {
      return left(new ConflictError('User with this email already exists'))
    }

    // const strongpassword = PasswordUtils.getPasswordStrength(password)

    // if (strongpassword) {
    //   switch (strongpassword) {
    //     case 'Fraca':
    //       throw new MethodArgumentNotValidError(
    //         'A senha deve ter no mínimo 8 caracteres.',
    //       )
    //     case 'Média':
    //       throw new MethodArgumentNotValidError(
    //         'A senha deve conter pelo menos uma letra maiúscula.',
    //       )
    //     default:
    //       throw new MethodArgumentNotValidError(
    //         'A senha deve conter pelo menos um símbolo especial.',
    //       )
    //   }
    // }

    const hashedPassword = await this.hashGenerator.hash(password)

    const entity = User.create({
      name: new NameVO(name, { minLength: 3, maxLength: 60 }),
      email: new EmailVO(email),
      password: hashedPassword,
    })

    await this.userRepository.create(entity)

    return right({})
  }
}
