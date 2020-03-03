import { Component, OnInit, ViewChild  } from '@angular/core';
import {} from 'googlemaps';


@Component({
  selector: 'mia-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showFiller = false;
  constructor() { }

  @ViewChild("map", {static: true}) mapElement: any;
  map: google.maps.Map;
  
  ngOnInit() {
    const mapProperties = {
      center: new google.maps.LatLng(35.2271, -80.8431),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
  }

}