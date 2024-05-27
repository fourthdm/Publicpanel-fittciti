import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HttpClientJsonpModule  } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from './common/navbar/navbar.component';
import { ViewproductComponent } from './pages/viewproduct/viewproduct.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { LoginComponent } from './common/login/login.component';
import { EnquiryComponent } from './common/enquiry/enquiry.component';
import { RegisterComponent } from './common/register/register.component';
import { BsnComponent } from './brand/bsn/bsn.component';
import { GncComponent } from './brand/gnc/gnc.component';
import { In2Component } from './brand/in2/in2.component';
import { DymatizeComponent } from './brand/dymatize/dymatize.component';
import { MbComponent } from './brand/mb/mb.component';
import { MuscletechComponent } from './brand/muscletech/muscletech.component';
import { Healthinnvo8Component } from './brand/healthinnvo8/healthinnvo8.component';
import { InsanelabzComponent } from './brand/insanelabz/insanelabz.component';
import { RcComponent } from './brand/rc/rc.component';
import { OnComponent } from './brand/on/on.component';
import { FooterComponent } from './common/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { OrderComponent } from './common/order/order.component';
import { CheckoutComponent } from './cmmon/checkout/checkout.component';
import { NavComponent } from './cmmon/nav/nav.component';
import { NewcartComponent } from './cmmon/newcart/newcart.component';
import { RefundpolicyComponent } from './footers/refundpolicy/refundpolicy.component';
import { PrivacypolicyComponent } from './footers/privacypolicy/privacypolicy.component';
import { TermsconditionComponent } from './footers/termscondition/termscondition.component';
import { DeliveryComponent } from './footers/delivery/delivery.component';

import { LightgalleryModule } from 'lightgallery/angular';
import { IsopureComponent } from './brand/isopure/isopure.component';
import { BuildComponent } from './brand/build/build.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CartComponent,
    HomeComponent,
    NavbarComponent,
    ViewproductComponent,
    LoginComponent,
    EnquiryComponent,
    RegisterComponent,
    BsnComponent,
    GncComponent,
    In2Component,
    DymatizeComponent,
    MbComponent,
    MuscletechComponent,
    Healthinnvo8Component,
    InsanelabzComponent,
    RcComponent,
    OnComponent,
    FooterComponent,
    AboutComponent,
    TestimonialsComponent,
    OrderComponent,
    CheckoutComponent,
    NavComponent,
    NewcartComponent,
    RefundpolicyComponent,
    PrivacypolicyComponent,
    TermsconditionComponent,
    DeliveryComponent,
    IsopureComponent,
    BuildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
    LightgalleryModule,
    CarouselModule.forRoot(),
    HttpClientJsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
