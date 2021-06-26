import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isLinear = false;

  constructor(public patientService: PatientAuthService,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      password: new FormControl(null, {validators: [Validators.required,
        Validators.minLength(8)]}),
      name: new FormControl(null, {validators: [Validators.required]}),
      lastName: new FormControl(null, {validators: [Validators.required]}),
      birthday: new FormControl(null, {validators: [Validators.required]}),
      bloodType: new FormControl(null, {validators: [Validators.required]}),
      phone: new FormControl(null, {validators: [Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)]}),
      gender: new FormControl(null, {validators: [Validators.required]})
    });
    this.secondFormGroup = this._formBuilder.group({
      address: new FormControl(null, {validators: [Validators.required]}),
      city: new FormControl(null, {validators: [Validators.required]}),
      state: new FormControl(null, {validators: [Validators.required]}),
      zip: new FormControl(null, {validators: [Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)]}),
      country: new FormControl(null, {validators: [Validators.required]}),
    });
    this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
  }

  onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      console.log(this.form.errors);
      return;
    }
    console.log(this.secondFormGroup.value);
    this.patientService.signup(this.firstFormGroup.value.email,
      this.firstFormGroup.value.password,
      this.form.value.image,
      this.firstFormGroup.value.name,
      this.firstFormGroup.value.lastName,
      this.firstFormGroup.value.gender,
      this.secondFormGroup.value.address,
      this.secondFormGroup.value.city,
      this.secondFormGroup.value.state,
      this.secondFormGroup.value.zip,
      this.secondFormGroup.value.country.name,
      this.firstFormGroup.value.birthday.toString(), this.firstFormGroup.value.bloodType, this.firstFormGroup.value.phone);
  }

}
