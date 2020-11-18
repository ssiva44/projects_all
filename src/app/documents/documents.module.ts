import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from '@angular/router';
import { AppComponent } from './app/app.component';
import { TableComponent } from './table/table.component';
import { Tab } from './Tab';
import { Tabset } from './Tabset';
import { DateFormatPipe } from './date.pipe';
import { ObjectFilterPipe } from './objectfilter.pipe';

import { ExcelService } from '../services/excel.service';
import { DataTablesModule } from 'angular-datatables';

import {HttpClientModule} from '@angular/common/http';
const routes:Routes=[
  {
    path:'',component:AppComponent,
  }
]

@NgModule({
  declarations: [ AppComponent, TableComponent,DateFormatPipe,TableComponent,Tab,Tabset
    ,ObjectFilterPipe],
    imports: [
      CommonModule,DataTablesModule,RouterModule.forChild(routes),HttpClientModule
    ],
    exports: [RouterModule],
    providers: [ExcelService],
})
export class DocumentsModule { }
