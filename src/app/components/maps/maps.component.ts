///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>


import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ListService } from '../../services/list.service'
import { searchList } from '../models/list';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent  implements OnInit {

  @ViewChild('divMap') divMap!: ElementRef;
  @ViewChild('inputSearch') inputSearch!: ElementRef;

  autocompleteInput: any;
  maps!: google.maps.Map;
  markers: google.maps.Marker[];
  mainSearch: any;

  constructor(public ListService: ListService, private renderer: Renderer2) {
    this.markers = []; 

    const list = this.ListService.getList();
    const add: any = list.find((item) => item.mainSearch === true);
    if(!add) return;
    this.mainSearch = add;
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

    const opciones = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(async (position) => {

        if(this.mainSearch) {
          this.loadMaps(this.mainSearch, true);
          this.ListService.markAsShowed(this.mainSearch);
          return;
        }
        await this.loadMaps(position);
        this.loadAutocomplete();

      }, null, opciones);

    } else {
      console.log("Navegador no compatible")
    }
  };

  private loadAutocomplete() {

    const autocomplete = new google.maps.places.Autocomplete(
      this.renderer.selectRootElement(this.inputSearch.nativeElement), 
    {
      fields: ["address_components", "geometry"],
      types: ["address"],
    });

    google.maps.event.addListener(autocomplete, 'place_changed', () => {

      const place: any = autocomplete.getPlace();

      this.maps.setCenter(place.geometry.location);
      const marker = new google.maps.Marker({
        position: place.geometry.location,
      });

      marker.setMap(this.maps);
      const address = place?.address_components.map((t: any) => { 
        return t.long_name;
      })
      this.ListService.addList({
        address: address.join(', '),
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        mainSearch: false
      });
    });
  }

  loadMaps (position: any, mainSearch?: boolean): any {                                                                                                                                                                                                                                                                                                                                                          

    const opciones = {
      center: new google.maps.LatLng(
        mainSearch ? position.latitude : position.coords.latitude, 
        mainSearch ? position.longitude : position.coords.longitude
      ),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.maps = new google.maps.Map(this.renderer.selectRootElement(this.divMap.nativeElement), opciones);

    const markerPosition = new google.maps.Marker({
      position: this.maps.getCenter(),
    });

    markerPosition.setMap(this.maps);
    this.markers.push(markerPosition);
  } 
}
