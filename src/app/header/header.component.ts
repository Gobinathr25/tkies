import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private login: LoginComponent, private registration:RegistrationComponent) {}

  openLogin(content) {
   // alert(content)
    this.login.open(content)

  }
  openRegistration(content) {
    // alert(content)
     this.registration.open(content)
 
   }
   onSubmit(val :any)
  {
    this.registration.createUser(val)
  
  }
  ngOnInit() {
  }

}
