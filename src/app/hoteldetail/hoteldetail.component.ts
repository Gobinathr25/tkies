import { Component, OnInit, ViewChild } from '@angular/core';
import { HotelService } from '../services/hotel.service';
import { HotelComponent } from '../hotel/hotel.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';  
import { NgxSpinnerService } from 'ngx-spinner';


declare var $: any;
@Component({
  selector: 'hoteldetail',
  templateUrl: './hoteldetail.component.html',
  styleUrls: ['./hoteldetail.component.scss'],
})


export class HoteldetailComponent implements OnInit {

  hotelDetails={};
  roomDetails={};

  reqObj = {};
  images: Array<any>;
  
constructor( private spinner: NgxSpinnerService,config: NgbCarouselConfig,private hotelService: HotelService, private hotelService1: HotelService, private activatedRoute: ActivatedRoute, private router: Router){
  config.wrap = true;  
  this.spinner.show();


 /* const navigation = this.router.getCurrentNavigation();
  const state = navigation.extras.state as {
    api: string;
    trace_id: string;
    token_id: string;
    hotel_code: string;
    result_index: string;
  }; */
this.reqObj = {
/*api: state.api,
trace_id: state.trace_id,
token_id: state.token_id,
hotel_code: state.hotel_code,
result_index: state.result_index*/

api: "tbohotel",
hotel_code: "1031569",
result_index: 3,
token_id: "8894cda6-c035-40f5-bf5e-a4b14b4976c7",
trace_id: "29a854a0-b1a9-4bd0-9112-6e0d0a803d83"

};
console.log(this.reqObj)
//var chkreq
var chkreq = {
 // 0: state.token_id+','+state.trace_id+','+state.result_index+','+ state.hotel_code+','+',,'+state.api
 0: "8894cda6-c035-40f5-bf5e-a4b14b4976c7,29a854a0-b1a9-4bd0-9112-6e0d0a803d83,3,1031569,,,tbohotel"
   
  };
  console.log(chkreq); 

//var chkreq
  this.hotelService.getHotelDetail(this.reqObj).subscribe(
    (hotelDetail) => {
      this.hotelDetails = hotelDetail.tbohotel;
      this.spinner.hide();
      console.log("hotel:", this.hotelDetails);
    },
    (err) => console.log(err));

 console.log(chkreq)
    this.hotelService1.roomCheck(chkreq).subscribe(
      (roomDetail) => {
       this.roomDetails = roomDetail.room_details;
        console.log("room:", this.roomDetails[1]);
      },
      (err) => console.log(err));
    }
   
   


  ngOnInit() {

}
}