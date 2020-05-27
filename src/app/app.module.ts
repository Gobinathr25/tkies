import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms'
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FlightComponent } from './flight/flight.component';
import { HotelComponent } from './hotel/hotel.component';
import { HotelbookingComponent } from './hotelbooking/hotelbooking.component';
import { FlightbookingComponent } from './flightbooking/flightbooking.component';
import { HoteldetailComponent } from './hoteldetail/hoteldetail.component';
import { HotelconfirmationComponent } from './hotelconfirmation/hotelconfirmation.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [ HotelComponent, HomeComponent, FlightComponent ,AppComponent,
 HotelbookingComponent,FlightbookingComponent,HoteldetailComponent,HotelconfirmationComponent, LoginComponent, RegistrationComponent, HeaderComponent, FooterComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxSpinnerModule
  ],
  providers: [LoginComponent,RegistrationComponent],
  bootstrap: [AppComponent]
 // entryComponents: [LoginComponent]
})
export class AppModule { }