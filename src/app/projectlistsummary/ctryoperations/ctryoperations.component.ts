import { Component, OnInit , Input} from '@angular/core';
import { Observable } from 'rxjs';
import * as highcharts from 'highcharts';
import {CommonService} from '../../common.service';
@Component({
  selector: 'ctryoperations',
  templateUrl: './ctryoperations.component.html',
  styleUrls: ['./ctryoperations.component.css']
})
export class CtryoperationsComponent implements OnInit {
  @Input() locale: string;
  @Input() cType: string;
  @Input() apiResponse: any; 
  options: any;   
  allLocales: any = {};  
  
  isResponse : boolean;
  constructor(private commonservice:CommonService) { 
    this.allLocales = { 
      en: {
        title : 'Operations by Fiscal Year',
        projects : 'Projects',
        commitments : 'Commitments*',
        fiscalYear : 'Fiscal Year',
        year : 'Year'
      },
      es: {
        title : 'Operaciones por ejercicio',
        projects : 'Proyectos',
        commitments : 'Compromisos*',
        fiscalYear : 'Ejercicio',
      },
      fr: {
        title : 'Opérations par exercice',
        projects : 'Projets',
        commitments : 'Engagements*',
        fiscalYear : 'Exercice'
      },
      pt: {
        title : 'Operações por exercício financeiro',
        projects : 'Projetos',
        commitments : 'Compromissos*',
        fiscalYear : 'Exercício financeiro'
      },
      ru: {
        title : 'Объемы деятельности по финансовым годам',
        projects : 'Проекты',
        commitments : 'Объём средств*',
        fiscalYear : 'Финансовый год'
      },
      ar: {
        title : 'العمليات حسب السنة المالية',
        projects : 'المشاريع',
        commitments : 'الارتباطات*',
        fiscalYear : 'السنة المالية'
      },
      zh: {
        title : '按财年的项目',
        projects : '项目',
        commitments : '承诺额*',
        fiscalYear : '财政年度'
      },
    }; 
  }

  ngOnInit() {
  }
  ngOnChanges() {  
    
    this.commonservice.changesearchSummaryResults.subscribe((data:any) => {
      debugger
      let apiResponse=data.response;
      if(data.locale!=undefined){
        this.locale=data.response;
      }else{
        this.locale="en";
      }
      if (apiResponse !=false && apiResponse != undefined) {
      let title = this.allLocales[this.locale].title;
      let projects = this.allLocales[this.locale].projects;        
      let commitments = this.allLocales[this.locale].commitments;
      let fiscalYear = this.allLocales[this.locale].fiscalYear;
      
      this.isResponse = true;
      let colchartDataArr = [], splineChartArr = [], xAxisArr = []; 
      
      let chartcolorcodes = ["#DD5F45", "#4AAEB5", "#52926E", "#EFC648", "#DD5F45", "#55BBE3", "#F59023", "#69B88B", "#2EB0F2", "#B08BC2"];
      let colorCodeArr = [];
      let sectorfacetarr = apiResponse.statsfield.totalcommamt_srt.stats_facets.fiscalyear_budget;
      
      if (sectorfacetarr != undefined){      
        let index = 1;
        for (let i in sectorfacetarr) {
          if(i != '') {
         xAxisArr.push(i);
         splineChartArr.push(sectorfacetarr[i].sum);
         colchartDataArr.push(sectorfacetarr[i].count);           
          }
        }
        
        let start = xAxisArr[0], end = xAxisArr[xAxisArr.length - 1]; 
        let tickInterval = Math.floor((end - start)/6);
        let maxProjectsCount = Math.max.apply(null, colchartDataArr);
        let projectsTickInterval;
        
        if (maxProjectsCount <= 4) {
          projectsTickInterval = 1;
        } else if (maxProjectsCount >= 5 && maxProjectsCount <= 10) {
          projectsTickInterval = 2;
        } else {
          projectsTickInterval = Math.round(maxProjectsCount / 3);
        }
 
        this.options = {
         chart: {
           zoomType: 'xy'         
       },
       title: {
           text: title,
           useHTML: true
       },
       tooltip: {
         shared: false,
         formatter: function() {
          var text = '';
          if(this.series.name == projects) {              
              text = fiscalYear + ': <b>'+ this.x +'</b>, '+
              this.series.name + ': <b>' + highcharts.numberFormat(this.y,0,'.',',') + '</b>';                
          } else {
              text = fiscalYear + ': <b>'+ this.x +'</b>, '+
              this.series.name + ': <b>' + highcharts.numberFormat(this.y,2,'.',',') + '</b>';
          }
          return text;
      },
      useHTML: true
      },
       xAxis: [{
           categories: xAxisArr,          
           title: { text: fiscalYear },
           lineWidth: 1.5,            
           lineColor: '#445565',
           tickInterval: tickInterval 
       }],
       yAxis: [{ // Primary yAxis
            title: {
               text: projects
           },
           labels: {
            format: '{value}'
          },
          tickInterval: projectsTickInterval
        }, { // Secondary yAxis
           title: {
               text: commitments
           },
           labels: {
            formatter: function() {
              return Math.abs(Number(this.value)) / 1.0e+3 + "M";
            }
          },
           opposite: true
       }],
       legend: {
           layout: 'vertical',
           align: 'left',
           x: 120,
           verticalAlign: 'top',
           y: 100,
           floating: true
       },
       series: [{          
           type: 'column',             
           data: colchartDataArr,
           showInLegend: false,
           name: projects,
           color: '#445565'          
       }, {         
           type: 'spline',
           yAxis: 1,
           data: splineChartArr,
           name: commitments,
           showInLegend: false,
           color: '#9d0909'
       }],
       credits: {
         text: ''
     }
        
         
       };
       }   else {
        this.isResponse = false;
       }
  }
})
}
}
