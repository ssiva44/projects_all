import { Component, OnInit, Input, ElementRef, HostListener} from '@angular/core';

import { DateFormatPipe } from '../pipes/date.pipe';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import {CommonService} from '../../common.service';
declare var require: any

@Component({
  selector: 'results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  animations: [
    trigger('fadeInOutPD', [
    state('load', style({ height: "0px", display: "none" })),
    state('in', style({ height: "0px", display: "none", opacity: 0.1 })),
    state('out', style({ height: "*", display: "table", opacity: 1 })),
    transition("in <=> out", animate(1000)),			
    transition("out <=> load", animate(1000))			
  ]),
  trigger('fadeInOutIO', [
    state('load', style({ height: "0px", display: "none" })),
    state('in', style({ height: "0px", display: "none", opacity: 0.1 })),
    state('out', style({ height: "*", display: "table", opacity: 1 })),
    transition("in <=> out", animate(1000)),			
    transition("out <=> load", animate(1000))			
  ])

  ]  
})


export class ResultsComponent implements OnInit{

  loader: boolean;
  
  @Input() apiResponse: any;
  @Input() locale: string;
  @Input() projectCode: string;
 
   totalRecords: any;
   rowsCount: any;
  finalArr: any[];
  isResponse: boolean;  
  labelsGroup:any = {};
  labelsArr : any[];
  
  resultsLabel: string;
  resultsLinkLabel: string;
  projindicatorlabel: string;
  intermediateindicatorlabel: string;
  indicatorlabel: string;
  baselinelabel: string;
  currentlabel: string;
  targetlabel: string;
  valuelabel: string;
  datelabel: string;
  commentlabel: string;

  isCollapsePD: boolean; 
  fadeInOutPD: string; 
  showMoreOrLessIconPD: string; 
  isCollapseIO: boolean; 
  fadeInOutIO: string; 
  showMoreOrLessIconIO: string; 
  isResults: boolean = false;
  resultsErrorMessage: string;

