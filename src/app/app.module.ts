import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { MapsComponent } from './components/maps/maps.component';
import { ListComponent } from './components/list/list.component';
import { ListService } from './services/list.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchListComponent,
    MapsComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
