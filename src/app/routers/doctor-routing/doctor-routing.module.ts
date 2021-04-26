import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupDrComponent} from '../../components/Doctor/signup-dr/signup-dr.component';
import {LogindrComponent} from '../../components/Doctor/logindr/logindr.component';
import {ProfileDocComponent} from '../../components/Doctor/profile-doc/profile-doc.component';
import {AppointmentComponent} from '../../components/Doctor/appointment/appointment.component';
import {DocDashboardComponent} from '../../components/Doctor/doc-dashboard/doc-dashboard.component';
import {MyPatientsComponent} from '../../components/Doctor/my-patients/my-patients.component';
import {DocProfilSettingComponent} from '../../components/Doctor/doc-profil-setting/doc-profil-setting.component';
import {MapGridComponent} from '../../components/Doctor/map-grid/map-grid.component';
import {AppointementsComponent} from '../../components/Doctor/appointements/appointements.component';
import {AuthGuard} from '../../auth/auth.gards';
import {CheckoutComponent} from '../../components/Patient/checkout/checkout.component';
import {InvoicesComponent} from '../../components/Doctor/invoices/invoices.component';
import {ReviewsComponent} from '../../components/Doctor/reviews/reviews.component';

const appRoutes: Routes = [
  { path: 'doctors', component: MapGridComponent },
  { path: 'doctor/signup', component: SignupDrComponent },
  { path: 'doctor/login', component: LogindrComponent },
  { path: 'doctor/factures', component: InvoicesComponent },
  { path: 'doctor/reviews', component: ReviewsComponent },
  { path: 'doctor/:id', component: ProfileDocComponent },
  { path: 'doctor/:id/check/:rdvID', component: CheckoutComponent },
  { path: 'doctor/:id/app', component: AppointmentComponent },
  { path: 'doctor/profile/dashboard', component: DocDashboardComponent },
  { path: 'doctor/profile/myRDV', component: AppointementsComponent },
  { path: 'doctor/profile/myPatients', component: MyPatientsComponent },
  { path: 'doctor/profile/setting', component: DocProfilSettingComponent }
  ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class DoctorRoutingModule { }
