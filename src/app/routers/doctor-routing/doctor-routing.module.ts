import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupDrComponent} from '../../components/Doctor/signup-dr/signup-dr.component';
import {LogindrComponent} from '../../components/Doctor/logindr/logindr.component';
import {ProfileDocComponent} from '../../components/Doctor/profile-doc/profile-doc.component';

const appRoutes: Routes = [
  { path: 'doctor/signup', component: SignupDrComponent },
  { path: 'doctor/login', component: LogindrComponent },
  { path: 'doctor/:id', component: ProfileDocComponent }
  ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
