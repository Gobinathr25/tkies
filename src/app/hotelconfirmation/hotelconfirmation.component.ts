import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'hotelconfirmation',
  templateUrl: './hotelconfirmation.component.html',
  styleUrls: ['./hotelconfirmation.component.scss'],
})
export class HotelconfirmationComponent {

  constructor(private router: Router) {}
  ngOnInit() {

   
$(document).ready(function(){
  $("#flip").click(function(){
    $("#panel").slideToggle("slow");
  });
});
  }
}