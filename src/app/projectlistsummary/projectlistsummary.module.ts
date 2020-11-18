import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectAppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import {Routes,RouterModule} from '@angular/router';
import { CtryoperationsComponent } from './ctryoperations/ctryoperations.component';
import { CtrysearchprjsComponent } from './ctrysearchprjs/ctrysearchprjs.component';
import { CtrysectorthemeComponent } from './ctrysectortheme/ctrysectortheme.component';
import { APIService }  from './api.service';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import {DateFormatPipe} from './date.pipe';
import {SafePipe} from './safe.pipe';

import { ChartModule } from 'angular2-highcharts';
import { ProjectlistsComponent } from './projectlists/projectlists.component';


declare var require: any;
export function highchartsFactory() {
  return require('highcharts/highstock');
}

const routes:Routes=[
  {
    path:'',component:ProjectAppComponent
  }
]
@NgModule({
  declarations: [ProjectAppComponent, CtryoperationsComponent, CtrysearchprjsComponent, 
    CtrysectorthemeComponent,
    DateFormatPipe,
        SafePipe,
        ProjectlistsComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes),HttpClientModule,ChartModule
  ],
  providers: [APIService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
  exports: [RouterModule]
})
export class ProjectlistsummaryModule { }
