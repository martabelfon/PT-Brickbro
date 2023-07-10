import { Injectable } from '@angular/core';

import { searchList } from '../components/models/list'; 

@Injectable({
  providedIn: 'root'
})
export class ListService {

  lists: searchList[];

  constructor() { 
    this.lists = [];
  }

  getList() { //retornar elementos de la lista
    if(localStorage.getItem('lists') === null){
      return this.lists;
    } else {
      this.lists = JSON.parse(localStorage.getItem('lists')!);
      return this.lists;
    }
  }

  addList(list: searchList) {
    this.lists.push(list);
    let lists: searchList[] = [];
    if (localStorage.getItem('lists') === null){
      lists.push(list);
      localStorage.setItem('lists', JSON.stringify(lists));
    } else {
      lists = JSON.parse(localStorage.getItem('lists')!);
      lists.push(list);
      localStorage.setItem('lists', JSON.stringify(lists));
    } 
    console.log(list);
  }

  deleteList(list: searchList){
    for(let i = 0; i < this.lists.length; i++){
      if(list == this.lists[i]){
        this.lists.splice(i, 1);
        localStorage.setItem('lists', JSON.stringify(this.lists));
      }
    } 
  }

  actualSearch (list: searchList) {
     for(let i = 0; i < this.lists.length; i++){
      if(list == this.lists[i]){
        console.log(this.lists[i]);
      }
    }
  }
}