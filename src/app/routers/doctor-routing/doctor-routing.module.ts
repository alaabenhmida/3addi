import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupDrComponent} from '../../components/Doctor/signup-dr/signup-dr.component';
import {LogindrComponent} from '../../components/Doctor/logindr/logindr.component';
import {ProfileDocComponent} from '../../components/Doctor/profile-doc/profile-doc.component';
import {AppointmentComponent} from '../../components/Doctor/appointment/appointment.component';
import {DocDashboardComponent} from '../../components/Doctor/doc-dashboard/doc-dashboard.component';
import {MyPatientsComponent} from '../../components/Doctor/my-patients/my-patients.component';
import {DocProfilSettingComponent} from '../../components/Doctor/doc-profil-setting/doc-profil-setting.component';
import {AppointementsComponent} from '../../components/Doctor/appointements/appointements.component';
import {CheckoutComponent} from '../../components/Patient/checkout/checkout.component';
import {InvoicesComponent} from '../../components/Doctor/invoices/invoices.component';
import {ReviewsComponent} from '../../components/Doctor/reviews/reviews.component';
import {SearchComponent} from '../../components/Doctor/search/search.component';
import {AuthGuard} from '../../auth/doctor-auth.gards';
import {PatientAuthGuard} from '../../auth/patient-auth.gards';
import {ManageTimeComponent} from '../../components/Doctor/manage-time/manage-time.component';

const appRoutes: Routes = [
      { path: 'doctor/signup', component: SignupDrComponent },
      { path: 'doctor/login', component: LogindrComponent },
      { path: 'doctor/factures', component: InvoicesComponent, canActivate: [AuthGuard] },
      { path: 'doctor/reviews', component: ReviewsComponent, canActivate: [AuthGuard] },
      { path: 'doctor/search', component: SearchComponent },
      { path: 'doctor/gererTemps', component: ManageTimeComponent, canActivate: [AuthGuard] },
      { path: 'doctor/:id', component: ProfileDocComponent },
      { path: 'doctor/:id/check/:rdvID', component: CheckoutComponent, canActivate: [PatientAuthGuard] },
      { path: 'doctor/:id/app', component: AppointmentComponent, canActivate: [PatientAuthGuard] },
      { path: 'doctor/profile/dashboard', component: DocDashboardComponent, canActivate: [AuthGuard] },
      { path: 'doctor/profile/myRDV', component: AppointementsComponent, canActivate: [AuthGuard] },
      { path: 'doctor/profile/myPatients', component: MyPatientsComponent, canActivate: [AuthGuard] },
      { path: 'doctor/profile/setting', component: DocProfilSettingComponent, canActivate: [AuthGuard] }
  ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard, PatientAuthGuard]
})
export class DoctorRoutingModule { }
