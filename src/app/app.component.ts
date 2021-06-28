import {Component, OnInit} from '@angular/core';
import {PatientAuthService} from './auth/Patient/patient-auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  role: string;
  private roleSubs: Subscription;
  constructor(private authService: PatientAuthService) {
  }

  title = 'PFEt2';

  ngOnInit(): void {
    this.authService.autoAuthUser();
    this.role = this.authService.getRole();
    this.roleSubs = this.authService.getRoleListener().subscribe(role => {
      this.role = role;
    });
  }
}
