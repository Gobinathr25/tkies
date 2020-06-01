import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {LoginService} from './../services/login.service';
import {FormGroup,FormControl,Validators} from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authobject
  loginForm: FormGroup;

 

  closeResult: string;

  constructor(private modalService: NgbModal , private authService:LoginService) {}
    
  open(content) {
    //alert(content)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.loginForm=new FormGroup({username:new FormControl('',Validators.required),password:new FormControl('',Validators.required)})

  }


  login()
  {
    console.log("enter this:::::::")
    this.authService.authenticate(this.loginForm.value).subscribe(res=>{
    //console.log(res.access_token)
    this.authobject=JSON.parse(res)
    console.log(this.authobject.token)
   localStorage.setItem("token",this.authobject.token) 
})
  }
}
