import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-doc-profil-setting',
  templateUrl: './doc-profil-setting.component.html',
  styleUrls: ['./doc-profil-setting.component.css']
})
export class DocProfilSettingComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      education: this.fb.array([
        new FormGroup({
          Degree: new FormControl(null, { validators: [Validators.required] }),
          College: new FormControl(null, { validators: [Validators.required] }),
          Year_of_Completion: new FormControl(null, { validators: [Validators.required] })
        })
      ]),
      experience: this.fb.array([
        new FormGroup({
          hospital_Name: new FormControl(null),
          from: new FormControl(null),
          to: new FormControl(null),
          designation: new FormControl(null)
        })
      ]),
      awards: this.fb.array([
        new FormGroup({
          awards: new FormControl(null),
          year: new FormControl(null)
        })
      ]),
      memberships: this.fb.array([
        new FormGroup({
          Membership: new FormControl(null)
        })
      ]),
      registrations: this.fb.array([
        new FormGroup({
          registrations: new FormControl(null),
          year: new FormControl(null),
        })
      ]),
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

  onSubmit(): void {
    console.log(this.form.value);
  }
}
