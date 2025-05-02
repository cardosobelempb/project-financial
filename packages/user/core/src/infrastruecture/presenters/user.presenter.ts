import { DateUtils, StringUtils } from '@shared/core'
import { User } from '../../domain/entities'

export class UserPresenter {
  static toHTTP(entity: Partial<User>) {
    return {
      id: entity.id?.getValue(),
      name: entity.name?.getValue(),
      initials: StringUtils.getInitials(entity.name?.getValue() ?? ''),
      email: entity.email?.getValue(),
      // image: entity.image,
      // paymentMethod: entity.paymentMethod,
      createdAt: DateUtils.formatDate(entity.createdAt!),
      // updatedAt: DateUtils.formatDate(entity.updatedAt!),
    }
  }
}
