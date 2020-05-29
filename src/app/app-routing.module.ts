import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { FlightComponent } from './flight/flight.component';
import { HomeComponent } from './home/home.component';

import { HotelComponent } from './hotel/hotel.component';
import { HotelbookingComponent } from './hotelbooking/hotelbooking.component';
import { HotelconfirmationComponent } from './hotelconfirmation/hotelconfirmation.component';
import { FlightbookingComponent } from './flightbooking/flightbooking.component';
import { HoteldetailComponent } from './hoteldetail/hoteldetail.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthGuard } from './auth.guard'
import { AboutusComponent } from './aboutus/aboutus.component';

import { from } from 'rxjs';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'flight', component: FlightComponent },
  { path: 'hotel', component: HotelComponent },
  { path: 'hotelbooking/:id', component: HotelbookingComponent },
  { path: 'hotelconfirmation/:id', component: HotelconfirmationComponent },
  { path: 'flightbooking/:id', component: FlightbookingComponent },
  { path: 'hoteldetail', component: HoteldetailComponent },
  {
    path: 'hoteldetail',
    redirectTo: 'hoteldetail', // Empty path will redirect to content route.
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
