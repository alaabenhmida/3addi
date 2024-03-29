import {Product} from './product.model';
import {Rates} from '../Doctor/rates.model';
import {Award} from './award.model';
import {LocationModel} from '../Doctor/location.model';

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
  aboutMe: string;
  location: LocationModel;
  products: Product[];
  reviews: Rates [];
  awards: Award [];
}
