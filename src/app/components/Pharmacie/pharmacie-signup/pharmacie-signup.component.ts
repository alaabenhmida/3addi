import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {mimeType} from '../../../shared/mime-type.validator';
import {AdminService} from '../../../services/admin/admin.service';

@Component({
  selector: 'app-pharmacie-signup',
  templateUrl: './pharmacie-signup.component.html',
  styleUrls: ['./pharmacie-signup.component.css']
})
export class PharmacieSignupComponent implements OnInit {
  form: FormGroup;
  imagePreview: string;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  localForm: FormGroup;
  latitude = 51.673858;
  longitude = 7.815982;
  zoom = 15;
  imageform: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private adminService: AdminService) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, {validators: [Validators.required]}),
      name: new FormControl(null, {validators: [Validators.required]}),
      phone: new FormControl(null, {validators: [Validators.required]}),
    });
    this.secondFormGroup = this._formBuilder.group({
      address: new FormControl(null, {validators: [Validators.required]}),
      city: new FormControl(null, {validators: [Validators.required]}),
      state: new FormControl(null, {validators: [Validators.required]}),
      country: new FormControl(null, {validators: [Validators.required]}),
      zip: new FormControl(null, {validators: [Validators.required]}),
      speciality: new FormControl(null, {validators: [Validators.required]})
    });
    this.localForm = this._formBuilder.group({
      localisation: new FormControl(null, {validators: [Validators.required]}),
    });
    this.imageform = this._formBuilder.group({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
  }

  onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.imageform.patchValue({image: file});
    this.imageform.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  markerDragEnd($event: any): void {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }

  onSubmit(): void {
    this.adminService.addPharmacie(this.firstFormGroup.value.email, this.firstFormGroup.value.password, this.imageform.value.image,
      this.firstFormGroup.value.name, this.secondFormGroup.value.address, this.secondFormGroup.value.speciality,
      this.firstFormGroup.value.phone, this.secondFormGroup.value.address, this.secondFormGroup.value.state,
      this.secondFormGroup.value.country.name, this.secondFormGroup.value.zip, this.latitude, this.longitude);
  }
}
