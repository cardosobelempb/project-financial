import {
  Either,
  EntityNotFoundException,
  HashGenerator,
  HashPassword,
  IService,
} from '@shared/core'
import { IUser } from '../../../../user/core/src/entities/user.interface'
import { UserRepository } from '../../../../user/core/src/repositories/user.repository'
import { User } from '../../../../user/core/src/entities/user.entity'

export namespace UserCreatedProps {
  export interface Request {
    name: string
    email: string
    password: string
    phone: string
  }

  export type Response = Either<
    EntityNotFoundException,
    {
      user: User
    }
  >
}
export default class RegisterUserService
  implements IService<IUser.ICreateUser, void>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}
  async execute(input: IUser.ICreateUser): Promise<void | null> {
    const { email, password, name } = input
    const userWithEmail = await this.userRepository.findByEmail(email.value)
    if (userWithEmail) {
      throw new Error('User with this email already exists')
    }
    const hashedPassword = await this.hashGenerator.hash(password.value)
    const user = User.create({
      name,
      email,
      password: new HashPassword(hashedPassword),
    })

    await this.userRepository.create(user)
  }
}
