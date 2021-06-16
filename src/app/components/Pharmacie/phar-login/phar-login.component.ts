import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PatientAuthService} from '../../../auth/Patient/patient-auth.service';

@Component({
  selector: 'app-phar-login',
  templateUrl: './phar-login.component.html',
  styleUrls: ['./phar-login.component.css']
})
export class PharLoginComponent implements OnInit {
  form: FormGroup;

  constructor(private authService: PatientAuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, { validators: [Validators.required] })
    });
  }

  onSubmit(): void {
    this.authService.login(this.form.value.email, this.form.value.password);
  }
}
