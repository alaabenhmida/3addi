import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {PatientAuthService} from './Patient/patient-auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class AdminAuthGard implements CanActivate {
  constructor(private authService: PatientAuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getIsAuth();
    const role = this.authService.getRole();
    if (role !== 'admin') {
      this.router.navigate(['/not-found']);
    }
    return isAuth;
  }
}
