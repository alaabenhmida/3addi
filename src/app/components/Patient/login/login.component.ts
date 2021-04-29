import { Component, OnInit } from '@angular/core';
import {PatientAuthService} from '../../../auth/Patient/patient-auth.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: PatientAuthService, public router: Router) { }

  ngOnInit(): void {
    if (this.authService.getIsAuth()) {
      this.router.navigate(['/']);
    }
  }

  onLogin(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password, 'patient');
  }

}
