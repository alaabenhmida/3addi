import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PharmacieProfileComponent} from './pharmacie-profile/pharmacie-profile.component';
import {PharmacieSearchComponent} from './pharmacie-search/pharmacie-search.component';
import {PharLoginComponent} from './phar-login/phar-login.component';
import {PharDashboardComponent} from './phar-dashboard/phar-dashboard.component';
import {ProduitsComponent} from './produits/produits.component';
import {AddProductComponent} from './add-product/add-product.component';
import {PharmacieSettingComponent} from './pharmacie-setting/pharmacie-setting.component';
import {PharmacieCheckoutComponent} from './pharmacie-checkout/pharmacie-checkout.component';
import {MapListComponent} from './map-list/map-list.component';
import {OrdersComponent} from './orders/orders.component';
import {ProductPageGridComponent} from './product-page-grid/product-page-grid.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {CartComponent} from './cart/cart.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AngularMaterialModule} from '../../angular-material.module';
import {AgmCoreModule} from '@agm/core';
import {AgmDirectionModule} from 'agm-direction';
import {AgmSnazzyInfoWindowModule} from '@agm/snazzy-info-window';
import {PharmacieRoutingModule} from '../../routers/pharmacie-routing/pharmacie-routing.module';
import {PharmacieSignupComponent} from './pharmacie-signup/pharmacie-signup.component';
import {MatSelectCountryModule} from '@angular-material-extensions/select-country';
import {PaymentSuccessComponent} from './payment-success/payment-success.component';
import {NgxStripeModule} from 'ngx-stripe';


@NgModule({
  declarations: [
    PharmacieProfileComponent,
    PharmacieSearchComponent,
    PharLoginComponent,
    PharDashboardComponent,
    ProduitsComponent,
    AddProductComponent,
    PharmacieSettingComponent,
    PharmacieCheckoutComponent,
    MapListComponent,
    OrdersComponent,
    ProductPageGridComponent,
    ProductDetailsComponent,
    CartComponent,
    OrderDetailComponent,
    PharmacieSignupComponent,
    PaymentSuccessComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AngularMaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAOhHjYUOLvSh3GG_H69tQTpYvQlJmT-Rc'
    }),
    AgmDirectionModule,
    AgmSnazzyInfoWindowModule,
    PharmacieRoutingModule,
    MatSelectCountryModule.forRoot('fr'),
    NgxStripeModule.forRoot('pk_test_51Iz3EFKNPi1VJcHg2s4jzJrl8hX5vSi5On4k0w2Z8AICRQcSf0z8mWLr1Utv862jdEVfXdZoD7T9RvpL21IqKqMY000A6GtnWf'),
  ]
})
export class PharmacieModule {
}
