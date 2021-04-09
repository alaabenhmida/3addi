import {Rates} from './rates.model';
import {DocRdv} from './docRdv.model';

export interface Doctor {
  id: string;
  email: string;
  password: string;
  imagePath: string;
  name: string;
  lastName: string;
  gender: string;
  address: string;
  speciality: string;
  post: string;
  birthday: string;
  price: string;
  phone: string;
  reviews: Rates[];
  rdv: DocRdv[];
}
