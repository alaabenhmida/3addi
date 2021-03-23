import {Rates} from './rates.model';

export interface Doctor {
  id: string;
  email: string;
  password: string;
  imagePath: string;
  name: string;
  address: string;
  speciality: string;
  post: string;
  birthday: string;
  price: string;
  phone: string;
  reviews: Rates[];
}
