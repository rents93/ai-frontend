import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { tileLayer, latLng, circle, polygon, marker, icon, geoJSON, point, bounds, LeafletMouseEvent } from 'leaflet';
import * as L from 'leaflet';
import { Subscription, Subject } from 'rxjs';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { MapService } from '../../services/map/map.service';
import { forEach } from '@angular/router/src/utils/collection';
import { MatCheckbox, MatInput, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/material';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { QueryObj } from '../../models/queryObj';
import { QueryResult } from '../../models/QueryResult/queryResult';
import { Shape } from '../../models/shape';
import * as C from 'chart.js';
import { ArchiveTransaction } from 'src/app/models/QueryResult/archiveTransaction';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  mymap: L.Map;
  mapOptions : L.MapOptions = {
    center: [45.075387, 7.657035],
    zoom: 14
  }

  //E poi DA RIMETTERE 
  // startDate = new Date();
  startDate = new Date(2018, 1, 12, 10, 30);
  endDate = new Date();
  users: String[];
  checkedUsers: String[] = [];
  boundsPolygon = [ ];

  //subcription
  positionsSub: Subscription;
  usersSub: Subscription;
  selectSub: Subscription;
  buySub: Subscription;

  //mappa
  displayedPositions: number;
  markerLayers =  new Array<any>();
  userColorMap: Map<String, string> = new Map();
  layerOfMarkers: L.Layer;
  n_positions: number = 0;

  polygonLayer: L.Layer;
  polygonVert: number = 0;
  polyPoint: L.LatLng[] = [];

  //grafico tempi
  myChart: Chart;
  ctx: HTMLCanvasElement;
  chartPointArray: C.ChartPoint[];

  //acquisto archivi
  selectedArchives: ArchiveTransaction[] = [];

  pippo : string;
  

  constructor(dateTimeAdapter: DateTimeAdapter<any>,
               private mapService: MapService,
               private changeDetector: ChangeDetectorRef
              ) {
    dateTimeAdapter.setLocale('it-IT');

    //di default guardo il periodo degli ultimi 3 giorni
    // this.startDate.setDate(this.startDate.getDate()-3);
  }

  ngOnInit() {
    
    //inizializza la mappa
    this.mymap = L.map('mapid', this.mapOptions);
    let layerbase = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'your.mapbox.access.token'
    });
    this.mymap.addLayer(layerbase);
    this.initializeMap();

    //inizializza il timechart
    this.ctx = <HTMLCanvasElement> document.getElementById("myChart");
    this.myChart = new C.Chart(this.ctx, {
      type: 'line',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes:[{
            type: 'time',
            bounds: 'data',
          }], 
          yAxes: [{
            display: false,
          }]
        }
      }
    })
    //inizializza la lista utenti
    this.usersSub = this.mapService.getUsers()
                .subscribe((data) =>{
                    this.users = data;
                    this.checkedUsers = data;
                    //lo metto qui perchè non posso chiedere le posizioni finche non ho gli utenti
                    this.getPositions();
                });
  }

  initializeMap(){
    this.mymap.on('zoomend', (e : LeafletMouseEvent) => {
      console.log("Zoom event");
      // if(!this.updateBounds(this.mymap)) 
      //   return;
      this.getPositions();
    }); 
    this.mymap.on('moveend', (e : LeafletMouseEvent) => {
      console.log("Move event");
      // if(!this.updateBounds(this.mymap)) 
      //   return;
      this.getPositions();
    });
    this.mymap.on('click', (e: LeafletMouseEvent) => {
      this.drawPolygon(e);
    })
  }

  drawPolygon(e : LeafletMouseEvent){
    if (this.mymap.hasLayer(this.polygonLayer))
      this.mymap.removeLayer(this.polygonLayer);

    if (this.polygonVert == 0) {
      let div = <HTMLInputElement> document.getElementById('poly_div');
      div.style.display = "block";
      this.polygonLayer = L.circle(e.latlng, { radius: 2 });
      this.mymap.addLayer(this.polygonLayer);
      this.polyPoint.push(e.latlng);
      this.polygonVert++;
    } else if (this.polygonVert == 1) {
      this.polygonLayer = L.polyline([this.polyPoint[0], e.latlng]);
      this.mymap.addLayer(this.polygonLayer);
      this.polyPoint.push(e.latlng);
      this.polygonVert++;
    //TRACCIA IL POLIGONO E AGGIUNGE I PUNTI INTERNI
    } else {
      this.polyPoint.push(e.latlng);
      this.polygonLayer = L.polygon(this.polyPoint);
      this.mymap.addLayer(this.polygonLayer);
      this.polygonVert++;
    }
  }

  resetPolygon(){
    // bisogna fargli rifare la richiesta perche se no rimane incantato sulle posizioni del poligiono FATTO
    // e aggiustare robe non pensate
    if (this.mymap.hasLayer(this.polygonLayer))
      this.mymap.removeLayer(this.polygonLayer);
    this.polygonVert = 0;
    this.polyPoint = [];
    let div = <HTMLInputElement> document.getElementById('poly_div');
    div.style.display = "none";
    this.getPositions();
  }

  getMapBounds() : any[]{
    let bounds : L.LatLngBounds = this.mymap.getBounds();
    //PRENDE I VERTICI DELLA MAPPA
    let boundsPolygon = [];
    boundsPolygon.push([bounds.getNorthEast().lng, bounds.getNorthEast().lat]);
    boundsPolygon.push([bounds.getNorthWest().lng, bounds.getNorthWest().lat]);
    boundsPolygon.push([bounds.getSouthWest().lng, bounds.getSouthWest().lat]);
    boundsPolygon.push([bounds.getSouthEast().lng, bounds.getSouthEast().lat]);
    return boundsPolygon;
  }

  latlngToNumber(array: L.LatLng[]) : number[]{
    //controllla che l array non sia vuoto
    let newArray = [];
    for(let i =0; i<array.length; i++){
      newArray.push([array[i].lng, array[i].lat]);
    }
    return newArray;
  }

  getPositions(){
    let bounds;
    if (this.checkedUsers.length==0){

      alert("Selezionare almeno un utente!");
      return;
    }
    if (this.polyPoint.length >=3)
      bounds = this.formatPolygon(this.latlngToNumber(this.polyPoint));
    else
      bounds = this.formatPolygon(this.getMapBounds());
    let shape = new Shape('Polygon', [bounds]);
    let queryObj: QueryObj = new QueryObj(shape, this.checkedUsers);
    console.log(queryObj);

    //se c'era gia una richiesta in atto la stoppa e la rifa con i nuovi parametri
    if( this.positionsSub !== null &&  this.positionsSub !== undefined)
      this.positionsSub.unsubscribe();

    this.positionsSub = this.mapService.getPositions(queryObj, this.removeSeconds(this.startDate.getTime()), 
                                                              this.removeSeconds(this.endDate.getTime()))
    .subscribe((data : QueryResult) => {
      //console.dir(data);
      //SEMBREREBBE UNA CALLBACK
      if(this.layerOfMarkers !== null && this.layerOfMarkers !== undefined){
        this.mymap.removeLayer(this.layerOfMarkers);
      }
      this.selectedArchives = [];
      this.getUserColors(data);
      this.displayPositions(data);
      this.displayTime(data);
      this.n_positions = data.byTotal;
      console.log(data.byTotal);
      // this.elaborateSearchResult(data, this);
      this.changeDetector.detectChanges();
    });
  }

  getUserColors(data: QueryResult): void {
    for(let i=0 ; i< data.byUser.length; i++){
      let user = data.byUser[i].user;
      let color = data.byUser[i].color;
      //_self.usersFilter.push(user);
      if(this.userColorMap.get(user) === null || this.userColorMap.get(user) === undefined){
       this.userColorMap.set(user, color);
      }
    }
  }

  displayPositions(data: QueryResult): void{
    let positionData = data.byPosition;
    //console.dir(positionData);
    this.displayedPositions = data.byTotal;
    this.markerLayers = [];
    for(let i=0 ; i<positionData.length; i++){
      let user = positionData[i].user;
      let lat = positionData[i].point.coordinates[1];
      let lng = positionData[i].point.coordinates[0];
      // add each marker as a layer
      let c : string = this.userColorMap.get(user);
      this.markerLayers[i] = L.circle([lat, lng], {radius: 1000, color: c});
      // console.log(this.markerLayers[i]);
    }
    // add all layers as a single array to layer
    this.layerOfMarkers = L.layerGroup( this.markerLayers);
    this.mymap.addLayer( this.layerOfMarkers);
    let i = 0;
    this.mymap.eachLayer(function(){ i += 1; });
    console.log('Map has ', i, ' layers.');
    this.changeDetector.detectChanges();
  }

  displayTime(data: QueryResult){
    let timestampData = data.byTimestamp;
    //this.chartPointArray = [];
    let userIndexMap: string[] = [];
    let userTimestampMap: Map<string, C.ChartPoint[]> = new Map();
    // = new Map<string, number>();
    for(let i=0; i<timestampData.length; i++){
      let user = timestampData[i].user;
      let timestamp = timestampData[i].timestamp;
      if ( !userTimestampMap.has(user) ){
        userTimestampMap.set(user, []);
        userIndexMap.push(user);
      }
      let chartPoint = { t: new Date(timestamp*1000), y: userIndexMap.indexOf(user) };
      userTimestampMap.get(user).push(chartPoint);
      //this.chartPointArray.push(chartPoint);
    }
    console.log(this.chartPointArray);
    // this.myChart.data.datasets.forEach((dataset) => {
    //   dataset.data = this.chartPointArray;
    // })
    // this.myChart.update();

    this.ctx = <HTMLCanvasElement> document.getElementById("myChart");
    this.myChart.destroy();
    this.myChart = new C.Chart(this.ctx, {
      type: 'line',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes:[{
            type: 'time',
            bounds: 'data',
          }], 
          yAxes: [{
            display: false,
          }]
        },
        hover: {
          mode: null
        },      
      }
    })
    // this.myChart.data
    for (let i=0; i < userIndexMap.length; i++){
      this.myChart.data.datasets.push({
        label: userIndexMap[i],
        showLine: false,
        pointBackgroundColor: this.userColorMap.get(userIndexMap[i]),
        data: userTimestampMap.get(userIndexMap[i]),
        pointRadius: 5,
        borderColor:  this.userColorMap.get(userIndexMap[i]),
      });
      // this.myChart.data.datasets[i].data = userTimestampMap.get(userIndexMap[i]);
      // this.myChart.data.datasets[i].showLine = false;
      // this.myChart.data.datasets[i].pointBackgroundColor = this.userColorMap.get(userIndexMap[i]);
    }
    // this.myChart.data.datasets[0].data = this.chartPointArray;
    // console.log(this.myChart.data.datasets[0].data);
    this.myChart.update();
  }

  //AGGIUNGE IL PUNTO INIZIALE ALLA FINE PER CHIUDERE IL POLIGONO
  formatPolygon(polygon : any[]) : any[]{
    let polygonWellFormatted = [];
    for(let i =0; i< polygon.length; i++){
      polygonWellFormatted.push(polygon[i]);
    }
    polygonWellFormatted.push(polygon[0]);
    return polygonWellFormatted;
  }

  removeSeconds(data: number): number{
    return parseInt(data.toString().slice(0, -3));
  }

  selectAll(){
    let users = document.getElementsByClassName("checkBoxUsers");
    for (var i = 0; i < users.length; i++) {
      let user = <HTMLInputElement> users[i];
      user.checked = true;
    }
  }

  unselectAll(){
    let users = document.getElementsByClassName("checkBoxUsers");
    for (var i = 0; i < users.length; i++) {
      let user = <HTMLInputElement> users[i];
      user.checked = false;
    }
  }

  closingUsersMenu() {
    console.log("closedMenuusers");
    this.checkedUsers = [];
    let users = document.getElementsByClassName("checkBoxUsers");
    for (var i = 0; i < users.length; i++) {
      let user = <HTMLInputElement> users[i];
      if (user.checked == true)
        this.checkedUsers.push(user.value);
    }
    // console.log(this.checkedUsers);
  }

  selectArchives(){
    let bounds;
    if (this.polyPoint.length >=3)
      bounds = this.formatPolygon(this.latlngToNumber(this.polyPoint));
    else
      bounds = this.formatPolygon(this.getMapBounds());
    let shape = new Shape('Polygon', [bounds]);
    let queryObj: QueryObj = new QueryObj(shape, this.checkedUsers);
    console.log(queryObj);

    //se c'era gia una richiesta in atto la stoppa e la rifa con i nuovi parametri
    if( this.buySub !== null &&  this.buySub !== undefined)
      this.buySub.unsubscribe();

    this.selectSub = this.mapService.selectArchive(queryObj, this.removeSeconds(this.startDate.getTime()), 
                                                              this.removeSeconds(this.endDate.getTime()))
    .subscribe((data : ArchiveTransaction[]) => {
      console.log(data);
      this.selectedArchives = [];
      for (let i=0; i<data.length; i++)
        this.selectedArchives.push(new ArchiveTransaction(data[i].filename, data[i].purchased));
      },
      (error) => {
        alert("Transazione fallita!");
        console.dir(error);   
    });
  }
  
  buyArchives(){
    this.buySub = this.mapService.buyArchives(this.selectedArchives)
                            .subscribe((data :ArchiveTransaction[]) => {
                              alert("Archivi acquistati!");
                              this.selectedArchives = [];
                            },
                            (error) => {
                                alert("Transazione fallita!");
                                console.dir(error);   
                            });
  }

 ngOnDestroy(){
  if(this.positionsSub !== null && this.positionsSub !== undefined)
    this.positionsSub.unsubscribe();
  if(this.selectSub !== null && this.selectSub !== undefined)
    this.selectSub.unsubscribe();
  if(this.buySub !== null && this.buySub !== undefined)
    this.buySub.unsubscribe();
  if(this.usersSub !== null && this.usersSub !== undefined)
    this.usersSub.unsubscribe();
 }
}
