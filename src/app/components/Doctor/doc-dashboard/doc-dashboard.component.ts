import { Component, OnInit } from '@angular/core';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {Doctor} from '../../../models/Doctor/doctor.model';
import * as moment from 'moment';

@Component({
  selector: 'app-doc-dashboard',
  templateUrl: './doc-dashboard.component.html',
  styleUrls: ['./doc-dashboard.component.css']
})
export class DocDashboardComponent implements OnInit {
  doctorData: Doctor;
  patientdata: any;
  patients = [];

  constructor(private doctor: DoctorServiceService) { }

  ngOnInit(): void {

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
        reviews: data.reviews,
        rdv: data.rdv
      };
      this.patients = data.patients;
      console.log(this.patients);
    });
  }

  isInbreack(slotTime, breackTimes): string {
    return breackTimes.some((br) => {
      return slotTime >= moment(br[0], 'HH:mm') && slotTime < moment(br[1], 'HH:mm');
    });
  }
  getdate(date: string, format: string): string{
    return (moment(date).format(format));
  }

  onAccept(patientId: string, appDate: string): void{
    this.doctor.acceptRDV(patientId, appDate);
  }

  onCancel(patientId: string, appDate: string): void {
    this.doctor.rejectRDV(patientId, appDate);
  }
}
