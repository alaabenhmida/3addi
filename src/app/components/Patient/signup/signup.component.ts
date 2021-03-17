import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PatientAuthService} from '../../../auth/Patient/patient-auth.service';
import {mimeType} from '../../../shared/mime-type.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  imagePreview: string;

  constructor(public patientService: PatientAuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      password: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      name: new FormControl(null, { validators: [Validators.required] }),
      address: new FormControl(null, { validators: [Validators.required] }),
      birthday: new FormControl(null, { validators: [Validators.required] }),
      bloodType: new FormControl(null, { validators: [Validators.required] }),
      phone: new FormControl(null, { validators: [Validators.required] }),
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
  onSubmit(): void{
    if (this.form.invalid){
      return;
    }
    console.log(this.form.value);
    this.patientService.signup(this.form.value.email,
      this.form.value.password,
      this.form.value.image,
      this.form.value.name, this.form.value.address,
      this.form.value.birthday.toString(), this.form.value.bloodType, this.form.value.phone);
  }

}
