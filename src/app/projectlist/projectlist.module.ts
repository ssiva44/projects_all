import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AppComponent } from './app/app.component';
import {Routes,RouterModule} from '@angular/router';
// import { ProjectsListComponent } from './projects-list/projects-list.component';
// import { ProjectsDateComponent } from './projects.date/projects.date.component';
// import { ProjectsFacetsComponent } from './projects.facets/projects.facets.component';
// import { ProjectsMobileFacetsComponent } from './projects.mobilefacets/projects.mobilefacets.component';
// import { ProjectsTimeframeComponent } from './projects.timeframe/projects.timeframe.component';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { DataTablesModule } from 'angular-datatables';
import { MyDatePickerModule } from './my-date-picker/my-date-picker.module';
import {HttpClientModule} from '@angular/common/http';
import { Ng5SliderModule } from 'ng5-slider';
import { FormsModule } from '@angular/forms';
import { 
  AppComponent,  
  ProjectsTimeframeComponent, 
  ProjectsDateComponent, 
  ProjectsFacetsComponent, 
  ProjectsMobileFacetsComponent,  
  ProjectsListComponent   
} from "./index";

import { 
  KeysPipe, 
  DateFormatPipe, 
  ObjectsLengthPipe, 
  ContainsPipe, 
  FacetContainsPipe, 
  FacetAnimationPipe, 
  FacetCheckedPipe, 
  LimitPipe, 
  MobileFacetContainsPipe, 
} from "./pipes/index";

declare var require: any;
export function highchartsFactory() {
  return require('highcharts/highstock');
}


const routes:Routes=[
  {
    path:'',component:AppComponent
  }
]
@NgModule({
  declarations: [AppComponent, ProjectsListComponent, ProjectsDateComponent, 
    ProjectsFacetsComponent, ProjectsMobileFacetsComponent, ProjectsTimeframeComponent,
    KeysPipe, 
		DateFormatPipe, 
		ObjectsLengthPipe, 
		ContainsPipe, 
		FacetContainsPipe,
    FacetAnimationPipe,
    FacetCheckedPipe,
		LimitPipe,
		MobileFacetContainsPipe
  ],
  imports: [
    CommonModule,RouterModule.forChild(routes),
    HttpClientModule,
    ChartModule,
    DataTablesModule,
    MyDatePickerModule,
    Ng5SliderModule,FormsModule
  ],
  exports: [RouterModule]
})
export class ProjectlistModule { }
