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
import {PharmacieSettingComponent} from '../../components/Pharmacie/pharmacie-setting/pharmacie-setting.component';
import {PharmacieCheckoutComponent} from '../../components/Pharmacie/pharmacie-checkout/pharmacie-checkout.component';
import {OrdersComponent} from '../../components/Pharmacie/orders/orders.component';
import {OrderDetailComponent} from '../../components/Pharmacie/order-detail/order-detail.component';

const appRoutes: Routes = [
  { path: 'login', component: PharLoginComponent},
  { path: 'dashboard', component: PharDashboardComponent},
  { path: 'parametre', component: PharmacieSettingComponent},
  { path: 'dashboard/produits', component: ProduitsComponent},
  { path: 'dashboard/addproduits', component: AddProductComponent},
  { path: 'dashboard/orders', component: OrdersComponent},
  { path: 'dashboard/orders/:id', component: OrderDetailComponent},
  { path: 'dashboard/produits/:id/editer', component: AddProductComponent},
  { path: 'search', component: PharmacieSearchComponent},
  { path: ':id/about', component: PharmacieProfileComponent},
  { path: ':id', component: ProductPageGridComponent, canActivate: [PatientAuthGuard] },
  { path: ':id/product/:prodId', component: ProductDetailsComponent, canActivate: [PatientAuthGuard] },
  { path: ':id/cart', component: CartComponent, canActivate: [PatientAuthGuard] },
  { path: ':id/payer', component: PharmacieCheckoutComponent, canActivate: [PatientAuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard, PatientAuthGuard]
})
export class PharmacieRoutingModule { }
