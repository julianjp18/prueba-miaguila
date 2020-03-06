import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { Location } from '@angular/common';
//import {} from 'googlemaps';
declare let L;
import '../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js'
import { HttpClient } from "@angular/common/http";
import { SidenavComponent } from '../sidenav/sidenav.component'

@Component({
  selector: 'mia-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  map:any;
  actualControl: any;
  public favorites: any = [];
  public latitudeInitSelected: string = ""
  public longitudeInitSelected: string = ""
  public locationInitSelected: string = ""
  public latitudeDestinySelected: string = ""
  public longitudeDestinySelected: string = ""
  public locationDestinySelected: string = ""
  public alertMessage: string = ""

  constructor(private httpClient: HttpClient, private location: Location) { }
    /** 
     * ----- CODE FOR GOOGLE MAPS API
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
     /**
      * Carga de listado de favoritos
      */
    this.httpClient.get("assets/files/favorites.json").subscribe(data =>{
      this.favorites = data;
    })

   }

   /**
    * Si se selecciona una localización de favoritos en la vista origen, lo carga de una como dirección de origen
    */
   onHandleInit(latitude: string, longitude: string, location:string){
      this.latitudeInitSelected = latitude
      this.longitudeInitSelected = longitude
      this.locationInitSelected = location
      this.location.replaceState('/destiny');
      this.alertMessage = ""
      this.onChangeContainer()
   }

   /**
    * Oculta la sección origen y habilita la sección destino
    */
   onChangeContainer(){
    document.getElementById('container-init').style.display="none";
    document.getElementById('container-end').style.display="block";
   }

   /**
    * Si se llena el campo texto de origen 
    */
   sendInit(){
    let txtInit = (<HTMLInputElement> document.getElementById("txt-origen")).value
    
    if(txtInit.length > 0){
      this.location.replaceState('/destiny');
      this.alertMessage= ""
      this.switchLocations(txtInit,0)
      this.onChangeContainer()
    }else{
      this.alertMessage = "Llena el campo de dirección origen ó selecciona uno de tus favoritos."
    }
   }

   /**
    * Valida cual localización se ingresó en el campo
    */
   switchLocations(field: string, option: number){
    if(option === 0){
      switch(field) { 
        case "Suba": { 
          this.latitudeInitSelected = "4.75"
          this.longitudeInitSelected = "-74.0833"
          this.locationInitSelected = "Suba"
          
          break; 
        } 
        case "Teusaquillo": { 
          this.latitudeInitSelected = "4.6419"
          this.longitudeInitSelected = "-74.0829"
          this.locationInitSelected = "Teusaquillo"
          break; 
        } 
        case "Chía": { 
          this.latitudeInitSelected = "4.85"
          this.longitudeInitSelected = "-74.05"
          this.locationInitSelected = "Chía"
          break; 
      } 
      case "Tocancipá": { 
        this.latitudeInitSelected = "4.9667"
        this.longitudeInitSelected = "-73.9167"
        this.locationInitSelected = "Tocancipá" 
          break; 
        }  
        default: { 
          this.alertMessage = "Por favor ingresa un sitio válido. Leer README.md"
          break; 
        } 
      } 
    }else{
      switch(field) { 
        case "Suba": { 
          this.latitudeDestinySelected = "4.75"
          this.longitudeDestinySelected = "-74.0833"
          this.locationDestinySelected = "Suba"
          
          break; 
        } 
        case "Teusaquillo": { 
          this.latitudeDestinySelected = "4.6419"
          this.longitudeDestinySelected = "-74.0829"
          this.locationDestinySelected = "Teusaquillo"
          break; 
        } 
        case "Chía": { 
          this.latitudeDestinySelected = "4.85"
          this.longitudeDestinySelected = "-74.05"
          this.locationDestinySelected = "Chía"
          break; 
      } 
      case "Tocancipá": { 
        this.latitudeDestinySelected = "4.9667"
        this.longitudeDestinySelected = "-73.9167"
        this.locationDestinySelected = "Tocancipá" 
          break; 
        }  
        default: { 
          this.alertMessage = "Por favor ingresa un sitio válido. Leer README.md"
          break; 
        } 
      } 
    }
   }

   /**
    * Cuando se llena el campo de destino y se oprime el botón.
    */
   sendRoute(){
    let txtDestiny = (<HTMLInputElement> document.getElementById("txt-destiny")).value
    if(txtDestiny.length > 0){
      this.location.replaceState('/destiny');
      this.alertMessage=""
      this.switchLocations(txtDestiny,1)
      this.cleanControl()
      this.onChangeContainer()
    }else{
      this.alertMessage = "Llena el campo de dirección destino ó selecciona uno de tus favoritos."
    }
   }

   onHandleDestiny(latitude: string, longitude: string, location:string){
    if(this.latitudeInitSelected != latitude && this.longitudeInitSelected != longitude){
      this.alertMessage=""
      this.latitudeDestinySelected = latitude
      this.longitudeDestinySelected = longitude
      this.locationDestinySelected = location
      this.cleanControl()
    }else{
      this.alertMessage = "Por favor selecciona otro destino diferente donde te encuentras"
    }
    
   }

   /**
    * Limpia las rutas y agrega una nueva.
    */
   cleanControl(){
    this.actualControl.remove()
    this.actualControl = L.Routing.control({
      waypoints: [
        L.latLng(this.latitudeInitSelected, this.longitudeInitSelected),
        L.latLng(this.latitudeDestinySelected,this.longitudeDestinySelected)
      ],
      
    }).addTo(this.map)
   }

   onChangeContainerRoute(){

     if(document.getElementById('container-route').style.display === 'none'){
      document.getElementById('container-route').style.display = 'block';
     }else{
      document.getElementById('container-route').style.display = 'none'
     }
   }

   ngAfterViewInit(){
    this.map = L.map('map').setView([4.6097, -74.0817], 9)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.actualControl = L.Routing.control({
      waypoints: [
        L.latLng(4.611, -74.0703),
        L.latLng(4.5834, -74.129)
      ],
      
    }).addTo(this.map);
    
   }

}