import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': "application/json",
    Accept: "application/json",
  }),
}

@Injectable({
  providedIn: "root",
})
export class HotelService {
  // domainurl = 'https://demo.tkies.com/journeytkt_rest/';
  domainurl = 'https://tkies.com/journeytkt_rest/';


  private get_Cities: string = this.domainurl + 'home/get_cities';
  private hotelsearch_apiurl = this.domainurl + "hotel1/hotel_search_results";
  private hotelinfo_apiurl = this.domainurl + "hotel1/get_hotel_info";
  private roomchk_apiurl = this.domainurl + "hotel1/checkavailability";
  private roomdetail_apiurl = this.domainurl + "hotel1/get_hotel_room_details";
  private roombook_apiurl = this.domainurl + "hotel1/hotelroom_book";

  constructor(private http: HttpClient) {}

  getCities(): Observable<any> {
    return this.http.post(this.get_Cities, httpOptions);
  }
  getHotelsearch(data): Observable<any> {
    return this.http.post(this.hotelsearch_apiurl, data, httpOptions);
  }
  getHotelDetail(data): Observable<any> {
    return this.http.post(this.hotelinfo_apiurl, data, httpOptions);
  }
  roomCheck(data): Observable<any> {
    return this.http.post(`${this.roomchk_apiurl}`, data, httpOptions);
  }
  getRoomDetail(data): Observable<any> {
    return this.http.post(`${this.roomdetail_apiurl}`, data, httpOptions);
  }
  roomBook(data): Observable<any> {
    return this.http.post(`${this.roombook_apiurl}`, data, httpOptions);
  }
}
