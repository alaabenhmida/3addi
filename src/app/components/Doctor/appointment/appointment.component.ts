import { Component, OnInit } from '@angular/core';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import * as moment from 'moment';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  selectedDate: string;
  private id: string;


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
              public route: ActivatedRoute) { }

  ngOnInit(): void {
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
    this.patient.addRdv(this.id, this.selectedDate);
  }
}
