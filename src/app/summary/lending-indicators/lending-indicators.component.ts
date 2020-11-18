import { Component, OnInit,Input } from '@angular/core';
import { I18nService } from '../I18nService';
import {CommonService} from '../../common.service';
@Component({
  selector: 'lending-indicators',
  templateUrl: './lending-indicators.component.html',
  styleUrls: ['./lending-indicators.component.css']
})
export class LendingIndicatorsComponent implements OnInit {
  @Input() lendingResponse: any;
  @Input() locale: string;
  @Input() loading: any;
  @Input() imagePath: any;

  title: string;
  subTitle: string;
  lendingIndicatorsOptions: any;
  constructor(private service:CommonService) { }
  ngOnChanges(){
    this.service.changeSummaryResults.subscribe((apiResponse:any) => {
      
        if (apiResponse) { 
      let projectYears = apiResponse.response.projectYear;            
      projectYears.sort((a, b) => a.Year.localeCompare(b.Year)); 
                
      let data = [], chartTitle, xtitle, ytitle, pointFormat, tickInterval;

      projectYears.forEach(projectYear => {
          data.push([+projectYear.Year, +projectYear.CmtAmt])                
      }); 
      
      let i18nService = I18nService.LENDING_INDICATORS[this.locale];
      this.title = i18nService.title;
      this.subTitle = i18nService.subTitle;
      
      if (data.length > 0) {
          let start = data[0][0], end = data[data.length - 1][0]; 
          chartTitle = i18nService.chartTitle;
          xtitle = i18nService.xtitle;
          ytitle = i18nService.ytitle;
          pointFormat = i18nService.pointFormat;
          tickInterval = Math.floor((end - start)/6);               
          this.createChart(data, chartTitle, xtitle, ytitle, pointFormat, tickInterval);
      }
  }
});
  }
  ngOnInit() {
    
  
  }
  public createChart(data, chartTitle, xtitle, ytitle, pointFormat, tickInterval) {
    this.lendingIndicatorsOptions = {             
        title: { 
            text: chartTitle,
            align: 'left',
            x: 30,
            style: {
                color: '#333',
                fontWeight: 'bold',
                fontSize: "16px"
            },
            useHTML: true
        },           
        xAxis: {    
            title: { text: xtitle },   
            lineWidth: 1.5,            
            lineColor: '#445565',
            tickInterval: tickInterval                
        },
        yAxis: {                                
            title: { text: ytitle },
            lineWidth: 1,
            labels: {
                enabled: false
            }                
        },
        legend: { enabled: false },
        tooltip: {
            headerFormat: '',
            pointFormat: pointFormat,
            useHTML: true
        },
        series: [{
            type: 'column',                
            data: data,
            color: '#445565'                
        }],
        credits: {
            text: ''
        }                                            
    };
}  
}
