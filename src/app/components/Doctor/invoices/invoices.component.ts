import { Component, OnInit } from '@angular/core';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {Doctor} from '../../../models/Doctor/doctor.model';
import * as moment from 'moment';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  invoices = [];
  doctorData: Doctor;

  constructor(private doctorService: DoctorServiceService) { }

  ngOnInit(): void {
    this.doctorService.getDcotorByKey().subscribe(data => {
      this.doctorData = {
        id: data._id,
        email: data.email,
        password: data.password,
        imagePath: data.imagePath,
        name: data.name,
        lastName: data.lastName,
        gender: data.gender,
        address: data.address,
        speciality: data.speciality,
        post: data.post,
        birthday: data.birthday,
        price: data.price,
        phone: data.phone,
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        state: data.state,
        country: data.country,
        zip: data.zip,
        reviews: data.reviews,
        rdv: data.rdv
      };
      this.invoices = data.invoices;
    });
  }
  getdate(date: string, format: string): string{
    return (moment(date).format(format));
  }

}