 constructor(private element: ElementRef,private http:HttpClient,private service:CommonService) {
   this.getScreenSize();
   // this.isCollapsePD = this.isCollapseIO = true;
 // this.fadeInOutPD = this.fadeInOutIO = 'load';
   // this.showMoreOrLessIconPD = this.isCollapsePD ? 'fa fa-angle-down' : 'fa fa-angle-up';
   // this.showMoreOrLessIconIO = this.isCollapseIO ? 'fa fa-angle-down' : 'fa fa-angle-up';
 }  
 ngOnInit(){
 
   let rowsCount = '20';		
   this.labelsGroup={
           en : {
     'resultsLabel' : 'Results Framework',
     'resultsLinkLabel' : 'Latest Implementation Status and Results Report',
     'projindicatorlabel' : 'PROJECT DEVELOPMENT OBJECTIVE INDICATORS',
     'intermediateindicatorlabel' : 'INTERMEDIATE RESULTS INDICATORS',		
           'indicatorlabel' : 'INDICATOR',	
           'baselinelabel' : 'BASELINE',		
           'currentlabel' : 'CURRENT',		
           'targetlabel' : 'TARGET',		
     'valuelabel' : 'Value',	
           'datelabel' : 'Date',		
     'commentlabel' : 'Comment',
     'resultsErrorMessage' : 'No data available.',
     },
     es : {
       'resultsLabel' : 'Marco de resultados',
       'resultsLinkLabel' : 'Último informe sobre el estado de la ejecución y los resultados',
       'projindicatorlabel' : 'INDICADORES DE OBJETIVOS DE DESARROLLO DE PROYECTOS',
       'intermediateindicatorlabel' : 'INDICADORES DE RESULTADOS INTERMEDIOS',		
       'indicatorlabel' : 'INDICATOR',	
       'baselinelabel' : 'LÍNEA DE REFERENCIA',		
       'currentlabel' : 'EN CURSO',		
       'targetlabel' : 'OBJETIVO',		
       'valuelabel' : 'Valor',	
       'datelabel' : 'Fecha',		
       'commentlabel' : 'Comentar',	
       'resultsErrorMessage' : 'No hay datos disponibles.',	
     },
     fr : {
       'resultsLabel' : 'Cadre de résultats',
       'resultsLinkLabel' : 'Dernier Rapport sur l’état d’avancement et les résultats des projets',
       'projindicatorlabel' : 'INDICATEURS DES OBJECTIFS DE DÉVELOPPEMENT DU PROJET',
       'intermediateindicatorlabel' : 'INDICATEURS DE RÉSULTATS INTERMÉDIAIRES',		
       'indicatorlabel' : 'INDICATEUR',	
       'baselinelabel' : 'NIVEAU DE RÉFÉRENCE',		
       'currentlabel' : '	EN COURS ',		
       'targetlabel' : 'OBJECTIF',		
       'valuelabel' : 'Valeur',	
       'datelabel' : 'Date',		
       'commentlabel' : 'Observation',	
       'resultsErrorMessage' : 'Pas de données disponibles.',		
     },
     pt : {
       'resultsLabel' : 'Estrutura de Resultados',
       'resultsLinkLabel' : 'Situação da última implementação e relatório dos resultados',
       'projindicatorlabel' : 'INDICADORES DO OBJETIVO DE DESENVOLVIMENTO DO PROJETO',
       'intermediateindicatorlabel' : 'INDICADORES DE RESULTADOS INTERMEDIÁRIOS',		
       'indicatorlabel' : 'INDICADOR',	
       'baselinelabel' : 'LINHA DE REFERÊNCIA',		
       'currentlabel' : 'ATUAL',		
       'targetlabel' : 'ALVO',		
       'valuelabel' : 'Valor',	
       'datelabel' : 'Data',		
       'commentlabel' : 'Comentário',	
       'resultsErrorMessage' : 'Não há dados disponíveis',	
     },
     ru : {
       'resultsLabel' : 'Механизм учета результатов',
       'resultsLinkLabel' : 'Последние данные о ходе реализации и результатах проекта',
       'projindicatorlabel' : 'ПОКАЗАТЕЛИ ЦЕЛЕВЫХ РЕЗУЛЬТАТОВ ПРОЕКТА В ОБЛАСТИ РАЗВИТИЯ',
       'intermediateindicatorlabel' : 'ПОКАЗАТЕЛИ ПРОМЕЖУТОЧНЫХ РЕЗУЛЬТАТОВ',		
       'indicatorlabel' : 'ПОКАЗАТЕЛЬ',	
       'baselinelabel' : 'ИСХОДНЫЕ ДАННЫЕ',		
       'currentlabel' : 'ТЕКУЩИЙ',		
       'targetlabel' : 'ЦЕЛЕВОЙ',		
       'valuelabel' : 'Стоимость',	
       'datelabel' : 'Дата',		
       'commentlabel' : 'Комментарии',
       'resultsErrorMessage' : 'Нет данных.',			
     },
     ar : {
       'resultsLabel' : 'إطار النتائج',
       'resultsLinkLabel' : 'أحدث تقرير عن وضع التنفيذ والنتائج',
       'projindicatorlabel' : 'مؤشرات الأهداف التنموية للمشروع',
       'intermediateindicatorlabel' : 'مؤشرات النتائج المرحلية',		
       'indicatorlabel' : 'المؤشر',	
       'baselinelabel' : 'خط الأساس',		
       'currentlabel' : 'الحالي',		
       'targetlabel' : 'المستهدف',		
       'valuelabel' : 'القيمة',	
       'datelabel' : 'التاريخ',		
       'commentlabel' : 'تعليق',	
       'resultsErrorMessage' : 'لا تتوفر بيانات.',		
     },
     zh : {
       'resultsLabel' : '成果框架',
       'resultsLinkLabel' : '最新实施进度与成果报告',
       'projindicatorlabel' : '项目发展目标指标',
       'intermediateindicatorlabel' : '中期成果指标',		
       'indicatorlabel' : '指标',	
       'baselinelabel' : '基线',		
       'currentlabel' : '目前',		
       'targetlabel' : '目标',		
       'valuelabel' : '价值',	
       'datelabel' : '日期',		
       'commentlabel' : '评论',	
       'resultsErrorMessage' : '暂无数据',		
     }
   }

 }
 ngOnChanges() {
  // this.http.post(this.apiResponse, '').subscribe((apiResponse:any) => {  
         
  //   if (apiResponse.projects.hasOwnProperty(this.projectCode)) {  

   let parseString = require('xml2js').parseString;	
   let finalArr = [];
   let indicatorField = [];
   let indicatorXML = [];
   let indicatorjson = "";
   let labelsArr = [];
       
   
   //this.apiConnectionService.getAPIResponse("./assets/data.json").subscribe((response)=> {
    this.service.changeSummaryResults.subscribe((apiResponse:any) => {
      
      if (apiResponse) {
    
     //for json data
  
     this.isResponse = true;
     this.resultsLabel = this.labelsGroup[this.locale].resultsLabel;
     this.projindicatorlabel = this.labelsGroup[this.locale].projindicatorlabel;
     this.intermediateindicatorlabel = this.labelsGroup[this.locale].intermediateindicatorlabel;
     this.indicatorlabel = this.labelsGroup[this.locale].indicatorlabel;
     this.baselinelabel = this.labelsGroup[this.locale].baselinelabel;
     this.currentlabel = this.labelsGroup[this.locale].currentlabel;
     this.targetlabel = this.labelsGroup[this.locale].targetlabel;
     this.valuelabel = this.labelsGroup[this.locale].valuelabel;
     this.datelabel = this.labelsGroup[this.locale].datelabel;
     this.commentlabel = this.labelsGroup[this.locale].commentlabel;
     this.resultsErrorMessage = this.labelsGroup[this.locale].resultsErrorMessage;
   
     indicatorXML = apiResponse.projects[this.projectCode].indicatormappingdata;

     if (indicatorXML != undefined) {
       this.isResults = true;
       
       parseString(indicatorXML, function (err, result) {				
         
           indicatorjson = JSON.stringify(result);
           indicatorField = JSON.parse(JSON.stringify(result)).Results.Indicators;
           
   
           });
           
         
         for (var indicatorParIndex in indicatorField) {
         
           //console.log(indicatorField[indicatorParIndex]);
           let indicatorPar = [];
           let finalArr = [];
           indicatorPar = indicatorField[indicatorParIndex];
           //console.log(indicatorPar);
           if(indicatorPar["ParentIndicator"] !== undefined){
             let parentIndicatorVar = [];
             parentIndicatorVar = indicatorPar["ParentIndicator"];
             //console.log(parentIndicatorVar);
             
             var pindex = 0,ioIndex= 0, index =0;
             for (var indicatorVarIndex in parentIndicatorVar) {
               
               let parentIndicator = parentIndicatorVar[indicatorVarIndex];
               let targetArr = [];
               let baselineArr = [];						
               let currentArr = [];
               let indicatorName = "",indicatorType = "";
               //console.log(parentIndicator);
           
               for (var indicatorIndex in parentIndicator) {
                 
                 let indicatorArr = [];
                 indicatorArr = parentIndicator[indicatorIndex];
   
                 //parent indicator details 
                 if(indicatorArr["IndicatorName"] !== undefined)
                 {
                    indicatorName = indicatorArr['IndicatorName'];
                 }
                 if(indicatorArr["IndicatorType"] !== undefined)
                 {
                   indicatorType = indicatorArr['IndicatorType'];
                 }
                 
                 if(indicatorIndex === "ParentTransaction")
                 {
                   
                   indicatorArr.forEach((item,index) => {
                     if(item.ValueType[0] === 'BS')
                     {
                       var cindex = item.SortOrder[0].indexOf("BS");
                       if(cindex === 0)
                       {
                       var sortOrder = +item.SortOrder[0].replace("BS", "");
                       if(item.hasOwnProperty('VALUE') && item.hasOwnProperty('ValueDate')) 
                       {
                       baselineArr.push({"sortOrder":sortOrder,"VALUE":item.VALUE[0],"Date":DateFormatPipe.prototype.transform(item.ValueDate[0],this.locale),"Comments":item.ValueComments[0]});
                       }
                       }
                     }
                     if(item.ValueType[0] === 'PG')
                     {
                       var cindex = item.SortOrder[0].indexOf("PG");
                       if(cindex === 0)
                       {
                       var sortOrder = +item.SortOrder[0].replace("PG", "");
                       if(item.hasOwnProperty('VALUE') && item.hasOwnProperty('ValueDate')) 
                       {
                        currentArr.push({"sortOrder":sortOrder,"VALUE":item.VALUE[0],"Date":DateFormatPipe.prototype.transform(item.ValueDate[0],this.locale),"Comments":item.ValueComments[0]});																			
                       
                       }
                        }
                     }
                     if(item.ValueType[0] === 'TG')
                     {			
                       var cindex = item.SortOrder[0].indexOf("TG");
                       if(cindex === 0)
                       {						
                       var sortOrder = +item.SortOrder[0].replace("TG", "");
                       if(item.hasOwnProperty('VALUE') && item.hasOwnProperty('ValueDate')) 
                       {
                         
                       targetArr.push({"sortOrder":sortOrder,"VALUE":item.VALUE[0],"Date": DateFormatPipe.prototype.transform(item.ValueDate[0],this.locale),"Comments":item.ValueComments[0]});										
                       }
                        }
                     } 
   
                   });
   
                   baselineArr = this.getMaxValueArr(baselineArr);
                   currentArr = this.getMaxValueArr(currentArr);
                   targetArr = this.getMaxValueArr(targetArr);
                   
                 
                             
                 }						
                 
                 
                 //parent indicator details end
   
               
   
                 //child indicator start
                 let finalChildArr = [];
                 if(indicatorIndex === "ChildIndicator"){
                 if(parentIndicator["ChildIndicator"] !== undefined){
                   let childIndicatorVar = [];
                   childIndicatorVar = parentIndicator["ChildIndicator"];
                   //console.log("childIndicator:::");
                   //console.log(childIndicatorVar);
                   
                   for (var childindicatorVarIndex in childIndicatorVar) {
                     let childIndicator = childIndicatorVar[childindicatorVarIndex];
                     let targetChildArr = [];
                     let baselineChildArr = [];						
                     let currentChildArr = [];
                     let childIndicatorName = "";
                     let childIndicatorType = "";
                     for (var indicatorIndex in childIndicator) {
                       
                       let indicatorArr = [];
                       indicatorArr = childIndicator[indicatorIndex];
                     if(indicatorArr["IndicatorName"] !== undefined)
                     {
                       childIndicatorName = indicatorArr['IndicatorName'];
                     }
                     if(indicatorArr["IndicatorType"] !== undefined)
                     {
                       childIndicatorType = indicatorArr['IndicatorType'];
                     }
                     if(indicatorIndex === "ChildTransaction")
                     {
                       
                       indicatorArr.forEach((item,index) => {
                         if(item.ValueType[0] === 'BS')
                         {
                           var cindex = item.SortOrder[0].indexOf("BS");
                           if(cindex === 0)
                           {	
                           var sortOrder = +item.SortOrder[0].replace("BS", "");
                           if(item.hasOwnProperty('VALUE') && item.hasOwnProperty('ValueDate')) 
                           {
                           baselineChildArr.push({"sortOrder":sortOrder,"VALUE":item.VALUE[0],"Date":DateFormatPipe.prototype.transform(item.ValueDate[0],this.locale),"Comments":item.ValueComments[0]});
                           }
                           }
                         }
                         if(item.ValueType[0] === 'PG')
                         {
                           var cindex = item.SortOrder[0].indexOf("PG");
                           if(cindex === 0)
                           {	
                           var sortOrder = +item.SortOrder[0].replace("PG", "");
                           if(item.hasOwnProperty('VALUE') && item.hasOwnProperty('ValueDate')) 
                           {
                           currentChildArr.push({"sortOrder":sortOrder,"VALUE":item.VALUE[0],"Date":DateFormatPipe.prototype.transform(item.ValueDate[0],this.locale),"Comments":item.ValueComments[0]});
                           }
                           }
                         }
                         if(item.ValueType[0] === 'TG')
                         {	
                           var cindex = item.SortOrder[0].indexOf("TG");
                           if(cindex === 0)
                           {										
                           var sortOrder = +item.SortOrder[0].replace("TG", "");
                           if(item.hasOwnProperty('VALUE') && item.hasOwnProperty('ValueDate'))
                           {
                             
                           targetChildArr.push({"sortOrder":sortOrder,"VALUE":item.VALUE[0],"Date":DateFormatPipe.prototype.transform(item.ValueDate[0],this.locale),"Comments":item.ValueComments[0]});										
                           }
                            }
                         } 
       
                       });
       
                       baselineChildArr = this.getMaxValueArr(baselineChildArr);
                       currentChildArr = this.getMaxValueArr(currentChildArr);
                       targetChildArr = this.getMaxValueArr(targetChildArr);
                       
                     
                                 
                     }						
                     
                     
                               
                     
                     
                   }
                   
                   finalChildArr.push({
                     ["c_indicatorName"]: childIndicatorName,
                     ["c_indicatorType"]: childIndicatorType, 
                     ["c_baselineArr"]: baselineChildArr,
                     ["c_currentArr"]: currentChildArr,
                     ["c_targetArr"]: targetChildArr});
                   
                   }
                   
                 //console.log("finalChildArr");
                 //console.log(finalChildArr);	
                 //console.log(1);
               if(indicatorType == "PD")
                 {
                   index = pindex; 
                   pindex ++;
                   
                 
                 }
                 if(indicatorType == "IO")
                 {
                    index = ioIndex;
                    ioIndex++;
                   
                   
                 }
               
                 
   
                 finalArr.push({
                   
                   ["parentIndicatorName"]: indicatorName,
                   ["parentIndicatorIndex"]: index, 
                   ["parentIndicatorType"]: indicatorType, 
                   ["baselineArr"]: baselineArr,
                   ["currentArr"]: currentArr,
                   ["targetArr"]: targetArr,
                   ["childIndicatorArr"]:finalChildArr});
                   
                 }
               
                 
               } 
               if(parentIndicator["ChildIndicator"] === undefined && indicatorIndex === "ParentTransaction"){
                 if(indicatorType == "PD")
                 {
                   index = pindex; 
                   pindex ++;
                   
                 
                 }
                 if(indicatorType == "IO")
                 {
                    index = ioIndex;
                    ioIndex++;
                   
                 
                 }
               
                 
               
                 finalArr.push({
                   ["parentIndicatorName"]: indicatorName, 
                   ["parentIndicatorIndex"]: index, 
                   ["parentIndicatorType"]: indicatorType,
                   ["baselineArr"]: baselineArr,
                   ["currentArr"]: currentArr,
                   ["targetArr"]: targetArr,
                   ["childIndicatorArr"]:finalChildArr});
               }
             
               //child indicator end
                 
                 
               
                   
               
               //finalArr.push({"parentIndicatorName":indicatorName},{"baselineArr":baselineArr},{"currentArr":currentArr},{"targetArr":targetArr});	
               
                
               }
              
              
             }
           
             this.finalArr = finalArr;
             
           
             
   
           
             
           }
           
           }
           //for json data end
     }
     
     }
        
  //   }
   });
     
 }

