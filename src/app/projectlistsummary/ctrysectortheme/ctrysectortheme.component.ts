
import { Component, OnInit , Input} from '@angular/core';
import { Observable } from 'rxjs';
import {CommonService} from '../../common.service';
@Component({
  selector: 'ctrysectortheme',
  templateUrl: './ctrysectortheme.component.html',
  styleUrls: ['./ctrysectortheme.component.css']
})
export class CtrysectorthemeComponent implements OnInit {

  @Input() cType: string;
  @Input() locale: string;
  @Input() apiResponse: any; 
  options: any;   
  sectortitLocales: any = {};  
  themetitLocales: any = {}; 
  sectorLocales: any = {}; 
  themeLocales: any = {}; 
  projectsLocales: any = {}; 
  isResponse : boolean;
  sectorThemeTit: string;
  

   constructor(private commonservice:CommonService) {
    this.sectortitLocales = { 
      en: 'Sectors', 
      es: 'Sectores', 
      fr: 'Secteurs', 
      pt: 'Setores', 
      ru: 'Секторы', 
      ar: 'القطاعات', 
      zh: '部门' 
    }; 
    this.themetitLocales = { 
      en: 'Themes', 
      es: 'Temas', 
      fr: 'Thèmes', 
      pt: 'Temas', 
      ru: 'Темы', 
      ar: 'محاور التركيز', 
      zh: '主题' 
    };  

    this.sectorLocales = { 
      en: 'Sector', 
      es: 'Sector', 
      fr: 'Secteur', 
      pt: 'Setor', 
      ru: 'Сектор', 
      ar: 'القطاعات', 
      zh: '部门' 
    };  

    this.themeLocales = { 
      en: 'Theme', 
      es: 'Tema', 
      fr: 'Thème', 
      pt: 'Tema', 
      ru: 'Tема', 
      ar: 'محاور التركيز', 
      zh: '主题' 
    };  

    this.projectsLocales = { 
      en: 'Projects', 
      es: 'Proyectos', 
      fr: 'Projets', 
      pt: 'Projetos', 
      ru: 'Проекты', 
      ar: 'المشاريع', 
      zh: '项目' 
    };  


    }

  ngOnInit() {
  }
  ngOnChanges() {  
    // this.locale="en";
  // this.commonservice.changesearchSummaryResults.subscribe((data:any) => {
  //   debugger
    // let apiResponse=data.response;
    // if(data.locale!=undefined){
    //   this.locale=data.locale;
    // }
    if (this.apiResponse != undefined) {
      this.isResponse = true;
  let chartDataArr = []; 
  
  let chartcolorcodes = ["#DD5F45", "#4AAEB5", "#52926E", "#EFC648", "#DD5F45", "#55BBE3", "#F59023", "#69B88B", "#2EB0F2", "#B08BC2"];
  let colorCodeArr = [];
    let sectorfacetarr =this.apiResponse.facets.sector_exact;
    debugger
    this.sectorThemeTit = this.sectortitLocales[this.locale];

    let tooltipKey = this.sectorLocales[this.locale];
    let tooltipValue = this.projectsLocales[this.locale];

    if(this.cType == "themes")
    {
    tooltipKey = this.themeLocales[this.locale];
    sectorfacetarr = this.apiResponse.facets.theme_exact;
    this.sectorThemeTit = this.themetitLocales[this.locale];
    }

    if (sectorfacetarr != undefined){
     let index = 1;
     for (let i in sectorfacetarr) {
      chartDataArr.push([sectorfacetarr[i].label,Number(sectorfacetarr[i].count)]);
      colorCodeArr.push(chartcolorcodes[Number(index)-1]);        
      index++;
      if(index > 10)
      break;
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
          data: chartDataArr,
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
        useHTML: true,
        formatter: function() {
          return tooltipKey + ': <b>'+ this.point.name +',</b><br/>'+
          tooltipValue + ': <b>' + this.y + '</b>';
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
                    size: '85%'
                }
            },
            legend: {
              useHTML: true,
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
   }     
         
  }
//})
 }

}
