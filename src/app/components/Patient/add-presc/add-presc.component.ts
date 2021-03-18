import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-presc',
  templateUrl: './add-presc.component.html',
  styleUrls: ['./add-presc.component.css']
})
export class AddPrescComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      Prescription: this.fb.array([
        new FormGroup({
          name: new FormControl(null, { validators: [Validators.required] }),
          quantite: new FormControl(null, { validators: [Validators.required] }),
          days: new FormControl(null, { validators: [Validators.required] }),
          mor: new FormControl(null, { validators: [Validators.required] }),
          af: new FormControl(null, { validators: [Validators.required] }),
          ev: new FormControl(null, { validators: [Validators.required] }),
          nght: new FormControl(null, { validators: [Validators.required] }),
        })
      ])
    });
  }

  ngOnInit(): void {
  }
  addCreds(): void {
    const creds = this.form.controls.Prescription as FormArray;
    creds.push(this.fb.group({
      name: new FormControl(null, { validators: [Validators.required] }),
      quantite: new FormControl(null, { validators: [Validators.required] }),
      days: new FormControl(null, { validators: [Validators.required] }),
      mor: new FormControl(null, { validators: [Validators.required] }),
      af: new FormControl(null, { validators: [Validators.required] }),
      ev: new FormControl(null, { validators: [Validators.required] }),
      nght: new FormControl(null, { validators: [Validators.required] })
    }));
  }

  deleteCreds(index): void{
    const creds = this.form.controls.Prescription as FormArray;
    creds.removeAt(index);
  }
  onSubmit(): void{
    console.log(this.form.value.Prescription);
  }

}
