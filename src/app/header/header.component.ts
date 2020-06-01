import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import {LoginService} from './../services/login.service';
import {FormGroup,FormControl, FormBuilder,Validators} from '@angular/forms'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loginForm: FormGroup;
  authobject: any;
  submitted: boolean = false;
  invalidLogin:boolean = false;
  register: FormGroup;
  constructor(private loginComponent: LoginComponent, private registration:RegistrationComponent,  private authService:LoginService, private formBuilder: FormBuilder) {
this.loginForm = this.formBuilder.group(
  {
    username: ['', Validators.required],
    password:['',Validators.required]

  });
  this.register = this.formBuilder.group(
    {
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(8)]]
    })  ;
  }

  openLogin(content) {
   // alert(content)
    this.loginComponent.open(content)

  }

  login()
  {
    this.submitted = true;
    console.log("enter this:::::::")
    this.authService.authenticate(this.loginForm.value).subscribe(res=>{
    //console.log(res.access_token)
    this.authobject=JSON.parse(res)
    console.log(this.authobject.token)
    console.log("response",this.authobject.msg);
    if(this.loginForm.value.username != "" && this.loginForm.value.password != ""){
      if(this.authobject.msg == "Invalid Username and Password")
      {
        this.invalidLogin=true;
        //this.submitted = false;
      }
    }else{
      this.invalidLogin=false;
    }
      
   localStorage.setItem("token",this.authobject.token) 
});
  }
  get f() { return this.loginForm.controls; 
  }
  get registerDetails()
  {
    return this.register.controls;
  }

  openRegistration(content) {
    // alert(content)
     this.registration.open(content)
 
   }
   onSubmit(val:any)
  {
    this.submitted = true;
    // stop here if form is invalid
    if (this.register.invalid) {
        return;
    }

    this.registration.createUser(val)
  
  }
  ngOnInit() {
  
  }
}
