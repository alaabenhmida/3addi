import { Component, OnInit } from '@angular/core';
import {Patient} from '../../../models/Patient/patient.model';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  patientdata: Patient;
  form: FormGroup;
  identique = true;

  constructor(private patientService: PatientServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      old: new FormControl(null, { validators: [Validators.required] }),
      new: new FormControl(null, { validators: [Validators.required] }),
      confirm: new FormControl(null, { validators: [Validators.required] }),
    });
    this.patientService.getPatientByKey().subscribe(data => {
      this.patientdata = {
        id : data._id,
        email : data.email,
        password : data.password,
        imagePath : data.imagePath,
        name : data.name,
        lastName: data.lastName,
        address : data.address,
        birthday : data.birthday,
        bloodType : data.bloodType,
        phone : data.phone,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country,
        rdv : data.rdv
      };
    });
  }
  getdate(date: string, format: string): string{
    return (moment(date).format(format));
  }
  calculateAge(birthday): number { // birthday is a date
    const age = moment.duration(moment().diff(moment(birthday)));
    return  Math.floor(age.asYears());
  }

  onleave(): boolean {
    return this.form.value.new === this.form.value.confirm;
  }

  onSubmit(): void {
    this.patientService.verifypassword(this.form.value.old).subscribe(data => {
      if (data.message === 'password correct') {
        if (this.onleave()) {
          this.patientService.changepassword(this.form.value.confirm).subscribe(result => {
            console.log(result);
          });
        }
      }
    });
  }
}
