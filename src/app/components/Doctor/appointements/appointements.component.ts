import { Component, OnInit } from '@angular/core';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {Doctor} from '../../../models/Doctor/doctor.model';
import * as moment from 'moment';

@Component({
  selector: 'app-appointements',
  templateUrl: './appointements.component.html',
  styleUrls: ['./appointements.component.css']
})
export class AppointementsComponent implements OnInit {
  doctorData: Doctor;

  constructor(private doctorService: DoctorServiceService) { }

  ngOnInit(): void {
    this.doctorService.getDcotorByKey().subscribe(data => {
      this.doctorData = data;
    });
  }

  getdate(date: string, format: string): string{
    return (moment(date).format(format));
  }
  onAccept(patientId: string, appDate: string): void{
    this.doctorService.acceptRDV(patientId, appDate);
  }

  onCancel(patientId: string, appDate: string): void {
    this.doctorService.rejectRDV(patientId, appDate);
  }
}
