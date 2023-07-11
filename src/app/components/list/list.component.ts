import { Component, Input, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { searchList } from '../models/list'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() list: searchList = {
    adress:'',
    latitude: '',
    longitude: '',
  };
  lists: searchList[];

  constructor(public listService: ListService) { 
    this.lists = [];
  }

  ngOnInit() {
      
  }

  deleteList(list: searchList) {
    if(confirm('Estas seguro que quieres eliminarlo?')) {
      this.listService.deleteList(list);
    }
  }

  actualSearch (list: searchList) {
      this.listService.actualSearch(list);
  }
}
