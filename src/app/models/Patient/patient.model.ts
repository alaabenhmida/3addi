import {RDV} from './rdv.model';

export interface Patient {
  id: string;
  email: string;
  password: string;
  imagePath: string;
  name: string;
  lastName: string;
  address: string;
  birthday: string;
  bloodType: string;
  phone: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  rdv: RDV[];
}
