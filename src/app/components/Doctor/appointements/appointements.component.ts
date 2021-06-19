import {Component, OnDestroy, OnInit} from '@angular/core';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {Doctor} from '../../../models/Doctor/doctor.model';
import * as moment from 'moment';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-appointements',
  templateUrl: './appointements.component.html',
  styleUrls: ['./appointements.component.css']
})
export class AppointementsComponent implements OnInit, OnDestroy {
  doctorData: Doctor;
  doctorSub: Subscription;

  constructor(private doctorService: DoctorServiceService) { }

  ngOnInit(): void {
    this.doctorSub = this.doctorService.getDatalistener().subscribe(doctor => {
      this.doctorData = doctor;
    });
    this.doctorService.getDcotorByKey().subscribe(data => {
      this.doctorData = data;
    });
  }

  getdate(date: string, format: string): string{
    return (moment(date).format(format));
  }
  onAccept(patientId: string, appDate: string): void{
    this.doctorService.acceptRDV(patientId, appDate);
    this.doctorService.getDcotorByKey().subscribe(doctor => {
      this.doctorService.dataUpdated.next(doctor);
    });
  }

  onCancel(patientId: string, appDate: string): void {
    this.doctorService.rejectRDV(patientId, appDate);
  }

  ngOnDestroy(): void {
    this.doctorSub.unsubscribe();
  }
}
