import { Component, OnInit , Input } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import {CommonService} from '../../common.service';
@Component({
  selector: 'sector-section',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})


export class SectorComponent implements OnInit {  
  @Input() apiResponse: any; 
  @Input() projectCode: string;
  @Input() locale: string;

  // Doughnut
  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';
  public isDataAvailable:boolean = false;

  titleLocales: any = {};  
  isResponse: boolean;
  sectorTitle: string;  
  options: any;  
  isSector: boolean = true;  
  noData: string;
  noDataLocales: any = {};
ngOnInit(){

}
  constructor(private http:HttpClient,private service:CommonService) {
    this.titleLocales = { 
      en: 'Sectors', 
      es: 'Sectores', 
      fr: 'Secteurs', 
      pt: 'Setores', 
      ru: 'Секторы', 
      ar: 'القطاعات', 
      zh: '部门' 
    };  
    
    this.noDataLocales = { 
      en: 'No data available.', 
      es: 'No hay datos disponibles.', 
      fr: 'Pas de données disponibles.', 
      pt: 'Não há dados disponíveis', 
      ru: 'Нет данных.', 
      ar: 'لا تتوفر بيانات.', 
      zh: '暂无数据' 
    };  
  }

  ngOnChanges() {  
                         
    this.service.changeSummaryResults.subscribe((apiResponse:any) => {
      
      if (apiResponse) {
                     
   // if (this.apiResponse != undefined) {

      this.sectorTitle = this.titleLocales[this.locale];
      this.noData = this.noDataLocales[this.locale];
      this.isResponse = true;
      let sectorArr = [];
      let projectDetails = apiResponse.projects[this.projectCode]; 
      
      if (projectDetails.hasOwnProperty('sector')) {
        let sectorListArr = projectDetails.sector;      
        let chartcolorcodes = ["#DD5F45", "#4AAEB5", "#52926E", "#EFC648", "#DD5F45", "#55BBE3", "#F59023", "#69B88B", "#2EB0F2", "#B08BC2"];
        let colorCodeArr = [];

        for(var i = 1; i <= sectorListArr.length; i++){         
          let sectorvar = projectDetails["sector" + i];
          sectorArr.push([sectorvar.Name, sectorvar.Percent]);  
          colorCodeArr.push(chartcolorcodes[Number(i)-1]);             
        }              

        this.options = {
          chart: { 
            type: 'pie'         
          },
          colors: colorCodeArr,
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal',
              itemStyle: {       
                textOverflow: "null"     
              }
            },
            series: [{
              data: sectorArr,
              innerSize: '85%',
              showInLegend:true,
              dataLabels: {
                enabled: false
              }
            }],
            credits: {
              text: ''
            },
            title: { 
              text: '',
            },
            tooltip: {
              formatter: function() {
                return '<b>'+ this.point.name +': ' + this.y + '%</b>';
              }
            },
            responsive: {
              rules: [{
                condition: {
                  minWidth: '500'
                },
                chartOptions: {
                plotOptions: {
                    pie: {
                      size: '75%'
                    }
                },
                legend: {
                  align: 'right',
                  verticalAlign: 'top',
                  layout: 'vertical',
                  x:-20,
                  y:50,
                  itemStyle: {
                    width: "200%",
                    textOverflow: "null"       
                  }
                }
              }
            }]
          } 
        };
      } else {
        this.isSector = false;
      }
    }
 //}
}) 
  }
  
// });
//   }       
}
