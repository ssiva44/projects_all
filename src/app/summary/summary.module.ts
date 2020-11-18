import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {Routes,RouterModule} from '@angular/router';

import { ProjectComponent } from './project/project.component';
import { ProcurementComponent } from './procurement/procurement.component';
import { LendingIndicatorsComponent } from './lending-indicators/lending-indicators.component';

import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { AppComponent } from './app/app.component';
import { AbstractDetailsComponent } from './abstract-details/abstract-details.component';
import { FinancesComponent } from './finances/finances.component';
import { RatingsComponent } from './ratings/ratings.component';
import { ResultsComponent } from './results/results.component';
import { SectorComponent } from './sector/sector.component';
import { ThemeComponent } from './theme/theme.component';
import { LocalePipe } from "./pipes/locale.pipe";
import { KeysPipe } from "./pipes/keys.pipe";
import { DateFormatPipe } from "./pipes/date.pipe";
import { ObjectFilterPipe } from "./pipes/objectFilter.pipe";
import {SafePipe} from './pipes/safe.pipe';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OrderModule } from 'ngx-order-pipe';
declare var require: any;
export function highchartsFactory() {
  return require('highcharts/highstock');
}
const routes:Routes=[
  {
    path:'',component:AppComponent,
    
  }
]

@NgModule({
  declarations: [ ProjectComponent, ProcurementComponent, 
    LendingIndicatorsComponent, AppComponent, AbstractDetailsComponent, 
    FinancesComponent, RatingsComponent, ResultsComponent, SectorComponent, ThemeComponent,
    LocalePipe,
    KeysPipe,
    DateFormatPipe,
    ObjectFilterPipe,
    SafePipe
  ],
  imports: [
    CommonModule,HttpClientModule,
    DataTablesModule,ChartModule,RouterModule.forChild(routes),OrderModule
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
})
export class SummaryModule { }
