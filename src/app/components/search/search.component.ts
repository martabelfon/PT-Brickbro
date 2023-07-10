import { Component, OnInit } from '@angular/core';

import { ListService } from '../../services/list.service'


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

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
