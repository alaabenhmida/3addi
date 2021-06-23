import { Component, OnInit } from '@angular/core';
import {PatientAuthService} from '../../../auth/Patient/patient-auth.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginDialogComponent} from '../../../shared/login-dialog/login-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: PatientAuthService, public router: Router,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.authService.getIsAuth()) {
      this.router.navigate(['/']);
    }
  }

  onLogin(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
  }
  onclick(): void {
    this.dialog.open(LoginDialogComponent, {minWidth: 300});
  }
}
