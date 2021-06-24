import {Component, OnInit} from '@angular/core';
import {PatientAuthService} from './auth/Patient/patient-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: PatientAuthService) {
  }

  title = 'PFEt2';

  ngOnInit(): void {
    this.authService.autoAuthUser();
  }
}
