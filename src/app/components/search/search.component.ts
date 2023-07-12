import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

import { ListService } from '../../services/list.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild('newSearch') inputSearch!: ElementRef;

  constructor(public ListService: ListService, private router: Router, private renderer: Renderer2) {}

  maps!: google.maps.Map;
  searchedAddress: any;

  ngOnInit() {

  }

  private loadAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.renderer.selectRootElement(this.inputSearch.nativeElement),
      {
        fields: ['address_components', 'geometry'],
        types: ['address'],
      }
    );
    google.maps.event.addListener(autocomplete, 'place_changed', () => {

      const place: any = autocomplete.getPlace();
      
      this.searchedAddress = place;
    });
  }

  ngAfterViewInit(): void {
    this.loadAutocomplete();
  }

  addList() {
    const address = this.searchedAddress?.address_components.map((t: any) => { 
      return t.long_name;
    });
    this.ListService.addList({
      address: address.join(', '),
      longitude: this.searchedAddress?.geometry.location.lat(),
      latitude: this.searchedAddress?.geometry.location.lng(),
      mainSearch: true
    });
    this.router.navigate(['/map'])
  }
}
