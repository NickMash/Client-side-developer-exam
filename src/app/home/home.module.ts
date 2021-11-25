import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TableComponent } from './components/table/table.component';



@NgModule({
  declarations: [
    HomePageComponent,
    TableComponent
  ],
  exports: [
    HomePageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
