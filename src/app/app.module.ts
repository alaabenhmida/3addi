import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { SignupComponent } from './components/Patient/signup/signup.component';
import { LoginComponent } from './components/Patient/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IndexComponent } from './shared/index/index.component';
import {PatientRoutingModule} from './routers/patient-routing/patient-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { SignupDrComponent } from './components/Doctor/signup-dr/signup-dr.component';
import { LogindrComponent } from './components/Doctor/logindr/logindr.component';
import {AuthInterceptor} from './auth/auth-interceptor';
import {DlDateTimeDateModule, DlDateTimePickerModule} from 'angular-bootstrap-datetimepicker';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import { MessagesComponent } from './shared/messages/messages.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {ToastrModule} from 'ngx-toastr';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {AgmCoreModule} from '@agm/core';
import { InvoiceDetailComponent } from './components/Patient/invoice-detail/invoice-detail.component';
import {RouterModule} from '@angular/router';
import { InvoicesComponent } from './components/Doctor/invoices/invoices.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {ErrorInterceptor} from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import {PharmacieRoutingModule} from './routers/pharmacie-routing/pharmacie-routing.module';
import {AgmDirectionModule} from 'agm-direction';
import { LoginDialogComponent } from './shared/login-dialog/login-dialog.component';
import { AdminDashboardComponent } from './components/Admin/admin-dashboard/admin-dashboard.component';
import {AdminRoutingModule} from './routers/admin-routing/admin-routing.module';
import {NgxChartsModule, PieChartModule} from '@swimlane/ngx-charts';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {AngularMaterialModule} from './angular-material.module';
import {DoctorModule} from './components/Doctor/doctor.module';
import {AgmSnazzyInfoWindowModule} from '@agm/snazzy-info-window';
import {PatientModule} from './components/Patient/patient.module';
import {AppRoutingModule} from './app-routing.module';
import {PharmacieModule} from './components/Pharmacie/pharmacie.module';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    IndexComponent,
    SignupDrComponent,
    LogindrComponent,
    MessagesComponent,
    InvoiceDetailComponent,
    InvoicesComponent,
    ErrorComponent,
    LoginDialogComponent,
    AdminDashboardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    PatientRoutingModule,
    PharmacieRoutingModule,
    AdminRoutingModule,
    FormsModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
    NgxSkeletonLoaderModule,
    CarouselModule.forRoot(),
    SocketIoModule.forRoot(config),
    TooltipModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAOhHjYUOLvSh3GG_H69tQTpYvQlJmT-Rc'
    }),
    AgmDirectionModule,
    AgmSnazzyInfoWindowModule,
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    PieChartModule,
    NgxChartsModule,
    AngularMaterialModule,
    DoctorModule,
    PatientModule,
    PharmacieModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    FormsModule,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, LoginDialogComponent]
})
export class AppModule { }
