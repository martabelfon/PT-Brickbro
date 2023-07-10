import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service'

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent  implements OnInit {

  constructor(public ListService: ListService) {}

  ngOnInit() {

  }

  addList(newSearch: HTMLInputElement) {
    console.log('agregando...', newSearch.value);
    this.ListService.addList({
      adress: newSearch.value,
    });
    newSearch.value = '';
  }

}
