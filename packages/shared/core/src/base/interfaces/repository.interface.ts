import { IPagination } from "./pagination.interface";

export abstract class IRepository<T> {
  abstract findById(id: string): Promise<T | null>;
  abstract findMany(params: IPagination): Promise<T[]>;
  abstract create(entity: T): Promise<void>;
  abstract update(entity: T): Promise<void>;
  abstract delete(entity: T): Promise<void>;
}
