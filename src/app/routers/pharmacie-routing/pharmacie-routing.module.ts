import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../auth/doctor-auth.gards';
import {PatientAuthGuard} from '../../auth/patient-auth.gards';
import {ProductPageGridComponent} from '../../components/Pharmacie/product-page-grid/product-page-grid.component';
import {ProductDetailsComponent} from '../../components/Pharmacie/product-details/product-details.component';
import {CartComponent} from '../../components/Pharmacie/cart/cart.component';
import {PharmacieProfileComponent} from '../../components/Pharmacie/pharmacie-profile/pharmacie-profile.component';
import {PharmacieSearchComponent} from '../../components/Pharmacie/pharmacie-search/pharmacie-search.component';
import {PharLoginComponent} from '../../components/Pharmacie/phar-login/phar-login.component';
import {PharDashboardComponent} from '../../components/Pharmacie/phar-dashboard/phar-dashboard.component';
import {ProduitsComponent} from '../../components/Pharmacie/produits/produits.component';
import {AddProductComponent} from '../../components/Pharmacie/add-product/add-product.component';

const appRoutes: Routes = [
  { path: 'pharmacie/login', component: PharLoginComponent},
  { path: 'pharmacie/dashboard', component: PharDashboardComponent},
  { path: 'pharmacie/dashboard/produits', component: ProduitsComponent},
  { path: 'pharmacie/dashboard/addproduits', component: AddProductComponent},
  { path: 'pharmacie/search', component: PharmacieSearchComponent},
  { path: 'pharmacie/:id/about', component: PharmacieProfileComponent},
  { path: 'pharmacie/:id', component: ProductPageGridComponent, canActivate: [PatientAuthGuard] },
  { path: 'pharmacie/:id/product/:prodId', component: ProductDetailsComponent, canActivate: [PatientAuthGuard] },
  { path: 'pharmacie/:id/cart', component: CartComponent, canActivate: [PatientAuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard, PatientAuthGuard]
})
export class PharmacieRoutingModule { }
