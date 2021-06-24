import {Component, OnInit} from '@angular/core';
import {Pharmacie} from '../../../models/Pharmacie/pharmacie.model';
import {Patient} from '../../../models/Patient/patient.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-invoice-phar-detail',
  templateUrl: './invoice-phar-detail.component.html',
  styleUrls: ['./invoice-phar-detail.component.css']
})
export class InvoicePharDetailComponent implements OnInit {
  orderID: string;
  patientData: Patient;
  order: any;
  total = 0;

  constructor(private route: ActivatedRoute,
              private patientService: PatientServiceService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.patientService.getPatientByKey().subscribe(patient => {
        this.patientData = patient;
      });
      this.orderID = paramMap.get('id');
      this.patientService.getInoicePharmaice(paramMap.get('id')).subscribe(data => {
        this.order = data.orders[0];
        console.log(data.orders[0]);
        data.orders[0].products.forEach(product => {
          this.total += product.product.price * product.quantity;
        });
      });
    });
  }

  getDay(day: string, format: string): string {
    return moment(day).format(format);
  }
}
