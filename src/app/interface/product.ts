import { Category } from './category';

export interface Product {

  id: number,
  name: string,
  brand: string,
  description: string,
  price: number,
  stock: number,
  categoryId: string

}
