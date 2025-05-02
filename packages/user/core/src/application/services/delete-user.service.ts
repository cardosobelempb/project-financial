import {
  IService,
  left,
  NotAllwedError,
  ResourceNotFoundError,
  right,
  UUIDVO,
} from '@shared/core'
import { UserRepository } from '../../infrastruecture/repositories'
import { IUser } from '../../interfaces/user.interface'

export class DeleteUserService
  implements IService<IUser.IDeleteRequest, IUser.IDeleteResponse>
{
  constructor(private readonly userRepository: UserRepository) {}
  async execute(input: IUser.IDeleteRequest): Promise<IUser.IDeleteResponse> {
    const { userId } = input
    console.log('DeleteUserService', userId)

    const user = await this.userRepository.findById(userId)
    console.log('User =>', user)

    if (!user) {
      return left(new ResourceNotFoundError('Resource not fond'))
    }

    if (!user.id.equals(new UUIDVO(userId))) {
      return left(new NotAllwedError('Not allowed'))
    }

    await this.userRepository.delete(user)

    console.log(user)

    return right({})
  }
}
