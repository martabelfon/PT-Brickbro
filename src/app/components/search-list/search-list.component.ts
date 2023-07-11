import { Component } from '@angular/core';
import { ListService } from '../../services/list.service';

import { searchList } from '../models/list'

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent {
 
  lists: searchList[];
  
  constructor ( public listService: ListService) { 
    this.lists = [];
  }

  ngOnInit() {
      this.lists=this.listService.getList();
  }
}