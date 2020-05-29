import { Component, OnInit } from '@angular/core';
import { FlightService } from './../services/flight.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  constructor(private flightService: FlightService) {

  }

  ngOnInit() {
    var data = {
      content: "about-us"
    };
    this.flightService.getStaticData(data).subscribe((data) => {
      console.log(data);
    });
  }

}
