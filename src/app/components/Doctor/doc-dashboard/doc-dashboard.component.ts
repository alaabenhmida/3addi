import {Component, OnDestroy, OnInit} from '@angular/core';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {Doctor} from '../../../models/Doctor/doctor.model';
import * as moment from 'moment';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-doc-dashboard',
  templateUrl: './doc-dashboard.component.html',
  styleUrls: ['./doc-dashboard.component.css']
})
export class DocDashboardComponent implements OnInit, OnDestroy {
  doctorData: Doctor;
  patientdata: any;
  patients = [];
  doctorSub: Subscription;
  todayRDV = [];
  today = moment(moment.now()).toString();

  constructor(private doctor: DoctorServiceService) { }


  ngOnInit(): void {
    console.log(this.today);
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
        location: data.location,
        reviews: data.reviews,
        rdv: data.rdv
      };
      this.patients = data.patients;
      data.rdv.forEach(rdv => {
        if (this.getdate(rdv.appDate, 'DDMMYYYY') === this.getdate(this.today, 'DDMMYYYY')) {
          this.todayRDV.push(rdv);
        }
      });
    });
    this.doctorSub = this.doctor.getDatalistener().subscribe(data => {
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
        location: data.location,
        reviews: data.reviews,
        rdv: data.rdv
      };
      this.patients = data.patients;
    });
  }

  isInbreack(slotTime, breackTimes): string {
    return breackTimes.some((br) => {
      return slotTime >= moment(br[0], 'HH:mm') && slotTime < moment(br[1], 'HH:mm');
    });
  }
  getdate(date: string, format: string): string{
    return (moment(date).locale('fr').format(format));
  }

  onAccept(patientId: string, appDate: string): void{
    this.doctor.acceptRDV(patientId, appDate);
  }

  onCancel(patientId: string, appDate: string): void {
    this.doctor.rejectRDV(patientId, appDate);
  }
  ngOnDestroy(): void {
    this.doctorSub.unsubscribe();
  }
}
