import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {Routes,RouterModule} from '@angular/router';
import { AppComponent } from './app/app.component';
import { DateFormatPipe } from './date.pipe';
import { TableComponent } from './table/table.component';
import { Tab } from './../tab/Tab';
import { Tabset } from './../tab/Tabset';

import { ObjectFilterPipe } from '../pipes/objectfilter.pipe';
import { ReplaceStringPipe } from '../pipes/replacestring.pipe';
import { SanitizeHtmlPipe } from '../pipes/sanitize-html.pipe';
import { ExcelService } from '../services/excel.service';
import { DataTablesModule } from 'angular-datatables';
import { ToCurrencyPipe } from '../pipes/to-currency.pipe';
import { OrderModule } from 'ngx-order-pipe';
const routes:Routes=[
  {
    path:'',component:AppComponent
  }
]
@NgModule({
  declarations: [AppComponent,DateFormatPipe,TableComponent,Tab,Tabset
    ,ObjectFilterPipe,ReplaceStringPipe,SanitizeHtmlPipe,ToCurrencyPipe],
  imports: [
    CommonModule,DataTablesModule,RouterModule.forChild(routes),HttpClientModule,OrderModule
  ],
  exports: [RouterModule],
  providers: [ExcelService],
})


export class ProcurementModule { }
