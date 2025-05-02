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

export class FindByIdUserService
  implements IService<IUser.IFindByIdRequest, IUser.IFindByIdResponse>
{
  constructor(private readonly userRepository: UserRepository) {}
  async execute(
    request: IUser.IFindByIdRequest,
  ): Promise<IUser.IFindByIdResponse> {
    const user = await this.userRepository.findById(request.userId)

    if (!user) {
      return left(new ResourceNotFoundError('Resource not fond'))
    }

    if (!user.id.equals(new UUIDVO(request.userId))) {
      return left(new NotAllwedError('Not allowed'))
    }

    return right({ user })
  }
}
