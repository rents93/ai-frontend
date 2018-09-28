import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, polygon, marker, icon, geoJSON, point, bounds, LeafletMouseEvent } from 'leaflet';
import * as L from 'leaflet';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  mymap: L.Map;
  mapOptions : L.MapOptions = {
    center: [45.075387, 7.657035],
    zoom: 13
  }

  startDate = new Date();
  endDate = new Date();
  Users : String[];

  constructor(dateTimeAdapter: DateTimeAdapter<any>,
               private mapService: MapService,
              ) {
    dateTimeAdapter.setLocale('it-IT');
  }

  ngOnInit() {

    this.mymap = L.map('mapid', this.mapOptions);

    let layerbase = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'your.mapbox.access.token'
    });
    this.mymap.addLayer(layerbase);

    this.initializeMap();

    let markerLayers = [];
    markerLayers[0] = L.circle([45.076397, 7.657036], {radius: 1000, color: 'white'});
    markerLayers[1] = L.circle([45.074398, 7.657034], {radius: 500, color: 'red'});
    markerLayers[2] = L.circle([45.075387, 7.657045], {radius: 200, color: 'green'});

    // add all layers as a single array to layer
    let layerOfMarkers : L.Layer = L.layerGroup(markerLayers);
    this.mymap.addLayer(layerOfMarkers);
    this.mapService.getUsers()
                .subscribe((data) =>{
                    this.Users = data;
                });            
 }


  initializeMap(){
    this.mymap.on('zoomend', (e : LeafletMouseEvent) => {
      console.log("Zoom event");
    }); 
    this.mymap.on('moveend', (e : LeafletMouseEvent) => {
      console.log("Move event");
    });
  }

  onSelect(v1lat: number, v1long: number, v2lat: number, v2long: number): void {
      var corner1 = L.latLng(v1lat, v1long),
      corner2 = L.latLng(v2lat, v2long),
      bounds = L.latLngBounds(corner1, corner2);
      // create an orange rectangle
      L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(this.mymap);
      // zoom the map to the rectangle bounds
  }


  /*//FATTO SOPRA
  options = {
	  layers: [
		  tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 })
	  ],
	  zoom: 14,
    center: latLng(45.075387, 7.657035)
  };
  

  layersControl = {
	  baseLayers: {
		  'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
		  'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
	  },
	  overlays: {
		  'My Circle': circle([ 45.075387, 7.657035 ], { radius: 500 }),
      'My Square': polygon([[ 45.075387, 7.657035 ], [ 45.175387, 7.657035 ], [ 45.175387, 7.757035 ], [ 45.075387, 7.757035 ]])
	  }
  };
  */
}
