import { Component, OnInit } from '@angular/core';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  selectedDate: Date;
  date = new Date();
  private id: string;

  constructor(private patient: PatientServiceService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
    });
  }
  onClick(): void{
    this.patient.addRdv(this.id, this.selectedDate.toJSON());
  }

}
