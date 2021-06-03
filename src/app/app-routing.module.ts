import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/doctor-auth.gards';
import {PatientAuthGuard} from './auth/patient-auth.gards';
import {LoginAuthGuard} from './auth/login-auth.gards';
import {IndexComponent} from './shared/index/index.component';
import {MapGridComponent} from './components/Doctor/map-grid/map-grid.component';

const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'doctors', component: MapGridComponent },
  { path: 'doctor', loadChildren: () => import('./components/Doctor/doctor.module').then(m => m.DoctorModule) }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard, PatientAuthGuard, LoginAuthGuard]
})
export class AppRoutingModule { }
