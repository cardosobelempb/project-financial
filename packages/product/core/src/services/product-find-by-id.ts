import { IService } from '@shared/core'
import { IProduct } from '../entities'
import { ProductRepository } from '../entities/repositoies/product-repository'

export class ProductFindById implements IService<string, IProduct.IOUT> {
  constructor(private readonly productRepositor: ProductRepository) {}

  async execute(input: string): Promise<IProduct.IOUT | null> {
    const product = this.productRepositor.findById(input)
    if (!product) {
      throw new Error('Product not found')
    }

    return product
  }
}
