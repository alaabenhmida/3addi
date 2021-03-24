import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PatientAuthService} from '../../../auth/Patient/patient-auth.service';
import {DoctorAuthService} from '../../../auth/Doctor/doctor-auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-logindr',
  templateUrl: './logindr.component.html',
  styleUrls: ['./logindr.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class LogindrComponent implements OnInit {

  constructor(public authService: PatientAuthService) { }

  ngOnInit(): void {
  }
  onLogin(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password, 'doctor');
  }

}