   @HostListener('window:resize', ['$event'])
 getScreenSize(event?) {
   if (window.innerWidth >= 320 && window.innerWidth <= 768) {
     this.isCollapsePD = this.isCollapseIO = true;
     this.fadeInOutPD = this.fadeInOutIO = 'load';		
   } else {
     this.isCollapsePD = this.isCollapseIO = false;
     this.fadeInOutPD = this.fadeInOutIO = 'out';	
   }
   this.showMoreOrLessIconPD = this.isCollapsePD ? 'fa fa-angle-down' : 'fa fa-angle-up';
   this.showMoreOrLessIconIO = this.isCollapseIO ? 'fa fa-angle-down' : 'fa fa-angle-up';
 }

 getMaxValueArr(inputArr)
 {
   var res = Math.max.apply(Math,inputArr.map(function(o){
     return o.sortOrder;
   }));
   var resarr = inputArr.find(function(o){ return o.sortOrder == res; });
   //console.log("inside max function");
   //console.log(resarr);
   return resarr;
 }
 onLoadMore(collapse, type) { 
   if (type == 'PD') {
   this.isCollapsePD = collapse;
   this.fadeInOutPD = this.isCollapsePD ? 'in' : 'out';
   this.showMoreOrLessIconPD = this.isCollapsePD ? 'fa fa-angle-down' : 'fa fa-angle-up';        
   } else if (type == 'IO') {
   this.isCollapseIO = collapse;
   this.fadeInOutIO = this.isCollapseIO ? 'in' : 'out';
   this.showMoreOrLessIconIO = this.isCollapseIO ? 'fa fa-angle-down' : 'fa fa-angle-up';   
   }    
}


 
 
}