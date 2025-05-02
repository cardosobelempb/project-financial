import { Repository } from '@shared/core'
import { IProduct } from '../product.entity'

export interface ProductRepository extends Repository<IProduct.IPROPS> {}
