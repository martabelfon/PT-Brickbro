import { Component, OnInit } from '@angular/core';

import { ListService } from '../../services/list.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(public ListService: ListService, private router: Router) {}

  ngOnInit() {

  }

  addList(newSearch: HTMLInputElement) {
    console.log('agregando...', newSearch.value);
    this.ListService.addList({
      adress: newSearch.value,
      longitude: "",
      latitude: "",
    });
    newSearch.value = '';
    this.redirect();
  }

  redirect(){
    this.router.navigate(['/map'])
  }

}
