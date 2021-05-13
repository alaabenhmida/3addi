import { Component, OnInit } from '@angular/core';
import {DoctorAuthService} from '../../../auth/Doctor/doctor-auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {mimeType} from '../../../shared/mime-type.validator';

@Component({
  selector: 'app-signup-dr',
  templateUrl: './signup-dr.component.html',
  styleUrls: ['./signup-dr.component.css']
})
export class SignupDrComponent implements OnInit {
  form: FormGroup;
  imagePreview: string;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(public doctorService: DoctorAuthService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
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
      speciality: new FormControl(null, { validators: [Validators.required] }),
      post: new FormControl(null, { validators: [Validators.required] }),
      birthday: new FormControl(null, { validators: [Validators.required] }),
      price: new FormControl(null, { validators: [Validators.required] }),
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
    this.doctorService.signup(this.form.value.email,
      this.form.value.password,
      this.form.value.image,
      this.form.value.name, this.form.value.address, this.form.value.speciality, this.form.value.post,
      this.form.value.birthday.toString(), this.form.value.price, this.form.value.phone);
  }

}
