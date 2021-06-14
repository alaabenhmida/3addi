import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {Doctor} from '../../../models/Doctor/doctor.model';
import {mimeType} from '../../../shared/mime-type.validator';
import {PatientAuthService} from '../../../auth/Patient/patient-auth.service';
import {ToastrService} from 'ngx-toastr';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-doc-profil-setting',
  templateUrl: './doc-profil-setting.component.html',
  styleUrls: ['./doc-profil-setting.component.css']
})
export class DocProfilSettingComponent implements OnInit {
  form: FormGroup;
  passwordForm: FormGroup;
  doctorData: any;
  imagePreview: string;
  latitude = 51.673858;
  longitude = 7.815982;
  zoom = 15;
  address: string;
  private geoCoder;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [];

  constructor(private fb: FormBuilder, private doctorService: DoctorServiceService, private authService: PatientAuthService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.setCurrentLocation();
    this.passwordForm = this.fb.group({
      password: new FormControl(null)
    });
    this.form = this.fb.group({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      username: new FormControl(null),
      email: new FormControl(null),
      firstName: new FormControl(null, { validators: [Validators.required] }),
      lastName: new FormControl(null, { validators: [Validators.required] }),
      phone: new FormControl(null),
      gender: new FormControl(null, { validators: [Validators.required] }),
      birthday: new FormControl(null, { validators: [Validators.required] }),
      address1: new FormControl(null),
      address2: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      country: new FormControl(null),
      zip: new FormControl(null),
      price: new FormControl(null),
      aboutMe: new FormControl(null),
      education: this.fb.array([]),
      experience: this.fb.array([]),
      awards: this.fb.array([]),
      memberships: this.fb.array([]),
      registrations: this.fb.array([]),
    });
    this.doctorService.getDcotorByKey().subscribe(doctor => {
      this.imagePreview = doctor.imagePath;
      this.doctorData = doctor;

      const edu = this.form.controls.education as FormArray;
      for (const ed of doctor.education) {
        edu.push(this.fb.group({
          Degree: new FormControl(ed.Degree, { validators: [Validators.required] }),
          College: new FormControl(ed.College, { validators: [Validators.required] }),
          Year_of_Completion: new FormControl(ed.Year_of_Completion, { validators: [Validators.required] })
        }));
      }

      const ex = this.form.controls.experience as FormArray;
      for (const exp of doctor.experience) {
        ex.push(this.fb.group({
          hospital_Name: new FormControl(exp.hospital_Name),
          from: new FormControl(exp.from),
          to: new FormControl(exp.to),
          designation: new FormControl(exp.designation)
          }));
      }

      const awards = this.form.controls.awards as FormArray;
      for (const aw of doctor.awards) {
        awards.push(this.fb.group({
          awards: new FormControl(aw.awards),
          year: new FormControl(aw.year)
        }));
      }

      const memberships = this.form.controls.memberships as FormArray;
      for (const mb of doctor.memberships) {
        memberships.push(this.fb.group({
          Membership: new FormControl(mb.Membership)
        }));
      }

      const registrations = this.form.controls.registrations as FormArray;
      for (const rg of doctor.registrations) {
        registrations.push(this.fb.group({
          registrations: new FormControl(rg.registrations),
          year: new FormControl(rg.year),
        }));
      }

      if (doctor.aboutMe !== 'undefined' && doctor.aboutMe) {
        this.form.patchValue({
          aboutMe: doctor.aboutMe
        });
      }
      this.form.patchValue({
        username: doctor.name + ' ' + doctor.lastName,
        email: doctor.email,
        firstName: doctor.name,
        lastName: doctor.lastName,
        phone: doctor.phone,
        gender: doctor.gender,
        birthday: doctor.birthday,
        address1: doctor.address1,
        address2: doctor.address2,
        city: doctor.city,
        state: doctor.state,
        country: doctor.country,
        zip: doctor.zip,
        price: doctor.price
      });
    });
  }

  private setCurrentLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
      });
    }
  }

  //////////// angular chips /////////////

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  /////////// angular chips/////////////

  addRegistrations(): void {
    const award = this.form.controls.registrations as FormArray;
    award.push(this.fb.group({
      registrations: new FormControl(null, { validators: [Validators.required] }),
      year: new FormControl(null, { validators: [Validators.required] }),
      to: new FormControl(null, { validators: [Validators.required] })
    }));
  }
  deleteRegistrations(index): void{
    const reg = this.form.controls.registrations as FormArray;
    reg.removeAt(index);
  }

  addMembership(): void {
    const award = this.form.controls.memberships as FormArray;
    award.push(this.fb.group({
      Membership: new FormControl(null, { validators: [Validators.required] })
    }));
  }
  deleteMembership(index): void{
    const award = this.form.controls.memberships as FormArray;
    award.removeAt(index);
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

  addExperience(): void {
    const ex = this.form.controls.experience as FormArray;
    ex.push(this.fb.group({
      hospital_Name: new FormControl(null, { validators: [Validators.required] }),
      from: new FormControl(null, { validators: [Validators.required] }),
      to: new FormControl(null, { validators: [Validators.required] }),
      designation: new FormControl(null, { validators: [Validators.required] })
    }));
  }
  deleteExperience(index): void{
    const experience = this.form.controls.experience as FormArray;
    experience.removeAt(index);
  }

  addEducation(): void {
    const education = this.form.controls.education as FormArray;
    education.push(this.fb.group({
      Degree: new FormControl(null, { validators: [Validators.required] }),
      College: new FormControl(null, { validators: [Validators.required] }),
      Year_of_Completion: new FormControl(null, { validators: [Validators.required] })
    }));
  }
  deleteEducation(index): void{
    const education = this.form.controls.education as FormArray;
    education.removeAt(index);
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

  get registrations(): any { // a getter!
    return (this.form.get('registrations') as FormArray).controls;
  }
  get education(): any { // a getter!
    return (this.form.get('education') as FormArray).controls;
  }
  get memberships(): any { // a getter!
    return (this.form.get('memberships') as FormArray).controls;
  }
  get awards(): any { // a getter!
    return (this.form.get('awards') as FormArray).controls;
  }
  get experience(): any { // a getter!
    return (this.form.get('experience') as FormArray).controls;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.doctorService.modify(this.form.value.firstName, this.form.value.lastName,
      this.form.value.phone, this.form.value.gender, this.form.value.birthday,
      this.form.value.address1, this.form.value.address2, this.form.value.city,
      this.form.value.state, this.form.value.country, this.form.value.zip, this.form.value.price,
      this.form.value.aboutMe, this.latitude, this.longitude,
      this.form.value.education, this.form.value.experience, this.form.value.awards,
      this.form.value.memberships, this.form.value.registrations, this.form.value.image).subscribe(result => {

          this.authService.userimageListener.next(result.result.imagePath);
          localStorage.setItem('userimage', result.result.imagePath);
          this.toastr.success(result.message, '', {
            positionClass: 'toast-bottom-right'
          });

    }, error => {
        this.toastr.error(error.name, '', {
        positionClass: 'toast-bottom-right'
      });
    });
  }

  markerDragEnd($event: any): void {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }

  onVerifyPassword(): void {
    this.doctorService.verifypassword(this.passwordForm.value.password).subscribe(result => {
      if (result.message === 'password correct') {
        this.doctorService.deleteDoctorByKey().subscribe(resulte => {
          this.authService.logout();
          this.toastr.warning('compte supprimé', '', {
            positionClass: 'toast-bottom-right'
          });
        });
      }
    }, error => {
      console.log(error.error.message);
    });
  }
}
