import { HashGenerator, IService, right } from '@shared/core'

import { User } from '../entities/user.entity'
import { IUser } from '../entities/user.interface'
import { UserRepository } from '../repositories'

export class RegisterUserService
  implements IService<IUser.Request, IUser.Response>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}
  async execute(input: IUser.Request): Promise<IUser.Response> {
    const { email, password, name } = input
    const userWithEmail = await this.userRepository.findByEmail(email)
    if (userWithEmail) {
      throw new Error('User with this email already exists')
    }
    const hashedPassword = await this.hashGenerator.hash(password)
    const user = User.create({
      name,
      email,
      password: hashedPassword
    })

    await this.userRepository.create(user)

    return right({ user })
  }
}
