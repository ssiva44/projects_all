import { Component, OnInit,Input } from '@angular/core';
import { I18nService } from '../I18nService';
import {CommonService} from '../../common.service';
@Component({
  selector: 'procurement',
  templateUrl: './procurement.component.html',
  styleUrls: ['./procurement.component.css']
})
export class ProcurementComponent implements OnInit {
  @Input() locale: any;
  @Input() procurementsPath: any;
  @Input() procurementSearchPath: any;
  @Input() procurementResponse: any;
  @Input() loading: any;
  @Input() imagePath: any;

  title: string;
  projectTitle: string;
  noticesList: string;
  procurementList: any[] = [];
  constructor(private service:CommonService) { }

  ngOnInit() {
    
   
  }
  ngOnChanges(){
    this.service.changeSummaryResults.subscribe((apiResponse:any) => {
      
      if (apiResponse) { 
      this.title = I18nService.PROCUREMENT_NOTICES[this.locale].title;
      this.projectTitle = I18nService.PROJECT[this.locale].projectTitle;
      this.noticesList = I18nService.PROCUREMENT_NOTICES[this.locale].noticesList;

      let procurements = apiResponse.procnotices;            
      let procurementList = [];
      
      for(let procurement in procurements) {
          procurementList.push(procurements[procurement]);
      }           
      this.procurementList = procurementList;            
  }
});
  }
}
