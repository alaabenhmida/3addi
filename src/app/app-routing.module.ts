import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/doctor-auth.gards';
import {PatientAuthGuard} from './auth/patient-auth.gards';
import {LoginAuthGuard} from './auth/login-auth.gards';
import {IndexComponent} from './shared/index/index.component';
import {MapGridComponent} from './components/Doctor/map-grid/map-grid.component';
import {MapListComponent} from './components/Pharmacie/map-list/map-list.component';
import {Error404Component} from './shared/error404/error404.component';

const appRoutes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'doctors', component: MapGridComponent},
  {path: 'pharmacies', component: MapListComponent},
  {path: 'doctor', loadChildren: () => import('./components/Doctor/doctor.module').then(m => m.DoctorModule)},
  {path: 'pharmacie', loadChildren: () => import('./components/Pharmacie/pharmacie.module').then(p => p.PharmacieModule)},
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  providers: [AuthGuard, PatientAuthGuard, LoginAuthGuard]
})
export class AppRoutingModule {
}
