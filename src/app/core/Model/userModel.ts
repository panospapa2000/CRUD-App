import { ProductModel } from './productModel';

export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  products?: ProductModel[];
  numberOfProducts: number;
}
