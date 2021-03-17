import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-presc',
  templateUrl: './add-presc.component.html',
  styleUrls: ['./add-presc.component.css']
})
export class AddPrescComponent implements OnInit {
  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      quantite: new FormControl(null, { validators: [Validators.required] }),
      days: new FormControl(null, { validators: [Validators.required] }),
      mor: new FormControl(null, { validators: [Validators.required] }),
      af: new FormControl(null, { validators: [Validators.required] }),
      ev: new FormControl(null, { validators: [Validators.required] }),
      nght: new FormControl(null, { validators: [Validators.required] }),
    });
  }
  onSubmit(): void {
    console.log(this.form.value);
  }

}
