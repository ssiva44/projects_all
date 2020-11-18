import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routes,RouterModule} from '@angular/router';
import { AppComponent } from './app/app.component';
import {HttpClientModule} from '@angular/common/http';
import { LocalePipe } from "./pipes/locale.pipe";
import { KeysPipe } from "./pipes/keys.pipe";
import { DateFormatPipe } from "./pipes/date.pipe";
import { ObjectFilterPipe } from "./pipes/objectFilter.pipe";
import { LimitPipe } from "./pipes/limit.pipe";
const routes:Routes=[
  {
    path:'',component:AppComponent,
  }
]

@NgModule({
  declarations: [AppComponent,LocalePipe,
    KeysPipe,
    DateFormatPipe,
    ObjectFilterPipe,
    LimitPipe],
  imports: [
    CommonModule,HttpClientModule,RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class PhotogalleryModule { }
