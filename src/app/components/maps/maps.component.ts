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

  maps!: google.maps.Map;
  markers: google.maps.Marker[];

  constructor(public ListService: ListService, private renderer: Renderer2) {
    this.markers = []; //MAPS
  }

  ngOnInit() {

  }

  //?MAP

  ngAfterViewInit(): void {

    const opciones = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(async (position) => {

        await this.loadMaps(position);
        this.loadAutocomplete();

      }, null, opciones);

    } else {
      console.log("Navegador no compatible")
    }

  };

  private loadAutocomplete() {

    const autocomplete = new google.maps.places.Autocomplete(this.renderer.selectRootElement(this.inputSearch.nativeElement), {
      fields: ["address_components", "geometry"],
      types: ["address"],
    })


    google.maps.event.addListener(autocomplete, 'place_changed', () => {

      const place: any = autocomplete.getPlace();
      console.log("el place completo es:", place)

      this.maps.setCenter(place.geometry.location);
      const marker = new google.maps.Marker({
        position: place.geometry.location,
      });

      marker.setMap(this.maps);
    })
  }

  loadMaps (position: any): any {

    const opciones = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.maps = new google.maps.Map(this.renderer.selectRootElement(this.divMap.nativeElement), opciones)

    const markerPosition = new google.maps.Marker({
      position: this.maps.getCenter(),
      title: "David",
      
    });

    this.ListService.addList({
      adress: "",
      latitude: position.coords.longitude,
      longitude: position.coords.longitude,
    });
    // position.value = '';

    markerPosition.setMap(this.maps);
    this.markers.push(markerPosition);

    
  
  };

  // addList(newSearch: HTMLInputElement) {
  //   console.log('agregando...', newSearch.value);
  //   this.ListService.addList({
  //     adress: newSearch.value,
  //   });
  //   newSearch.value = '';
  // }

}
