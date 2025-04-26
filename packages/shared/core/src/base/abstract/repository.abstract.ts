import { IPagination } from '../interfaces/pagination.interface'

export abstract class Repository<T> {
  abstract findById(id: string): Promise<T | null>
  abstract findMany(params: IPagination): Promise<T[]>
  abstract create(entity: T): Promise<void>
  abstract update(entity: T): Promise<void>
  abstract delete(entity: T): Promise<void>
}
