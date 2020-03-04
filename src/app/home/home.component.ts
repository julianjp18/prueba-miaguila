import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
//import {} from 'googlemaps';
declare let L;
import 'B:/Angular/prueba-miaguila/node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js'
import { Service } from "../services/service";

@Component({
  selector: 'mia-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  showFiller = false;
  urlJsonFile = "/src/app/home/favorites.json";

  constructor(private api: Service) { 

  }
    /** 
    @ViewChild("map", {static: true}) mapElement: any;
    map: google.maps.Map;
    
    ngOnInit() {
      var directionsService = new google.maps.DirectionsService;
          var directionsRenderer = new google.maps.DirectionsRenderer;
          const mapProperties = {
            center: new google.maps.LatLng(35.2271, -80.8431),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
          directionsRenderer.setMap(this.map);
          directionsService.route(
            {
              origin: 'chicago, il',
              destination: 'st louis, mo',
              travelMode: google.maps.TravelMode.DRIVING
            },
            function(response, status) {
              if (status === 'OK') {
                directionsRenderer.setDirections(response);
              } else {
                window.alert('Directions request failed due to ' + status + ' '+JSON.stringify(response));
              }
            });
        }
    */

   ngOnInit() {
    this.api
    .getListOfGroup('./favorites.json')
    .subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );

   }

   ngAfterViewInit(){
    const map = L.map('map').setView([51.505, -0.09], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
  
      let control: any = L.Routing.control({
        waypoints: [
          L.latLng(57.74, 11.94),
          L.latLng(57.6792, 11.949)
        ]
      }).addTo(map);
      
      L.Routing.itinerary({
        show: false
      })
   }

}