import { IPagination } from '@shared/core'
import { Product } from '../../product.entity'
import { ProductRepository } from '../product-repository'

export class ProductInMemoryRepository implements ProductRepository {
  public items: Product.IPROPS[] = []

  async findById(id: string): Promise<Product.IPROPS | null> {
    const product = this.items.find(item => item.id === id)
    if (!product) {
      return null
    }
    return product
  }
  async findMany({ page }: IPagination): Promise<Product.IPROPS[]> {
    const products = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return products
  }
  async create(entity: Product.IPROPS): Promise<void> {
    this.items.push(entity)
  }
  async update(entity: Product.IPROPS): Promise<void> {
    const index = this.items.findIndex(item => item.id === entity.id)
    this.items[index] = entity
  }
  async delete(entity: Product.IPROPS): Promise<void> {
    const index = this.items.findIndex(item => item.id === entity.id)
    this.items.splice(index, 1)
  }
}
