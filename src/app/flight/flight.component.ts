import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlightService } from './../services/flight.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbDateStruct, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Options } from 'ng5-slider';

declare var $: any;
@Component({
  selector: 'flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
})
export class FlightComponent {

  model: NgbDateStruct;
  model1: NgbDateStruct;
  airPortList: any[] = [];
  airPortList1: any[] = [];
  lastkeydown1: number = 0;
  searchFlight: any[] = [];
  detailFlight: any[][];
  model_frm: any = {};
  dep_minDate: any;
  ret_minDate: any;
  foundFlight: boolean;
  depTimeArray = [];
  arrTimeArray = [];
  filterSearchFlight = [];
  stopCountArray = [];
  airLinesArray = [];
  filteredSearchFlight = [];
  reset: number;
  sliderPrice: number;
  value: number = 0;
  options: Options = {
    floor: 0,
    ceil: 2000
  };
  data: any;
  airline = [];

  constructor(private activaRouter: ActivatedRoute, private router: Router, private flightService: FlightService, private SpinnerService: NgxSpinnerService, private config: NgbDatepickerConfig) {
    const current = new Date();
    this.dep_minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };

    //config.maxDate = { year: 2099, month: 12, day: 31 };
    config.outsideDays = 'hidden';
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
        //console.log(this.airPortList1);
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
  /* getAirlines() {
     if (this.airPortList1.length > 0) {
       this.airline = this.airPortList1.airlinecode;
       console.log("Airlines", this.airline);
     }
   }*/
  searchFromArray(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i]['name'].match(regex)) {
        matches.push(arr[i]['name']);
      }
    }
    //console.log(matches)
    return matches;
  };



  /*fetching price value from slider */
  OnChangePrice(event) {
    this.sliderPrice = event.value;
    this.filterFlights();
  }
  /* Fetching the checkbox value for arrival time from left side pane*/
  OnChangeArrTime(isChecked, value) {
    if (isChecked) {
      if (!this.arrTimeArray.includes(value))
        this.arrTimeArray.push(value);
    } else {
      //this.searchFlight = this.filterSearchFlight;
      let index = this.arrTimeArray.indexOf(value);
      if (index > -1) this.arrTimeArray.splice(index, 1);
    }
    this.filterFlights(); // calling the filter function 
  }
  /* Fetching the checkbox value for Airlne from left side pane*/
  OnChangeAirline(isChecked, value) {
    if (isChecked) {
      if (!this.airLinesArray.includes(value))
        this.airLinesArray.push(value);
    } else {
      //this.searchFlight = this.filterSearchFlight;
      let index = this.airLinesArray.indexOf(value);
      if (index > -1) this.airLinesArray.splice(index, 1);
    }
    this.filterFlights(); // calling the filter function 
  }
  /* Fetching the checkbox value for Departure time from left side pane*/
  OnChangeDepTime(isChecked, value) {
    if (isChecked) {
      if (!this.depTimeArray.includes(value))
        this.depTimeArray.push(value);
    } else {
      //this.searchFlight = this.filterSearchFlight;
      let index = this.depTimeArray.indexOf(value);
      if (index > -1) this.depTimeArray.splice(index, 1);
    }
    this.filterFlights(); // calling the filter function 
  }
  /* Fetching the checkbox value for stop count from left side pane*/
  OnChange(isChecked, value) {
    if (isChecked) {
      if (!this.stopCountArray.includes(value))
        this.stopCountArray.push(value);
    } else {
      let index = this.stopCountArray.indexOf(value);
      if (index > -1) this.stopCountArray.splice(index, 1);
    }
    this.filterFlights(); // calling the filter function 
  }
  /* fliter function*/
  filterFlights() {
    var a = 0;
    this.searchFlight = this.filterSearchFlight;
    /* filter the stop count flight*/
    if (this.stopCountArray.length > 0) {
      console.log("Before: ", this.searchFlight);
      this.reset = 0;
      for (var i = this.reset; i < this.searchFlight.length; i++) {
        this.foundFlight = false;
        if (this.stopCountArray.length > 0) {
          for (var j = 0; j < this.stopCountArray.length; j++) {
            if (this.stopCountArray[j] == this.searchFlight[i].stop_cnt.toString()) {
              if (!(this.filteredSearchFlight.includes(this.searchFlight[i])))
                this.filteredSearchFlight.push(this.searchFlight[i]);
              this.foundFlight = true;
              a++;
              break;
            }
            else {
              a++;
              this.foundFlight = false;
            }
          }
          if (this.foundFlight == false) {
            let index_filter = this.filteredSearchFlight.indexOf(this.searchFlight[i]);
            if (index_filter > -1) {
              this.filteredSearchFlight.splice(index_filter, 1);
              this.reset = 0;
              if (this.filteredSearchFlight.length > 0)
                i = -1;
            }
          }
        }
      }
      if (this.filteredSearchFlight.length == 0 && a <= 0) {
        this.searchFlight = this.filterSearchFlight;
      }
      else
        this.searchFlight = this.filteredSearchFlight
      console.log("After  ", this.searchFlight);
    }
    /* filter airline flight*/
    if (this.airLinesArray.length > 0) {
      console.log("Before: ", this.searchFlight);
      this.reset = 0;
      for (var i = this.reset; i < this.searchFlight.length; i++) {
        this.foundFlight = false;
        if (this.airLinesArray.length > 0) {
          for (var j = 0; j < this.airLinesArray.length; j++) {
            if (this.airLinesArray[j] == this.searchFlight[i].airlinecode.toString()) {
              if (!(this.filteredSearchFlight.includes(this.searchFlight[i])))
                this.filteredSearchFlight.push(this.searchFlight[i]);
              this.foundFlight = true;
              a++;
              break;
            }
            else {
              a++;
              this.foundFlight = false;
            }
          }
          if (this.foundFlight == false) {
            let index_filter = this.filteredSearchFlight.indexOf(this.searchFlight[i]);
            if (index_filter > -1) {
              this.filteredSearchFlight.splice(index_filter, 1);
              this.reset = 0;
              if (this.filteredSearchFlight.length > 0)
                i = -1;

            }
          }
        }
      }
      if (this.filteredSearchFlight.length == 0 && a <= 0) {
        this.searchFlight = this.filterSearchFlight;
      }
      else
        this.searchFlight = this.filteredSearchFlight
      console.log("After  ", this.searchFlight);
    }
    /* filter departure time flight*/
    if (this.depTimeArray.length > 0) {
      this.reset = 0;
      for (var i = this.reset; i < this.searchFlight.length; i++) {
        this.foundFlight = false;
        if (this.depTimeArray.length > 0) {
          for (var j = 0; j < this.depTimeArray.length; j++) {
            if (this.validateTime(this.depTimeArray[j], this.searchFlight[i].departuretime.toString())) {
              if (!(this.filteredSearchFlight.includes(this.searchFlight[i])))
                this.filteredSearchFlight.push(this.searchFlight[i]);
              this.foundFlight = true;
              a++;
              break;
            }
            else {
              a++;
              this.foundFlight = false;
            }
          }
          if (this.foundFlight == false) {
            let index_filter = this.filteredSearchFlight.indexOf(this.searchFlight[i]);
            if (index_filter > -1) {
              this.filteredSearchFlight.splice(index_filter, 1);
              this.reset = 0;
              if (this.filteredSearchFlight.length > 0)
                i = -1;
            }
          }
        }
      }
      if (this.filteredSearchFlight.length == 0 && a <= 0) {
        this.searchFlight = this.filterSearchFlight;
      }
      else
        this.searchFlight = this.filteredSearchFlight
      console.log("After Departure Time  ", this.searchFlight);
    }
    /* filter Arrival time flight*/
    if (this.arrTimeArray.length > 0) {
      this.reset = 0;
      for (var i = this.reset; i < this.searchFlight.length; i++) {
        this.foundFlight = false;
        if (this.arrTimeArray.length > 0) {
          for (var j = 0; j < this.arrTimeArray.length; j++) {
            if (this.validateTime(this.arrTimeArray[j], this.searchFlight[i].arrivaltime.toString())) {
              if (!(this.filteredSearchFlight.includes(this.searchFlight[i])))
                this.filteredSearchFlight.push(this.searchFlight[i]);
              this.foundFlight = true;
              a++;
              break;
            }
            else {
              a++;
              this.foundFlight = false;
            }
          }
          if (this.foundFlight == false) {
            let index_filter = this.filteredSearchFlight.indexOf(this.searchFlight[i]);
            if (index_filter > -1) {
              this.filteredSearchFlight.splice(index_filter, 1);
              this.reset = 0;
              if (this.filteredSearchFlight.length > 0)
                i = -1;
            }
          }
        }
      }
      if (this.filteredSearchFlight.length == 0 && a <= 0) {
        this.searchFlight = this.filterSearchFlight;
      }
      else
        this.searchFlight = this.filteredSearchFlight
      console.log("After arrival Time  ", this.searchFlight);
    }
    if (this.sliderPrice > 0) {
      this.reset = 0;
      for (var i = this.reset; i < this.searchFlight.length; i++) {
        this.foundFlight = false;
        if (this.sliderPrice <= Number(this.searchFlight[i].price)) {
          a++;
          if (!(this.filteredSearchFlight.includes(this.searchFlight[i])))
            this.filteredSearchFlight.push(this.searchFlight[i]);
        }
        else {
          a++;
          let index_filter = this.filteredSearchFlight.indexOf(this.searchFlight[i]);
          if (index_filter > -1) {
            this.filteredSearchFlight.splice(index_filter, 1);
            this.reset = 0;
            if (this.filteredSearchFlight.length > 0)
              i = -1;
          }
        }
      }
      if (this.filteredSearchFlight.length == 0 && a <= 0) {
        this.searchFlight = this.filterSearchFlight;
      }
      else
        this.searchFlight = this.filteredSearchFlight
    }
  }
  validateTime(filterTime, resTime) {
    if (resTime != null) {
      var time = resTime.split(':');
      var hours = time[0];
      var mintues = time[1].split(' ')[0];
      var mederian = time[1].split(' ')[1];
      console.log("Hours", hours, "Minutes", mintues, "Mederian", mederian)
      if (filterTime == "EMG") {
        if (mederian == "AM" && (hours <= 5 && hours <= 12) && (mintues >= 0 && mintues <= 59))
          return true;
      }
      if (filterTime == "MG") {
        if (mederian == "AM" && (hours >= 6 && hours <= 11) && (mintues >= 0 && mintues <= 59))
          return true;
      }
      if (filterTime == "EVG") {
        if (mederian == "PM" && (hours <= 6 && hours <= 12) && (mintues >= 0 && mintues <= 59))
          return true;
      }
      if (filterTime == "NGT") {
        if (mederian == "PM" && (hours >= 6 && hours <= 11) && (mintues >= 0 && mintues <= 59))
          return true;
      }
      return false;
    }
    else
      return false;
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
  filghtDetails(flightId) {
    $("#MyDIV" + flightId).toggle();

    flightId = { id: flightId };
    console.log(flightId);
    this.flightService.getFlightDetail(flightId).subscribe(
      (data) => {
        // res = data[0];
        console.log(data)
        this.detailFlight = data;
        //console.log(this.detailFlight);
        //console.log(this.detailFlight.sgent);
        //Object.assign(this.detailFlight, data[0]);
        //console.log(this.detailFlight);
      },
      error => {
        console.log("flight details error")
      });
  }

  setGoingDate() {
    var addMonth = 1;
    const current = new Date(this.setDateFormat(this.model_frm.departure_date));
    this.ret_minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate() + 1
    };
    if (this.ret_minDate.validateTime) {
      this.ret_minDate = this.ret_minDate
    }
    else {
      if (this.ret_minDate.day > 31) {
        this.ret_minDate.day = 1;
        this.ret_minDate.month = this.ret_minDate.month + 1;
      }
      if (this.ret_minDate.day > 30) {
        if (this.ret_minDate.day = 1 && (this.ret_minDate.month == 4 || this.ret_minDate.month == 6 || this.ret_minDate.month == 9 || this.ret_minDate.month == 11)) {
          this.ret_minDate.month = this.ret_minDate.month + 1;
        }
      }
      if (this.ret_minDate.month > 12) {
        this.ret_minDate.month = 1
        this.ret_minDate.year = this.ret_minDate.year + 1;
      }
      if (this.ret_minDate.year / 100 == 0 && this.ret_minDate.year / 400 == 0) {
        if (this.ret_minDate.month == 2 && this.ret_minDate.day >= 29)
        {
          this.ret_minDate.month = this.ret_minDate.month + 1;
          this.ret_minDate.day = 1;
        }
      }
      else {
        if (this.ret_minDate.month == 2 && this.ret_minDate.day > 28)
        {
          this.ret_minDate.day = 1;
          this.ret_minDate.month = this.ret_minDate.month + 1;
        }
      }
      console.log(this.ret_minDate);
    }
  }
  ngOnInit() {

    /*this.airPortListOrigin = value.origin1;
    this.airPortListGoingTO = value.goingto;*/


    /*console.log(this.activaRouter.data);
    this.activaRouter.params.subscribe(params => {
      console.log("Params", params['val']) // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });*/
    function toggleIcon(e) {
      $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('glyphicon-plus glyphicon-minus');
    }
    $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);

    $(function () {
      $("#datepicker-1").datepicker({
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

  }
  onSubmit(val: any) {

    var adultCount = (<HTMLInputElement>document.getElementsByClassName('adult_input2')[0]).innerText;
    var infantCount = (<HTMLInputElement>document.getElementsByClassName('infant_input2')[0]).innerText;
    var childCount = (<HTMLInputElement>document.getElementsByClassName('children_input2')[0]).innerText;
    console.log("Value:", val);
    this.SpinnerService.show();
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
    console.log(val);
    this.flightService.getFlightSearch(val).subscribe(
      (data) => {
        console.log(data);
        this.SpinnerService.hide();
        var flightlist = data.length > 0 ? data[0].flightlist : [];
        this.searchFlight = flightlist;
        this.filterSearchFlight = flightlist;
        this.airline = data.length > 0 ? data[0].airline : [];

      },
      (error) =>
        console.log("Something wrong here")
    );

  }
  /*ngAfterViewInit() {
    this.flightService.searchDataEvent.subscribe((value: any) => {
      console.log("from after init:", value)
    })
  }*/

}