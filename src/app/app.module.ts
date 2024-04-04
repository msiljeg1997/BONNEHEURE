import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiComponent } from './components/ui/ui.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

import { ToastModule } from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductManagementComponent } from './pages/admin/product-management/product-management.component';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { AboutUsComponent } from './pages/everyone/about-us/about-us.component';
import { HomeComponent } from './pages/everyone/home/home.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { UserManagementComponent } from './pages/admin/user-management/user-management.component';
import { LoginComponent } from './pages/everyone/login/login.component';
import { RegisterComponent } from './pages/everyone/register/register.component';
import { ForgotPasswordComponent } from './pages/everyone/forgot-password/forgot-password.component';
import { OrderManagementComponent } from './pages/admin/order-management/order-management.component';
import { UserSettingsComponent } from './pages/user/user-settings/user-settings.component';
import { UserOrdersComponent } from './pages/user/user-orders/user-orders.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddUserFormComponent } from './pages/admin/user-management/user-form/add-user-form/add-user-form.component';
import { EditUserFormComponent } from './pages/admin/user-management/user-form/edit-user-form/edit-user-form.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { UiService } from './components/ui/ui.service';
import { BadgeModule } from 'primeng/badge';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { ProductFormComponent } from './pages/admin/product-management/product-form/product-form/product-form.component';
import { CarouselModule } from 'primeng/carousel';
import { GroupManagementComponent } from './pages/admin/group-management/group-management.component';
import { GroupFormComponent } from './pages/admin/group-management/group-form/group-form.component';
import { CartComponent } from './pages/everyone/cart/cart.component';
import { ImageModule } from 'primeng/image';
import { ImageSettingsComponent } from './pages/admin/product-management/product-form/product-form/image-settings/image-settings.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from './services/auth.service';
import { LogManagementComponent } from './pages/admin/log-management/log-management.component';
import { AccordionModule } from 'primeng/accordion';
import { DataViewModule } from 'primeng/dataview';
import { VariantFormComponent } from './pages/admin/product-management/product-form/product-form/variant-form/variant-form.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { StepsModule } from 'primeng/steps';
import { ProductDetailsComponent } from './pages/everyone/product-details/product-details.component';
import { GalleriaModule } from 'primeng/galleria';
import { CartItemComponent } from './pages/everyone/cart/cart-item/cart-item.component';
import { CartDeliveryComponent } from './pages/everyone/cart/cart-delivery/cart-delivery.component';
import { CartPaymentComponent } from './pages/everyone/cart/cart-payment/cart-payment.component';
import { OrderDetailsComponent } from './pages/admin/order-management/order-details/order-details.component';
import { OrderLinesComponent } from './pages/admin/order-management/order-details/order-lines/order-lines.component';
import { DocumentContactComponent } from './pages/everyone/documents/document-contact/document-contact.component';
import { DocumentBasicConditionsComponent } from './pages/everyone/documents/document-basic-conditions/document-basic-conditions.component';
import { DocumentPrivacyPolicyComponent } from './pages/everyone/documents/document-privacy-policy/document-privacy-policy.component';
import { DocumentQualityComponent } from './pages/everyone/documents/document-quality/document-quality.component';
import { DocumentReturnsComponent } from './pages/everyone/documents/document-returns/document-returns.component';
import { DocumentComplaintsComponent } from './pages/everyone/documents/document-complaints/document-complaints.component';
import { DocumentDeliveryComponent } from './pages/everyone/documents/document-delivery/document-delivery.component';
import { DocumentPaymentComponent } from './pages/everyone/documents/document-payment/document-payment.component';
import { DocumentPaymentSecurityComponent } from './pages/everyone/documents/document-payment-security/document-payment-security.component';
import { DocumentCookiesComponent } from './pages/everyone/documents/document-cookies/document-cookies.component';
import { VerifyRegistrationComponent } from './pages/everyone/register/verify-registration/verify-registration.component';
import { ConfirmResetPasswordComponent } from './pages/everyone/forgot-password/confirm-reset-password/confirm-reset-password.component';
import { UserOrderDetailsComponent } from './pages/user/user-orders/user-order-details/user-order-details.component';
import { UserOrderLinesComponent } from './pages/user/user-orders/user-order-details/user-order-lines/user-order-lines.component';
import { PaginatorModule } from 'primeng/paginator';
import { ProizvodiNaslovnaComponent } from './proizvodi-naslovna/proizvodi-naslovna.component';
import { CartService } from './services/cart.service';
import { ProizvodiOnlyComponent } from './proizvodi-only/proizvodi-only.component';


@NgModule({
  declarations: [
    AppComponent,
    UiComponent,
    FooterComponent,
    HeaderComponent,
    ProductManagementComponent,
    AboutUsComponent,
    HomeComponent,
    UserManagementComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    OrderManagementComponent,
    UserSettingsComponent,
    UserOrdersComponent,
    AddUserFormComponent,
    EditUserFormComponent,
    ProductFormComponent,
    GroupManagementComponent,
    GroupFormComponent,
    CartComponent,
    ImageSettingsComponent,
    LogManagementComponent,
    VariantFormComponent,
    ProductDetailsComponent,
    CartItemComponent,
    CartDeliveryComponent,
    CartPaymentComponent,
    OrderDetailsComponent,
    OrderLinesComponent,
    DocumentContactComponent,
    DocumentBasicConditionsComponent,
    DocumentPrivacyPolicyComponent,
    DocumentQualityComponent,
    DocumentReturnsComponent,
    DocumentComplaintsComponent,
    DocumentDeliveryComponent,
    DocumentPaymentComponent,
    DocumentPaymentSecurityComponent,
    DocumentCookiesComponent,
    VerifyRegistrationComponent,
    ConfirmResetPasswordComponent,
    UserOrderDetailsComponent,
    UserOrderLinesComponent,
    ProizvodiNaslovnaComponent,
    ProizvodiOnlyComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastModule,
    BlockUIModule,
    ConfirmDialogModule,
    MenubarModule,
    InputTextModule,
    AvatarGroupModule,
    AvatarModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    DropdownModule,
    BadgeModule,
    ToolbarModule,
    FileUploadModule,
    CarouselModule,
    ImageModule,
    InputTextareaModule,
    CheckboxModule,
    AccordionModule,
    DataViewModule,
    PanelMenuModule,
    StepsModule,
    GalleriaModule,
    PaginatorModule,
  ],
  providers: [
    DatePipe,
    DecimalPipe,
    MessageService,
    ConfirmationService,
    CartService,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: function (uiService: UiService, authService: AuthService) {
        return new AuthInterceptor(uiService, authService);
      },
      multi: true,
      deps: [UiService, AuthService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
