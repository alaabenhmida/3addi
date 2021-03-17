import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PatientAuthService} from '../../auth/Patient/patient-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private useridSub: Subscription;
  private usernameSubs: Subscription;
  private userimageSubs: Subscription;
  private roleSubs: Subscription;
  private user: any;
  private userid: string;
  private username: string;
  private userimage: string;
  private role: string;

  constructor(private authService: PatientAuthService) { }

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.roleSubs = this.authService.getRoleListener().subscribe(role => {
      this.role = role;
    });
    this.userid = this.authService.getUserid();
    this.username = this.authService.getUsername();
    this.userimage = this.authService.getUserimage();
    console.log(this.userimage);
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.useridSub = this.authService.getuseridListener().subscribe(
      isAuthenticated => {
        this.userid = isAuthenticated;
      }
    );

    this.usernameSubs = this.authService.getusernameListener().subscribe(
      isAuthenticated => {
        this.username = isAuthenticated;
      }
    );

    this.userimageSubs = this.authService.getuserimageListener().subscribe(
      isAuthenticated => {
        this.userimage = isAuthenticated;
      }
    );
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
    this.useridSub.unsubscribe();
    this.userimageSubs.unsubscribe();
    this.usernameSubs.unsubscribe();
    this.roleSubs.unsubscribe();
  }

}
