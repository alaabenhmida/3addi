import { Component, OnInit } from '@angular/core';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import * as moment from 'moment';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {Doctor} from '../../../models/Doctor/doctor.model';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  selectedDate: string;
  private id: string;
  doctorData: Doctor;
  private rating: number;


  app = ['2021-04-01T09:00:00',
    '2021-04-01T10:00:00'];
  week = [];
  day = moment(Date.now()).startOf('day').toString();
  x = {
    nextSlot: 60,
    breackTimes: [
      ['11:00', '14:00'], ['16:00', '18:00']
    ],
    startTime: '8:00',
    endTime: '20:00'
  };

  constructor(private patient: PatientServiceService,
              private doctor: DoctorServiceService,
              public route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      console.log(this.id);
      this.doctor.getDoctor(this.id).subscribe(data => {
        // console.log(data);
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
        for (const rev of this.doctorData.reviews) {
          this.rating += rev.rate;
        }
        console.log(this.rating / data.reviews.length);
      });
    });

    const days = [];
    const today = moment(Date.now()).format('YYYY MM DD');
    for (let i = 0; i < 7; i++) {
      days.push(moment(today, 'YYYY-MM-DD').add(i, 'days'));
    }
    for (const day of days) {
      this.week.push(moment(day._d).format('YYYY MM DD'));
    }


    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.doctor.getDoctor(paramMap.get('id')).subscribe(data => {
        for (let rdv of data.rdv) {
          this.app.push(rdv.appDate);
        }
      });
    });
  }

  isInbreack(slotTime, breackTimes): string {
    return breackTimes.some((br) => {
      return slotTime >= moment(br[0], 'HH:mm') && slotTime < moment(br[1], 'HH:mm');
    });
  }

  getSlots(day, nextSlot, breackTimess, startTime, endTimee): string[] {
    const breackTimes = [...breackTimess];
    for (const a of this.app) {
      if (moment(a).format('DD-MM-YYYY') === moment(day).format('DD-MM-YYYY')) {
        const start = moment(a).format('HH:mm');
        const finish = moment(start, 'HH:mm').add(nextSlot, 'minutes');
        breackTimes.push([start,
          finish.format('HH:mm')]);
      }
    }
    const times = [];

    let slotTime = moment(startTime, 'HH:mm');
    const endTime = moment(endTimee, 'HH:mm');
    while (slotTime < endTime) {
      if (!this.isInbreack(slotTime, breackTimes)) {
        times.push(slotTime.format('HH:mm'));
      }
      slotTime = slotTime.add(nextSlot, 'minutes');
    }
    return (times);
  }

  getDay(day: string, format: string): string {
    return moment(day).format(format);
  }
  onclick(time: any, date: any): void {
    const datenow = moment(date).format('YYYY-MM-DD');
    const fullDate = datenow + 'T' + time + ':00';
    this.selectedDate = fullDate;
    console.log(fullDate);

  }
  // onClick(): void{
  //   this.patient.addRdv(this.id, this.selectedDate);
  // }

  onSubmit(): void {
    if (this.selectedDate == null) {
      return;
    }
    this.patient.addRdv(this.id, this.selectedDate).subscribe(result => {
      this.router.navigate(['/ordre', result.rdvId]);
    });
  }
}
