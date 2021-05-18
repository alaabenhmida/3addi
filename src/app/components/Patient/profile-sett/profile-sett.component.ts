import { Component, OnInit } from '@angular/core';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Patient} from '../../../models/Patient/patient.model';
import {mimeType} from '../../../shared/mime-type.validator';
import * as moment from 'moment';

@Component({
  selector: 'app-profile-sett',
  templateUrl: './profile-sett.component.html',
  styleUrls: ['./profile-sett.component.css']
})
export class ProfileSettComponent implements OnInit {
  form: FormGroup;
  patientdata: Patient;
  imagePreview: string;

  constructor(private patient: PatientServiceService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      name: new FormControl(null, { validators: [Validators.required] }),
      lastName: new FormControl(null, { validators: [Validators.required] }),
      address: new FormControl(null),
      birthday: new FormControl(null, { validators: [Validators.required] }),
      bloodType: new FormControl(null, { validators: [Validators.required] }),
      phone: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      zip: new FormControl(null),
      country: new FormControl(null),
    });
    this.patient.getPatientByKey().subscribe(patient => {
      this.patientdata = patient;
      this.imagePreview = patient.imagePath;
      this.form.patchValue ({
        email: patient.email,
        name: patient.name,
        lastName: patient.lastName,
        address: patient.address,
        birthday: patient.birthday,
        bloodType: patient.bloodType,
        phone: patient.phone,
        city: patient.city,
        state: patient.state,
        zip: patient.zip,
        country: patient.country
      });
    });
  }

  onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    this.patient.modify(this.form.value.email, this.form.value.name,
      this.form.value.lastName, this.form.value.address, this.form.value.birthday,
      this.form.value.bloodType, this.form.value.phone, this.form.value.city,
      this.form.value.state, this.form.value.zip, this.form.value.country, this.form.value.image)
      .subscribe(result => {
        console.log(result);
      });
  }
  calculateAge(birthday): number { // birthday is a date
    const age = moment.duration(moment().diff(moment(birthday)));
    return  Math.floor(age.asYears());
  }
  getDay(day: string, format: string): string {
    return moment(day).format(format);
  }
}
