import {Component, OnInit} from '@angular/core';
import {DoctorAuthService} from '../../../auth/Doctor/doctor-auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {mimeType} from '../../../shared/mime-type.validator';
import {AdminService} from '../../../services/admin/admin.service';
import {PatientServiceService} from '../../../services/Patient/patient-service.service';
import {PatientAuthService} from '../../../auth/Patient/patient-auth.service';

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
  patientsecondFormGroup: FormGroup;
  pharmaciesecondFormGroup: FormGroup;
  localForm: FormGroup;
  latitude = 51.673858;
  longitude = 7.815982;
  zoom = 15;
  imageform: FormGroup;
  role = 'option1';

  constructor(public doctorService: DoctorAuthService, private _formBuilder: FormBuilder,
              private adminService: AdminService,
              private patientService: PatientAuthService) {
  }

  ngOnInit(): void {
    this.pharmaciesecondFormGroup = this._formBuilder.group({
      address: new FormControl(null, {validators: [Validators.required]}),
      city: new FormControl(null, {validators: [Validators.required]}),
      state: new FormControl(null, {validators: [Validators.required]}),
      country: new FormControl(null, {validators: [Validators.required]}),
      zip: new FormControl(null, {validators: [Validators.required]}),
      speciality: new FormControl(null, {validators: [Validators.required]})
    });
    this.patientsecondFormGroup = this._formBuilder.group({
      address: new FormControl(null, {validators: [Validators.required]}),
      city: new FormControl(null, {validators: [Validators.required]}),
      state: new FormControl(null, {validators: [Validators.required]}),
      zip: new FormControl(null, {validators: [Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)]}),
      country: new FormControl(null, {validators: [Validators.required]}),
    });
    this.firstFormGroup = this._formBuilder.group({
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, {validators: [Validators.required]}),
      birthday: new FormControl(null, {validators: [Validators.required]}),
      firsName: new FormControl(null, {validators: [Validators.required]}),
      lastName: new FormControl(null, {validators: [Validators.required]}),
      phone: new FormControl(null, {validators: [Validators.required]}),
      gender: new FormControl(null, {validators: [Validators.required]})
    });
    this.secondFormGroup = this._formBuilder.group({
      address: new FormControl(null, {validators: [Validators.required]}),
      city: new FormControl(null, {validators: [Validators.required]}),
      state: new FormControl(null, {validators: [Validators.required]}),
      country: new FormControl(null, {validators: [Validators.required]}),
      zip: new FormControl(null, {validators: [Validators.required]}),
      speciality: new FormControl(null, {validators: [Validators.required]}),
      price: new FormControl(null, {validators: [Validators.required]})
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
    if (this.role === 'option2') {
      // if (this.form.invalid){
      //   return;
      // }
      this.adminService.addDoctor(this.firstFormGroup.value.email, this.firstFormGroup.value.password, this.imageform.value.image,
        this.firstFormGroup.value.firsName, this.firstFormGroup.value.lastName, this.secondFormGroup.value.address,
        this.secondFormGroup.value.speciality, this.firstFormGroup.value.birthday, this.secondFormGroup.value.price,
        this.firstFormGroup.value.phone, this.firstFormGroup.value.gender, this.secondFormGroup.value.city,
        this.secondFormGroup.value.state, this.secondFormGroup.value.country.name, this.secondFormGroup.value.zip,
        this.latitude, this.longitude);
    } else if (this.role === 'option1') {
      this.patientService.signup(this.firstFormGroup.value.email,
        this.firstFormGroup.value.password,
        this.imageform.value.image,
        this.firstFormGroup.value.firsName,
        this.firstFormGroup.value.lastName,
        this.firstFormGroup.value.gender,
        this.patientsecondFormGroup.value.address,
        this.patientsecondFormGroup.value.city,
        this.patientsecondFormGroup.value.state,
        this.patientsecondFormGroup.value.zip,
        this.patientsecondFormGroup.value.country.name,
        this.firstFormGroup.value.birthday.toString(), this.firstFormGroup.value.bloodType, this.firstFormGroup.value.phone);
    } else if (this.role === 'option3') {
      this.adminService.addPharmacie(this.firstFormGroup.value.email, this.firstFormGroup.value.password, this.imageform.value.image,
        this.firstFormGroup.value.firsName, this.pharmaciesecondFormGroup.value.address, this.pharmaciesecondFormGroup.value.speciality,
        this.firstFormGroup.value.phone, this.pharmaciesecondFormGroup.value.address, this.pharmaciesecondFormGroup.value.state,
        this.pharmaciesecondFormGroup.value.country.name, this.pharmaciesecondFormGroup.value.zip, this.latitude, this.longitude);
    }
    // this.doctorService.signup(this.form.value.email,
    //   this.form.value.password,
    //   this.form.value.image,
    //   this.form.value.name, this.form.value.address, this.form.value.speciality, this.form.value.post,
    //   this.form.value.birthday.toString(), this.form.value.price, this.form.value.phone);
  }

}
