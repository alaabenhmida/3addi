import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupDrComponent} from '../../components/Doctor/signup-dr/signup-dr.component';
import {LogindrComponent} from '../../components/Doctor/logindr/logindr.component';
import {ProfileDocComponent} from '../../components/Doctor/profile-doc/profile-doc.component';
import {AppointmentComponent} from '../../components/Doctor/appointment/appointment.component';
import {DocDashboardComponent} from '../../components/Doctor/doc-dashboard/doc-dashboard.component';
import {MyPatientsComponent} from '../../components/Doctor/my-patients/my-patients.component';
import {DocProfilSettingComponent} from '../../components/Doctor/doc-profil-setting/doc-profil-setting.component';

const appRoutes: Routes = [
  { path: 'doctor/signup', component: SignupDrComponent },
  { path: 'doctor/login', component: LogindrComponent },
  { path: 'doctor/:id', component: ProfileDocComponent },
  { path: 'doctor/:id/app', component: AppointmentComponent },
  { path: 'doctor/profile/dashboard', component: DocDashboardComponent },
  { path: 'doctor/profile/myPatients', component: MyPatientsComponent },
  { path: 'doctor/profile/setting', component: DocProfilSettingComponent }
  ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
