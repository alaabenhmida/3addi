import { Component, OnInit } from '@angular/core';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {Doctor} from '../../../models/Doctor/doctor.model';
import {Patient} from '../../../models/Patient/patient.model';

@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.css']
})
export class MyPatientsComponent implements OnInit {
  doctorData: Doctor;
  patients: Patient[] = [];
  isLoading = false;

  constructor(private doctor: DoctorServiceService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.doctor.getDcotorByKey().subscribe(data => {
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
        aboutMe: data.aboutMe,
        reviews: data.reviews,
        rdv: data.rdv
      };
      this.patients = data.patients;
    });
    this.isLoading = false;
  }
}
