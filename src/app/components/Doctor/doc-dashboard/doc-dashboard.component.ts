import { Component, OnInit } from '@angular/core';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {Doctor} from '../../../models/Doctor/doctor.model';

@Component({
  selector: 'app-doc-dashboard',
  templateUrl: './doc-dashboard.component.html',
  styleUrls: ['./doc-dashboard.component.css']
})
export class DocDashboardComponent implements OnInit {
  doctorData: Doctor;

  constructor(private doctor: DoctorServiceService) { }

  ngOnInit(): void {
    this.doctor.getDcotorByKey().subscribe(data => {
      this.doctorData = {
        id: data._id,
        email: data.email,
        password: data.password,
        imagePath: data.imagePath,
        name: data.name,
        address: data.address,
        speciality: data.speciality,
        post: data.post,
        birthday: data.birthday,
        price: data.price,
        phone: data.phone,
        reviews: data.reviews,
        rdv: data.rdv
      };
    });
  }

  onAccept(patientId: string, appDate: string): void{
    this.doctor.acceptRDV(patientId, appDate);
  }

  onCancel(patientId: string, appDate: string): void {
    this.doctor.rejectRDV(patientId, appDate);
  }
}
