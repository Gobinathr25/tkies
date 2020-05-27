import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from './../services/flight.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbDateStruct, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

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
  @Input() flightDetails: any;
  filterSearchFlight = [];
  stopCountArray = [];
  airLinesArray = [];
  filteredSearchFlight = [];
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

    var adultCount = (<HTMLInputElement>document.getElementsByClassName('adult_input2')[0]).innerText;
    var infantCount = (<HTMLInputElement>document.getElementsByClassName('infant_input2')[0]).innerText;
    var childCount = (<HTMLInputElement>document.getElementsByClassName('children_input2')[0]).innerText;
    //var classType = (<HTMLInputElement>document.getElementsByClassName('form-check-input')[0]).innerText;
    //console.log("classType:", val.exampleRadiosone);
    //var dep_Date = val.departure_date.year+"-"+val.departure_date.month+"-"+val.departure_date.day;
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
        //console.log(data[0].flightlist);

      },
      (error) =>
        console.log("Something wrong here")
    );

  }
  OnChangeArrTime(isChecked, value) {
    if (isChecked) {
      if (!this.arrTimeArray.includes(value))
        this.arrTimeArray.push(value);
    } else {
      //this.searchFlight = this.filterSearchFlight;
      let index = this.arrTimeArray.indexOf(value);
      if (index > -1) this.arrTimeArray.splice(index, 1);
    }
    console.log("Arrival Time", this.arrTimeArray);
    this.filterFlights();
  }
  OnChangeAirline(isChecked, value) {
    if (isChecked) {
      if (!this.airLinesArray.includes(value))
        this.airLinesArray.push(value);
    } else {
      //this.searchFlight = this.filterSearchFlight;
      let index = this.airLinesArray.indexOf(value);
      if (index > -1) this.airLinesArray.splice(index, 1);
    }
    console.log("Airlines", this.airLinesArray);
    this.filterFlights();
  }
  OnChangeDepTime(isChecked, value) {
    if (isChecked) {
      if (!this.depTimeArray.includes(value))
        this.depTimeArray.push(value);
    } else {
      //this.searchFlight = this.filterSearchFlight;
      let index = this.depTimeArray.indexOf(value);
      if (index > -1) this.depTimeArray.splice(index, 1);
    }
    console.log("DepartureTime", this.depTimeArray);
    this.filterFlights();
  }
  OnChange(isChecked, value) {

    //this.searchFlight = this.filterSearchFlight;
    if (isChecked) {
      if (!this.stopCountArray.includes(value))
        this.stopCountArray.push(value);
    } else {
      //this.searchFlight = this.filterSearchFlight;
      let index = this.stopCountArray.indexOf(value);
      if (index > -1) this.stopCountArray.splice(index, 1);
    }
    console.log("Stop Count", this.stopCountArray)
    this.filterFlights();
    /*this.foundFlight = false;
    this.searchFlight.forEach(element_flight => {

      this.stopCountArray.forEach(element_stopCount => {
        if (element_stopCount == element_flight.stop_cnt.toString()) {
          this.foundFlight = true;
          a++;
          if (!(this.filteredSearchFlight.includes(element_flight)))
            this.filteredSearchFlight.push(element_flight);
        }
        else {
          a++;
          if (this.foundFlight == false) {

            let index_filter = this.filteredSearchFlight.indexOf(element_flight);
            if (index_filter > -1) this.filteredSearchFlight.splice(index_filter, 1);
          }
        }
      });
    });
    if (this.filteredSearchFlight.length == 0 && a <= 0) {
      this.searchFlight = this.filterSearchFlight;
    }
    else
      this.searchFlight = this.filteredSearchFlight*/

  }
  filterFlights() {
    var a = 0;
    this.searchFlight = this.filterSearchFlight;
    if (this.stopCountArray.length > 0) {
      this.foundFlight = false;
      this.searchFlight.forEach(element_flight => {
        this.stopCountArray.forEach(element_stopCount => {
          if (element_stopCount == element_flight.stop_cnt.toString()) {
            this.foundFlight = true;
            a++;
            if (!(this.filteredSearchFlight.includes(element_flight)))
              this.filteredSearchFlight.push(element_flight);
          }
          else {
            a++;
            if (this.foundFlight == false) {

              let index_filter = this.filteredSearchFlight.indexOf(element_flight);
              if (index_filter > -1) this.filteredSearchFlight.splice(index_filter, 1);
            }
          }
        });
      });
      if (this.filteredSearchFlight.length == 0 && a <= 0) {
        this.searchFlight = this.filterSearchFlight;
      }
      else
        this.searchFlight = this.filteredSearchFlight
    }
    if (this.airLinesArray.length > 0) {
      // this.foundFlight = false;
      this.searchFlight.forEach(element_airlinecode => {
        this.foundFlight = false;
        this.airLinesArray.forEach(element_airCode => {
          if (element_airCode == element_airlinecode.airlinecode.toString()) {
            this.foundFlight = true;
            a++;
            if (!(this.filteredSearchFlight.includes(element_airlinecode)))
              this.filteredSearchFlight.push(element_airlinecode);
          }
          else {
            a++;
            if (this.foundFlight == false) {

              let index_filter = this.filteredSearchFlight.indexOf(element_airlinecode);
              if (index_filter > -1) this.filteredSearchFlight.splice(index_filter, 1);
            }
          }
        });
      });
      if (this.filteredSearchFlight.length == 0 && a <= 0) {
        this.searchFlight = this.filterSearchFlight;
      }
      else
        this.searchFlight = this.filteredSearchFlight
    }
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

  ngOnInit() {

    console.log("Flight Dertails:", this.flightDetails)
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
}