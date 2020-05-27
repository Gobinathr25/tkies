import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from './services/login.service'
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService:LoginService,private _router:Router, private login:LoginComponent)
 {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this._authService.logedIn())
      { 
        //alert('hello')
        return true
      }
      else
      { 
        alert('login pls')
       //this.login.open('mymodal')
        this._router.navigate(['/login'])
        return false
      }
     // return true;
  }
  
}
