import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from '../../shared/index/index.component';
import {LoginComponent} from '../../components/Patient/login/login.component';
import {SignupComponent} from '../../components/Patient/signup/signup.component';
import {ProfileComponent} from '../../components/Patient/profile/profile.component';
import {MedRecordComponent} from '../../components/Patient/med-record/med-record.component';
import {AddPrescComponent} from '../../components/Patient/add-presc/add-presc.component';
import {MessagesComponent} from '../../shared/messages/messages.component';
import {ProfileSettComponent} from '../../components/Patient/profile-sett/profile-sett.component';
import {FavDocsComponent} from '../../components/Patient/fav-docs/fav-docs.component';
import {BookingSuccessComponent} from '../../components/Patient/booking-success/booking-success.component';
import {InvoiceDetailComponent} from '../../components/Patient/invoice-detail/invoice-detail.component';
import {PatientDhashboardComponent} from '../../components/Patient/patient-dhashboard/patient-dhashboard.component';
import {AuthGuard} from '../../auth/doctor-auth.gards';
import {PatientAuthGuard} from '../../auth/patient-auth.gards';
import {CheckoutComponent} from '../../components/Patient/checkout/checkout.component';
import {AppointementsComponent} from '../../components/Doctor/appointements/appointements.component';
import {LoginAuthGuard} from '../../auth/login-auth.gards';


const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'profile/setting', component: ProfileSettComponent, canActivate: [PatientAuthGuard] },
  { path: 'profile/dashboard', component: PatientDhashboardComponent, canActivate: [PatientAuthGuard] },
  { path: 'profile/favdocs', component: FavDocsComponent, canActivate: [PatientAuthGuard] },
  { path: 'facture/:rdvid', component: InvoiceDetailComponent },
  { path: 'ordre/:rdvid', component: BookingSuccessComponent, canActivate: [PatientAuthGuard] },
  { path: 'patient/:id', component: ProfileComponent },
  { path: 'patient/:id/ajoutDossier', component: MedRecordComponent, canActivate: [AuthGuard] },
  { path: 'patient/:id/ajoutOrd', component: AddPrescComponent, canActivate: [AuthGuard] },
  { path: 'patient/:id/presc/:prescID', component: AddPrescComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard, PatientAuthGuard, LoginAuthGuard]
})
export class PatientRoutingModule { }
