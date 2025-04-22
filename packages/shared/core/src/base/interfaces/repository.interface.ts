import { IPagination } from "./pagination.interface";

export interface IRepository<T> {
  findById(id: string): Promise<T | null>;
  findMany(params: IPagination): Promise<T[]>;
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  delete(entity: T): Promise<void>;
}
