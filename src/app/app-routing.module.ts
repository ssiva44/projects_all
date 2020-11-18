import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import{SummaryModule} from './summary/summary.module';
import{ProcurementModule} from './procurement/procurement.module';
import{DocumentsModule} from './documents/documents.module';
import{NewsmediaModule} from './newsmedia/newsmedia.module';
import{PhotogalleryModule} from './photogallery/photogallery.module';
import{ProjectlistModule} from './projectlist/projectlist.module';
import{ProjectlistsummaryModule} from './projectlistsummary/projectlistsummary.module';
import {CommonService} from './common.service';

const routes: Routes = [
{
  path:'',loadChildren: './summary/summary.module#SummaryModule'
},
{
  path:'',loadChildren: './procurement/procurement.module#ProcurementModule'
},
{
  path:'',loadChildren: './documents/documents.module#DocumentsModule'
},
{
  path:'',loadChildren: './newsmedia/newsmedia.module#NewsmediaModule'
},{
  path:'',loadChildren: './photogallery/photogallery.module#PhotogalleryModule'
},
{
  path:'',loadChildren:'./projectlistsummary/projectlistsummary.module#ProjectlistsummaryModule'
},
{
  path:'',loadChildren: './projectlist/projectlist.module#ProjectlistModule'
}
,{
  path: '', redirectTo: '', pathMatch: 'full'
}

];
   
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue : '/' },CommonService]
})

export class AppRoutingModule { 
  
}