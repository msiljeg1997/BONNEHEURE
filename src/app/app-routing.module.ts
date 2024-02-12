import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { GroupManagementComponent } from './pages/admin/group-management/group-management.component';
import { LogManagementComponent } from './pages/admin/log-management/log-management.component';
import { OrderManagementComponent } from './pages/admin/order-management/order-management.component';
import { ProductManagementComponent } from './pages/admin/product-management/product-management.component';
import { UserManagementComponent } from './pages/admin/user-management/user-management.component';
import { AboutUsComponent } from './pages/everyone/about-us/about-us.component';
import { CartComponent } from './pages/everyone/cart/cart.component';
import { DocumentBasicConditionsComponent } from './pages/everyone/documents/document-basic-conditions/document-basic-conditions.component';
import { DocumentComplaintsComponent } from './pages/everyone/documents/document-complaints/document-complaints.component';
import { DocumentContactComponent } from './pages/everyone/documents/document-contact/document-contact.component';
import { DocumentCookiesComponent } from './pages/everyone/documents/document-cookies/document-cookies.component';
import { DocumentDeliveryComponent } from './pages/everyone/documents/document-delivery/document-delivery.component';
import { DocumentPaymentSecurityComponent } from './pages/everyone/documents/document-payment-security/document-payment-security.component';
import { DocumentPaymentComponent } from './pages/everyone/documents/document-payment/document-payment.component';
import { DocumentPrivacyPolicyComponent } from './pages/everyone/documents/document-privacy-policy/document-privacy-policy.component';
import { DocumentQualityComponent } from './pages/everyone/documents/document-quality/document-quality.component';
import { DocumentReturnsComponent } from './pages/everyone/documents/document-returns/document-returns.component';
import { ConfirmResetPasswordComponent } from './pages/everyone/forgot-password/confirm-reset-password/confirm-reset-password.component';
import { ForgotPasswordComponent } from './pages/everyone/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/everyone/home/home.component';
import { LoginComponent } from './pages/everyone/login/login.component';
import { ProductDetailsComponent } from './pages/everyone/product-details/product-details.component';
import { ProductsComponent } from './pages/everyone/products/products.component';
import { RegisterComponent } from './pages/everyone/register/register.component';
import { VerifyRegistrationComponent } from './pages/everyone/register/verify-registration/verify-registration.component';
import { UserOrdersComponent } from './pages/user/user-orders/user-orders.component';
import { UserSettingsComponent } from './pages/user/user-settings/user-settings.component';
import { KongresManagementComponent } from './pages/admin/kongres-management/kongres-management.component';
import { KongresRadionicaComponent } from './pages/admin/kongres-radionica/kongres-radionica.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  }, {
    path: 'login',
    component: LoginComponent,
    canActivate: []
  }, {
    path: 'forgot_password',
    component: ForgotPasswordComponent,
    canActivate: []
  }, {
    path: 'confirm_reset_password/:hash/:username',
    component: ConfirmResetPasswordComponent,
    canActivate: []
  }, {
    path: 'register',
    component: RegisterComponent,
    canActivate: []
  }, {
    path: 'verify_registration/:hash',
    component: VerifyRegistrationComponent,
    canActivate: []
  }, {
    path: 'document-contact',
    component: DocumentContactComponent,
    canActivate: []
  }, {
    path: 'document-basic-conditions',
    component: DocumentBasicConditionsComponent,
    canActivate: []
  }, {
    path: 'document-privacy-policy',
    component: DocumentPrivacyPolicyComponent,
    canActivate: []
  }, {
    path: 'document-quality',
    component: DocumentQualityComponent,
    canActivate: []
  }, {
    path: 'document-returns',
    component: DocumentReturnsComponent,
    canActivate: []
  }, {
    path: 'document-complaints',
    component: DocumentComplaintsComponent,
    canActivate: []
  }, {
    path: 'document-delivery',
    component: DocumentDeliveryComponent,
    canActivate: []
  }, {
    path: 'document-payment',
    component: DocumentPaymentComponent,
    canActivate: []
  }, {
    path: 'document-payment-security',
    component: DocumentPaymentSecurityComponent,
    canActivate: []
  }, {
    path: 'document-cookies',
    component: DocumentCookiesComponent,
    canActivate: []
  }, {
    path: 'products',
    component: ProductsComponent,
    canActivate: []
  }, {
    path: 'proizvod/:name_id',
    component: ProductDetailsComponent,
    canActivate: []
  }, {
    path: 'home',
    component: HomeComponent,
    canActivate: []
  }, {
    path: 'about_us',
    component: AboutUsComponent,
    canActivate: []
  }, {
    path: 'cart',
    component: CartComponent,
    canActivate: []
  }, {
    path: 'user-orders',
    component: UserOrdersComponent,
    canActivate: [UserGuard]
  }, {
    path: 'user-settings',
    component: UserSettingsComponent,
    canActivate: [UserGuard]
  }, {
    path: 'admin-product-management',
    component: ProductManagementComponent,
    canActivate: [AdminGuard],
  }, 
  {
    path: 'admin-kongres-management',
    component: KongresManagementComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin-kongres-radionice',
    component: KongresRadionicaComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin-group-management',
    component: GroupManagementComponent,
    canActivate: [AdminGuard],
  }, {
    path: 'admin-user-management',
    component: UserManagementComponent,
    canActivate: [AdminGuard],
  }, {
    path: 'admin-order-management',
    component: OrderManagementComponent,
    canActivate: [AdminGuard],
  }, {
    path: 'admin-log-management',
    component: LogManagementComponent,
    canActivate: [AdminGuard],
  }, {
    path: '**',
    redirectTo: 'products'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'disabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
