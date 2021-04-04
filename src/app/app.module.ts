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
import {BarRatingModule} from 'ngx-bar-rating';
import {DlDateTimeDateModule, DlDateTimePickerModule} from 'angular-bootstrap-datetimepicker';
import { AppointmentComponent } from './components/Doctor/appointment/appointment.component';
import { DocDashboardComponent } from './components/Doctor/doc-dashboard/doc-dashboard.component';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import { MyPatientsComponent } from './components/Doctor/my-patients/my-patients.component';
import {DocProfilSettingComponent} from './components/Doctor/doc-profil-setting/doc-profil-setting.component';

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
    DocProfilSettingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    PatientRoutingModule,
    DoctorRoutingModule,
    BrowserModule,
    FormsModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
    NgxSkeletonLoaderModule,
    // BarRatingModule,
    // // BarRatingModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
