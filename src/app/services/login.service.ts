import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json',
      'Accept' : 'application/json'  }
  )
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiurl="https://demo.tkies.com/journeytkt_rest"
  loginurl = this.apiurl+'/home/Login/agent_login_validate';
  regurl = this.apiurl+'/home/add_b2c_user';
	headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  authenticate(data):Observable<any>{
  // console.log(data);
      return this.http.post(`${this.loginurl}`,data, httpOptions)
    }

    public logedIn()
    {
      console.log(localStorage.getItem("token"))
      if(localStorage.getItem("token"))
         return true
      else 
      return false
    }

    registration(data):Observable<any>{
      // console.log(data);
          return this.http.post(`${this.regurl}`,data, httpOptions)
        }

}
