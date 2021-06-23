import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Doctor} from '../../../models/Doctor/doctor.model';
import * as moment from 'moment';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-certificat',
  templateUrl: './add-certificat.component.html',
  styleUrls: ['./add-certificat.component.css']
})
export class AddCertificatComponent implements OnInit {
  form: FormGroup;
  doctorData: Doctor;
  patientData: any;
  today = moment(new Date()).toString();

  constructor(public route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private doctorSevive: DoctorServiceService,
              private patientService: PatientServiceService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      from: new FormControl(null),
      to: new FormControl(null),
      description: new FormControl(null)
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.patientService.getPatient(paramMap.get('id')).subscribe(patient => {
        this.patientData = patient;
      });
    });
    this.doctorSevive.getDcotorByKey().subscribe(doctor => {
      this.doctorData = doctor;
    });
  }

  getdate(date: string, format: string): string{
    return (moment(date).locale('fr').format(format));
  }

  onSubmit(): void {
    this.doctorSevive.addCertificat(this.patientData._id, this.form.value.from, this.form.value.to,
      this.form.value.description).subscribe(resutl => {
      this.toastr.success('Certificat ajoutée', '', {
        positionClass: 'toast-bottom-right'
      });
      this.router.navigate(['/patient', this.patientData._id]);
    });
  }

  clearForm(): void {
    this.form.reset();
  }

}
