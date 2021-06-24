import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PatientAuthService} from './Patient/patient-auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: PatientAuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(authRequest);
  }
}
