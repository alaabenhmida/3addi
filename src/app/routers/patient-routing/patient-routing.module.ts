import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
import {LoginAuthGuard} from '../../auth/login-auth.gards';
import {PrescriptionDetailsComponent} from '../../components/Patient/prescription-details/prescription-details.component';
import {AddCertificatComponent} from '../../components/Patient/add-certificat/add-certificat.component';
import {CertificatDetailsComponent} from '../../components/Patient/certificat-details/certificat-details.component';
import {InvoicePharDetailComponent} from '../../components/Patient/invoice-phar-detail/invoice-phar-detail.component';
import {ChangePasswordComponent} from '../../components/Patient/change-password/change-password.component';
import {Error404Component} from '../../shared/error404/error404.component';


const appRoutes: Routes = [
  { path: 'messages', component: MessagesComponent },
  { path: 'profile/ordonnace/:id', component: PrescriptionDetailsComponent, canActivate: [PatientAuthGuard] },
  { path: 'certificat/:id', component: CertificatDetailsComponent, canActivate: [PatientAuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'profile/setting', component: ProfileSettComponent, canActivate: [PatientAuthGuard] },
  { path: 'profile/dashboard', component: PatientDhashboardComponent, canActivate: [PatientAuthGuard] },
  { path: 'profile/favdocs', component: FavDocsComponent, canActivate: [PatientAuthGuard] },
  { path: 'profile/change-password', component: ChangePasswordComponent, canActivate: [PatientAuthGuard] },
  { path: 'facture/:rdvid', component: InvoiceDetailComponent },
  { path: 'ordre/:id', component: InvoicePharDetailComponent },
  { path: 'ordre/:rdvid', component: BookingSuccessComponent, canActivate: [PatientAuthGuard] },
  { path: 'patient/:id', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'patient/:id/ajoutDossier', component: MedRecordComponent, canActivate: [AuthGuard] },
  { path: 'patient/:id/ajoutOrd', component: AddPrescComponent, canActivate: [AuthGuard] },
  { path: 'patient/:id/ajoucertificat', component: AddCertificatComponent, canActivate: [AuthGuard] },
  { path: 'patient/:id/presc/:prescID', component: AddPrescComponent },
  { path: 'not-found', component: Error404Component },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard, PatientAuthGuard, LoginAuthGuard]
})
export class PatientRoutingModule { }
