import { Component, OnInit, ViewChild , ElementRef} from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import {HotelService} from './../services/hotel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder } from '@angular/forms';

declare var $: any;
@Component({
  selector: 'hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
})
export class HotelComponent implements OnInit {
   hotelForm: FormGroup;
   cityList: Array<any>;
   hotelList: Array<any>;
   cityList1: Array<any>;
   lastkeydown1 = 0;
   cityName: string;
   ratingArr: Array<any>

  constructor(private router: Router, private hotelService: HotelService,
     private spinner: NgxSpinnerService,
      private fb: FormBuilder) {
    this.hotelForm = this.fb.group({
      city_name: null,
      checkin_date: null,
      checkout_date: null,
      pass_count: null
    });
  }

  ngOnInit() {

    $( '#topheader .navbar-nav a' ).on( 'click', function() {
      $( '#topheader .navbar-nav' ).find( 'li.active' ).removeClass( 'active' );
      $( this ).parent( 'li' ).addClass( 'active' );
    });
    $( '#rightMenu .navbar-nav a' ).on( 'click', function() {
      $( '#rightMenu .navbar-nav' ).find( 'li.active' ).removeClass( 'active' );
      $( this ).parent( 'li' ).addClass( 'active' );
    });

    $(function() {
      $( '#datepicker-1' ).datepicker({
              beforeShowDay (date) {
                 let dayOfWeek = date.getDay ();
                 // 0 : Sunday, 1 : Monday, ...
                 if (dayOfWeek == 0 || dayOfWeek == 6) { return [false]; }
                 else { return [true]; }
              }
           });
      $( '#datepicker-2' ).datepicker({
              beforeShowDay (date) {
                 let dayOfWeek = date.getDay ();
                 // 0 : Sunday, 1 : Monday, ...
                 if (dayOfWeek == 0 || dayOfWeek == 6) { return [false]; }
                 else { return [true]; }
              }
           });

        });
    $(document).ready(function() {
      $('.dropdown-menu li').on('click', function() {
let getValue = $(this).text();
$('.dropdown-select').text(getValue);
});
});

    this.getCities();
}

private getCities(){
  this.hotelService.getCities().subscribe(
    (cities) => this.cityList = cities,
    (err) => console.log(err));
  }

  getUserIdsFirstWay($event) {
   const userId = this.hotelForm.value.city_name;
   if (userId.length > 2) {
     if ($event.timeStamp - this.lastkeydown1 > 200) {
    this.cityList1 = this.searchFromArray(this.cityList, userId);
    console.log(this.cityList1);
     }
   }
 }

 searchFromArray(arr, regex) {
   let matches = [], i;
   for (i = 0; i < arr.length; i++) {
     if (arr[i].cityName.match(regex)) {
       matches.push(arr[i].cityName);
     }
   }
   console.log('mached data', matches);
   return matches;
 }

 getHotelList(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  // this.hotelList.filter = filterValue.trim().toLowerCase();
   this.hotelList = this.hotelList.filter(
     (res) => {
       return res.filterValue.trim().toLowerCase();
     });
 }
 // ===========================
 pass_change() {
   alert('in');
   let input = $('pass_count');
   input.val('xxx');
   input.trigger('input'); // Use for Chrome/Firefox/Edge
   input.trigger('change'); // Use for Chrome/Firefox/Edge + IE11
}

 onSubmit(val) {
     console.log(val);
     this.spinner.show();
     let data;
     data = {
         'htllist': {
           'nationality': 'IN',
           'country_name': 'IN',
           'city_name': '130443',
           'currency': 'INR',
           // "checkin_date": val['checkin_date']['year']+"-"+val['checkin_date']['month']+"-"+val['checkin_date']['day'],
           // "checkout_date": val['checkout_date']['year']+"-"+val['checkout_date']['month']+"-"+val['checkout_date']['day'],
           'checkin_date': '2020-05-24',
           'checkout_date': '2020-05-26',
            'room_count': 2,
           'hotel_star': 3,
           'adults_per_room': [
             '1',
             '2'
           ],
           'children_per_room': [
             '2',
             '0'
           ],
           'child_age': [
             [
               '3',
               '2'
             ]
           ]}
           };
     this.cityName = this.hotelForm.value.city_name;

     this.hotelService.getHotelsearch(data).subscribe(
       (res) => {
            this.hotelList = res;
            this.spinner.hide();
            console.log(this.hotelList);

            for(let i=1; i <= this.hotelList['rating']; i++){ // 
              this.ratingArr.push(i);
            }

          },
            (err) => console.log(err));
 }

 getHotelDetails(hotel: any){
  let navigationExtras: NavigationExtras = {
      state : {
        api : hotel.api_name,
        trace_id: hotel.trace_id,
        token_id: hotel.token_id,
        hotel_code: hotel.hotel_id,
        result_index: hotel.hotel_index
    }
  };
    this.router.navigate(['hoteldetail'], navigationExtras);
 }
}

