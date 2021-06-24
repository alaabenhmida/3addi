import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PatientAuthService} from '../../../auth/Patient/patient-auth.service';
import {DoctorAuthService} from '../../../auth/Doctor/doctor-auth.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logindr',
  templateUrl: './logindr.component.html',
  styleUrls: ['./logindr.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class LogindrComponent implements OnInit {

  constructor(public authService: PatientAuthService, public router: Router) {
  }

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

}
