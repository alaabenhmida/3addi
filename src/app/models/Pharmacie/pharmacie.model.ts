import {Product} from './product.model';
import {Rates} from '../Doctor/rates.model';

export interface Pharmacie {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  imagePath: string;
  type: string;
  phone: number;
  products: Product[];
  reviews: Rates [];
}
