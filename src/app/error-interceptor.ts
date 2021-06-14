import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ErrorComponent} from './error/error.component';
import {ToastrService} from 'ngx-toastr';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog, private toaster: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error.message) {
          this.toaster.error(error.error.message, '', {
            positionClass: 'toast-bottom-right'
          });
          // this.dialog.open(ErrorComponent, {data: {message: error.error.message}, minWidth: 300});
        } else {
          this.toaster.error(error.statusText, '', {
            positionClass: 'toast-bottom-right'
          });
          // this.dialog.open(ErrorComponent, {data: {message: error.statusText, minWidth: 300}});
        }
        return throwError(error);
      })
    );
  }
}
