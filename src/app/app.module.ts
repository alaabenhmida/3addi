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
import { ProfileComponent } from './components/Patient/profile/profile.component';
import { SignupDrComponent } from './components/Doctor/signup-dr/signup-dr.component';
import {DoctorRoutingModule} from './routers/doctor-routing/doctor-routing.module';
import { LogindrComponent } from './components/Doctor/logindr/logindr.component';
import {AuthInterceptor} from './auth/auth-interceptor';
import { MedRecordComponent } from './components/Patient/med-record/med-record.component';
import { AddPrescComponent } from './components/Patient/add-presc/add-presc.component';
import { ProfileDocComponent } from './components/Doctor/profile-doc/profile-doc.component';
import {DlDateTimeDateModule, DlDateTimePickerModule} from 'angular-bootstrap-datetimepicker';
import { AppointmentComponent } from './components/Doctor/appointment/appointment.component';
import { DocDashboardComponent } from './components/Doctor/doc-dashboard/doc-dashboard.component';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import { MyPatientsComponent } from './components/Doctor/my-patients/my-patients.component';
import {DocProfilSettingComponent} from './components/Doctor/doc-profil-setting/doc-profil-setting.component';
import { MessagesComponent } from './shared/messages/messages.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {ToastrModule} from 'ngx-toastr';
import { ProfileSettComponent } from './components/Patient/profile-sett/profile-sett.component';
import { FavDocsComponent } from './components/Patient/fav-docs/fav-docs.component';
import { MapGridComponent } from './components/Doctor/map-grid/map-grid.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AppointementsComponent } from './components/Doctor/appointements/appointements.component';
import { BookingSuccessComponent } from './components/Patient/booking-success/booking-success.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {AgmCoreModule} from '@agm/core';
import {RatingModule} from 'ngx-bootstrap/rating';
import { InvoiceDetailComponent } from './components/Patient/invoice-detail/invoice-detail.component';
import { CheckoutComponent } from './components/Patient/checkout/checkout.component';
import { PatientDhashboardComponent } from './components/Patient/patient-dhashboard/patient-dhashboard.component';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    IndexComponent,
    ProfileComponent,
    SignupDrComponent,
    LogindrComponent,
    MedRecordComponent,
    AddPrescComponent,
    ProfileDocComponent,
    AppointmentComponent,
    DocDashboardComponent,
    MyPatientsComponent,
    DocProfilSettingComponent,
    MessagesComponent,
    ProfileSettComponent,
    FavDocsComponent,
    MapGridComponent,
    AppointementsComponent,
    BookingSuccessComponent,
    InvoiceDetailComponent,
    CheckoutComponent,
    PatientDhashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    PatientRoutingModule,
    DoctorRoutingModule,
    BrowserModule,
    FormsModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
    NgxSkeletonLoaderModule,
    MatPaginatorModule,
    SocketIoModule.forRoot(config),
    TooltipModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAOhHjYUOLvSh3GG_H69tQTpYvQlJmT-Rc'
    }),
    RatingModule,
    // BarRatingModule,
    // // BarRatingModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
