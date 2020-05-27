import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import {FlightService} from './../services/flight.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
declare var $: any;
@Component({
  selector: 'flightbooking',
  templateUrl: './flightbooking.component.html',
  styleUrls: ['./flightbooking.component.scss'],
})
export class FlightbookingComponent implements OnInit {
  flightId:number;
  detailFlight: any[] [];
  public adultArr:any=[]
  constructor(private router: ActivatedRoute, private flightService :FlightService) {}

  onSubmit(val :any){
    //alert(123);
    /*val = {"fid":3602,
    "agent_id":"34",
    "agent_country":"",
    "user_name":"kavita.malode@gmail.com",
    "mobile_no":91324324324,
    "luggage":"",
    "return_luggage":"",
    "adult_title1":"Mr",
    "adult_fname1":"ssdfsd",
    "adult_lname1":"sdfsdf",
    "adult_mname1":"sdfsdf",
    "adult_dob1":"2000-03-02T15:36:51.363+05:30",
    "adult_passno1":4234234,
    "adult_issue_country1":"IN",
    "adult_passexpiry1":"2020-11-02T15:26:15.511+05:30",
    "adult_luggage1":"",
    "adult_return_luggage1":"",
    "adult_meal1":"1",
    "adult_gender1":"M",
    "country_code":"IN",
    "email_addr":"kavita.malode@gmail.com",
    "phone":91324324324,
    "post_code":91324324324
    };*/
    
   console.log(val);
    this.flightService.getFlightBook(val).subscribe(
      data=>{
        console.log(data);
      },
      error=>{
        console.log("not able to book flight");
      }
    );
  }
  ngOnInit() {
    this.flightId = this.router.snapshot.params.id;
    this.flightService.getFlightPrebook(this.flightId).subscribe(
      data=>{
        // res = data[0];
         this.detailFlight=data[0];
         console.log(this.detailFlight);
         console.log(this.detailFlight['adult'])
         for(let i=1; i <= this.detailFlight['adult']; i++){ // 
           this.adultArr.push(i);
         }
         //console.log(this.detailFlight.sgent);
        //Object.assign(this.detailFlight, data[0]);
        //console.log(this.detailFlight);
      },
      error=>{
        console.log("flight details error")
      });
  }
}


