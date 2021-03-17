import { Component, OnInit } from '@angular/core';
import {PatientAuthService} from '../../../auth/Patient/patient-auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: PatientAuthService) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password, 'patient');
  }

}
