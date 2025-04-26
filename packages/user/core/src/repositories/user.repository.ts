import { Repository } from '@shared/core'
import { User } from '../entities/user.entity'
export abstract class UserRepository extends Repository<User> {
  abstract findByEmail(email: string): Promise<User | null>
}
