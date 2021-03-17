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
    MedRecordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    PatientRoutingModule,
    DoctorRoutingModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
