import { Component, OnInit } from '@angular/core';
import {Pharmacie} from '../../../models/Pharmacie/pharmacie.model';
import {PharmacieService} from '../../../services/pharmacie/pharmacie.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {mimeType} from '../../../shared/mime-type.validator';
import {CountryISO, SearchCountryField} from 'ngx-intl-tel-input';
import {PatientAuthService} from '../../../auth/Patient/patient-auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-pharmacie-setting',
  templateUrl: './pharmacie-setting.component.html',
  styleUrls: ['./pharmacie-setting.component.css']
})
export class PharmacieSettingComponent implements OnInit {
  pharmacieData: Pharmacie;
  form: FormGroup;
  imagePreview: string;
  latitude = 51.673858;
  longitude = 7.815982;

  constructor(private pharmacieService: PharmacieService,
              public authService: PatientAuthService,
              private toastr: ToastrService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      address: new FormControl(null, { validators: [Validators.required] }),
      phone: new FormControl(null, { validators: [Validators.required] }),
      city: new FormControl(null, { validators: [Validators.required] }),
      state: new FormControl(null, { validators: [Validators.required] }),
      zip: new FormControl(null, { validators: [Validators.required] }),
      country: new FormControl(null, { validators: [Validators.required] }),
      type: new FormControl(null, { validators: [Validators.required] }),
      aboutMe: new FormControl(null),
      awards: this.fb.array([]),
    });

    this.pharmacieService.getDataByKey().subscribe(data => {
      this.pharmacieData = data;
      this.form.patchValue({
        name: data.name,
        email: data.email,
        address: data.address,
        phone: data.phone,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country,
        type: data.type,
        aboutMe: data.aboutMe
      });

      const awards = this.form.controls.awards as FormArray;
      for (const aw of data.awards) {
        awards.push(this.fb.group({
          awards: new FormControl(aw.awards),
          year: new FormControl(aw.year)
        }));
      }

      this.imagePreview = data.imagePath;
    });
  }

  addAward(): void {
    const award = this.form.controls.awards as FormArray;
    award.push(this.fb.group({
      awards: new FormControl(null, { validators: [Validators.required] }),
      year: new FormControl(null, { validators: [Validators.required] })
    }));
  }
  deleteAward(index): void{
    const award = this.form.controls.awards as FormArray;
    award.removeAt(index);
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
    this.pharmacieService.modify(this.form.value.name,  this.form.value.email,
      this.form.value.address, this.form.value.city, this.form.value.state,
      this.form.value.country, this.form.value.zip, this.form.value.phone,
      this.form.value.type, this.form.value.awards, this.form.value.aboutMe, this.form.value.image).subscribe(result => {
      this.authService.userimageListener.next(result.imagePath);
      this.toastr.success('changement enregistré', '', {
        positionClass: 'toast-bottom-right'
      });
    });
  }
  get awards(): any { // a getter!
    return (this.form.get('awards') as FormArray).controls;
  }
  markerDragEnd($event: any): void {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }

}
