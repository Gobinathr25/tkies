import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  @Output() searchDataEvent = new EventEmitter<any>();

  public getDataFromHome(val: any) {
    this.searchDataEvent.emit(val);
  }
  //	domainurl="https://demo.tkies.com/journeytkt_rest/"
  domainurl = "https://demo.tkies.com/journeytkt_rest/"
  // airporturl = this.domainurl+'Train/getTrainStationForSearch';
  airport_url = this.domainurl + 'home/airport_list';
  flightsearch_url = this.domainurl + 'flight/search';
  flightdetail_url = this.domainurl + 'flight/details_flight';
  flightprebook_url = this.domainurl + 'flight/pre_booking';
  flightbooking_url = this.domainurl + 'flight/final_booking';
  staticURL = this.domainurl + 'home/get_static_data';
  constructor(private http: HttpClient) { }

  getAirportList(): Observable<any> {
    // console.log(this.airport_url)
    return this.http.get(`${this.airport_url}`, httpOptions)
  }
  getFlightSearch(data): Observable<any> {
    return this.http.post(`${this.flightsearch_url}`, data, httpOptions)
  }
  getFlightDetail(data): Observable<any> {
    return this.http.post(`${this.flightdetail_url}`, data, httpOptions)
  }
  getFlightPrebook(id): Observable<any> {
    return this.http.get(`${this.flightprebook_url}/${id}`, httpOptions)
  }
  getFlightBook(data): Observable<any> {
    return this.http.post(`${this.flightbooking_url}`, data, httpOptions)
  }
  getStaticData(data): Observable<any> {
    return this.http.post(`${this.staticURL}`, data, httpOptions)
  }
}
