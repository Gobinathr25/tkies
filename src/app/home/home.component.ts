import { Component, EventEmitter, Output } from '@angular/core';
import { FlightService } from './../services/flight.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;
@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent {

  @Output() searchData = new EventEmitter<any>();

  model1: NgbDateStruct;
  airPortList: any[] = [];
  airPortList1: any[] = [];
  lastkeydown1: number = 0;
  searchFlight: any[] = [];
  detailFlight: any[][];
  model_frm: any = {};
  dep_minDate: any;
  ret_minDate: any;
  constructor(private router: Router, private flightService: FlightService, private SpinnerService: NgxSpinnerService, private config: NgbDatepickerConfig) {
    const current = new Date();
    this.dep_minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
    this.ret_minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate() + 1
    };
    this.flightService.getAirportList().subscribe(
      data => {
        Object.assign(this.airPortList, data);
        //console.log(this.airPortList)
      },
      error => {
        console.log("Something wrong here");
      });
  }

  getUserIdsFirstWay($event) {
    let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay')).value;
    console.log(userId);
    this.airPortList1 = [];
    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {

        this.airPortList1 = this.searchFromArray(this.airPortList, userId);
        // console.log(456);
        console.log(this.airPortList1);
      }
    }
  }
  getUserIdsFirstWay1($event) {
    let userId = (<HTMLInputElement>document.getElementById('userIdFirstWay1')).value;
    console.log(userId);
    this.airPortList1 = [];
    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {

        this.airPortList1 = this.searchFromArray(this.airPortList, userId);
        // console.log(456);
        // console.log(this.airPortList1);
      }
    }
  }

  searchFromArray(arr, regex) {
    let matches = [], i;
    // console.log(arr)
    for (i = 0; i < arr.length; i++) {
      if (arr[i]['name'].match(regex)) {
        matches.push(arr[i]['name']);
      }
    }
    //console.log(matches)
    return matches;
  };
  onSubmit(val: any) {
    console.log("value", val)
    var adultCount = (<HTMLInputElement>document.getElementsByClassName('adult_input2')[0]).innerText;
    var infantCount = (<HTMLInputElement>document.getElementsByClassName('infant_input2')[0]).innerText;
    var childCount = (<HTMLInputElement>document.getElementsByClassName('children_input2')[0]).innerText;
    //var classType = (<HTMLInputElement>document.getElementsByClassName('form-check-input')[0]).innerText;
    //console.log("classType:", val.exampleRadiosone);
    //var dep_Date = val.departure_date.year+"-"+val.departure_date.month+"-"+val.departure_date.day;
    //console.log("Value:", val.exampleRadiosone);
    //this.SpinnerService.show();
    val = {
      "search_type": val.search_type,
      "adult_count": adultCount,
      "infant_count": infantCount,
      "child_count": childCount,
      "senior_count": 0,
      "origin1": this.setFormatCode(val.origin1),
      "destination1": this.setFormatCode(val.goingto),
      "origin": this.setCodeName(val.origin1),
      "destination": this.setCodeName(val.goingto),
      "departure_date": this.setDateFormat(val.departure_date),
      "return_date": this.setDateFormat(val.return_date),
      "class": val.exampleRadiosone
    }
    this.flightService.getDataFromHome(val);
    this.router.navigate(['/flight'], { state: val });
  }
  setCodeName(name) {
    if (name != null) {
      var codeName;
      codeName = name.substring(0, name.length - 5)
      return codeName;
    }
    else
      return "";
  }
  setFormatCode(name) {
    if (name != null) {
      var code;
      code = name.substring(name.length - 3, name.length)
      return code;
    }
    else
      return "";
  }
  setDateFormat(dt) {
    if (dt != null) {
      var dep_year = dt.year;
      var dep_month = dt.month;
      if (dep_month > 0 && dep_month < 10) dep_month = '0' + dep_month;

      var dep_day = dt.day;
      if (dep_day > 0 && dep_day < 10) dep_day = '0' + dep_day;

      var dep_Date = dep_year + "-" + dep_month + "-" + dep_day;
      return dep_Date;
    }
    else
      return "";

  }

  ngOnInit() {

    $('#topheader .navbar-nav a').on('click', function () {
      $('#topheader .navbar-nav').find('li.active').removeClass('active');
      $(this).parent('li').addClass('active');
    });
    $('#rightMenu .navbar-nav a').on('click', function () {
      $('#rightMenu .navbar-nav').find('li.active').removeClass('active');
      $(this).parent('li').addClass('active');
    });


    $(function () {
      $("#datepicker-6").datepicker({
        beforeShowDay: function (date) {
          var dayOfWeek = date.getDay();
          // 0 : Sunday, 1 : Monday, ...
          if (dayOfWeek == 0 || dayOfWeek == 6) return [false];
          else return [true];
        }
      });
      $("#datepicker-5").datepicker({
        beforeShowDay: function (date) {
          var dayOfWeek = date.getDay();
          // 0 : Sunday, 1 : Monday, ...
          if (dayOfWeek == 0 || dayOfWeek == 6) return [false];
          else return [true];
        }
      });
      $("#datepicker-4").datepicker({
        beforeShowDay: function (date) {
          var dayOfWeek = date.getDay();
          // 0 : Sunday, 1 : Monday, ...
          if (dayOfWeek == 0 || dayOfWeek == 6) return [false];
          else return [true];
        }
      });
      $("#datepicker-3").datepicker({
        beforeShowDay: function (date) {
          var dayOfWeek = date.getDay();
          // 0 : Sunday, 1 : Monday, ...
          if (dayOfWeek == 0 || dayOfWeek == 6) return [false];
          else return [true];
        }
      });
      $("#datepicker-2").datepicker({
        beforeShowDay: function (date) {
          var dayOfWeek = date.getDay();
          // 0 : Sunday, 1 : Monday, ...
          if (dayOfWeek == 0 || dayOfWeek == 6) return [false];
          else return [true];
        }
      });
      $("#datepicker-1").datepicker({
        beforeShowDay: function (date) {
          var dayOfWeek = date.getDay();
          // 0 : Sunday, 1 : Monday, ...
          if (dayOfWeek == 0 || dayOfWeek == 6) return [false];
          else return [true];
        }
      });
    });
    $(document).ready(function () {
      $('.dropdown-menu li').on('click', function () {
        var getValue = $(this).text();
        $('.dropdown-select').text(getValue);
      });
    });
  }
}