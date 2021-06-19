import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PatientAuthService} from '../../auth/Patient/patient-auth.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';
import {HeaderService} from '../../services/header/header.service';
import {CartItem} from '../../models/Pharmacie/cartItem.model';
import {CartService} from '../../services/pharmacie/cart.service';

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
  private isInPharmacie: Subscription;
  inPharmacie: boolean;
  private pharmacieIdSub: Subscription;
  private pharmacieId: string;
  productNumberSub: Subscription;
  productNumber = 0;

  constructor(private authService: PatientAuthService,
              public router: Router,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private headerService: HeaderService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.pharmacieIdSub = this.headerService.getProductNumber().subscribe(data => {
      this.productNumber = data;
    });
    this.pharmacieIdSub = this.headerService.getpharmacieId().subscribe(data => {
      this.pharmacieId = data;
    });
    this.isInPharmacie = this.headerService.getIsInPharmacie().subscribe(data => {
      this.inPharmacie = data;
    });
    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   console.log(paramMap);
    // });

    // if (this.router.url.indexOf('pharmacie') > -1) {
    //   console.log(this.route.snapshot.pathFromRoot);
    // }
   // console.log( this.route.snapshot.firstChild.url[0].path);

    this.role = this.authService.getRole();
    this.roleSubs = this.authService.getRoleListener().subscribe(role => {
      this.role = role;
    });
    this.userid = this.authService.getUserid();
    this.username = this.authService.getUsername();
    this.userimage = this.authService.getUserimage();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        // this.userid = this.authService.getUserid();
        // this.role = this.authService.getRole();
        // this.username = this.authService.getUsername();
        // this.userimage = this.authService.getUserimage();
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
    this.isInPharmacie.unsubscribe();
    this.pharmacieIdSub.unsubscribe();
    this.pharmacieIdSub.unsubscribe();
  }

  onclick(): void {
    this.dialog.open(LoginDialogComponent, {minWidth: 300});
  }
}
