import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DoctorServiceService} from '../../../services/doctor/doctor-service.service';
import {Doctor} from '../../../models/Doctor/doctor.model';
import {mimeType} from '../../../shared/mime-type.validator';
import {PatientAuthService} from '../../../auth/Patient/patient-auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-doc-profil-setting',
  templateUrl: './doc-profil-setting.component.html',
  styleUrls: ['./doc-profil-setting.component.css']
})
export class DocProfilSettingComponent implements OnInit {
  form: FormGroup;
  doctorData: Doctor;
  imagePreview: string;

  constructor(private fb: FormBuilder, private doctorService: DoctorServiceService, private authService: PatientAuthService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
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
        price: doctor.price,
        aboutMe: doctor.aboutMe
      });
    });
  }

  addRegistrations(): void {
    const award = this.form.controls.registrations as FormArray;
    award.push(this.fb.group({
      registrations: new FormControl(null),
      year: new FormControl(null),
      to: new FormControl(null)
    }));
  }
  deleteRegistrations(index): void{
    const reg = this.form.controls.registrations as FormArray;
    reg.removeAt(index);
  }

  addMembership(): void {
    const award = this.form.controls.memberships as FormArray;
    award.push(this.fb.group({
      Membership: new FormControl(null)
    }));
  }
  deleteMembership(index): void{
    const award = this.form.controls.memberships as FormArray;
    award.removeAt(index);
  }

  addAward(): void {
    const award = this.form.controls.awards as FormArray;
    award.push(this.fb.group({
      awards: new FormControl(null),
      year: new FormControl(null)
    }));
  }
  deleteAward(index): void{
    const award = this.form.controls.awards as FormArray;
    award.removeAt(index);
  }

  addExperience(): void {
    const ex = this.form.controls.experience as FormArray;
    ex.push(this.fb.group({
      hospital_Name: new FormControl(null),
      from: new FormControl(null),
      to: new FormControl(null),
      designation: new FormControl(null)
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

  onSubmit(): void {
    this.doctorService.modify(this.form.value.firstName, this.form.value.lastName,
      this.form.value.phone, this.form.value.gender, this.form.value.birthday,
      this.form.value.address1, this.form.value.address2, this.form.value.city,
      this.form.value.state, this.form.value.country, this.form.value.zip, this.form.value.price,
      this.form.value.aboutMe,
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
}
