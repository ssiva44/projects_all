import { Component, OnInit, Input, OnChanges, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import {CommonService} from '../../common.service';
@Component({
  selector: 'ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css'],
  animations: [
    trigger('fadeInOut', [
    state('load', style({ height: "0px", display: "none" })),
    state('in', style({ height: "0px", display: "none", opacity: 0.1 })),
    state('out', style({ height: "*", display: "block", opacity: 1 })),
    transition("in <=> out", animate(400)),			
    transition("out <=> load", animate(400))			
  ])		
  ] 
})
export class RatingsComponent implements OnInit,OnChanges {
  @Input() apiResponse: any;
  @Input() projectCode: string;
  @Input() locale: string;
 
  implementingRatingsLabel:any;
  completionRatingsLabel:any;
  independantEvaluationRatingsLabel:any;
  
  ratingsErrorMessage:any;
  
  labelsGroup:any = {}; 
  
  outcomes:string;
  outcome_rating:string;
  risk_to_development_outcome:string;
  bank_performance:string;
  borrower_performance:string;
  government_performance:string;
  implementing_agency:string;
  icrquality:string;
  mequality:string;
  prev_rating:string;
  curr_rating:string;
  indicator:string;
  icr_report:string;
  icr_review:string;
  ppa_report:string;
  na_text:string;
  
  
  IRTable: boolean;
  CRTable: boolean;
  IERTable: boolean;
  
  statusdate: string;
  laststatusdate: string;	 
  performance_templatename_first_val: string;
  performance_templatename_second_val: string;	 
  performance_prevrating_first_val: string;
  performance_prevrating_second_val: string;	 
  performance_currrating_first_val: string;
  performance_currrating_second_val: string;	 
  catname:string;	 
  overall_prevrating: string;
  overall_currentrating: string;
  
  icrdate:string;
  outratingind:string;
  completion_riskdo:string;
  overallrating:string;
  borroverall:string;
  borrgovt:string;
  borrimplegency:string;

  evaldate_first_val:string;
  outcome_first_val:string;
  evaluation_riskdo_first_val:string;
  overallbankperf_first_val:string;
  overallborrowperf_first_val:string;
  borrowcompliance_first_val:string;
  borrowimplementation_first_val:string;
  icrquality_first_val:string;
  mequality_first_val:string;
  
  evaldate_second_val:string;
  outcome_second_val:string;
  evaluation_riskdo_second_val:string;
  overallbankperf_second_val:string;
  overallborrowperf_second_val:string;
  borrowcompliance_second_val:string;
  borrowimplementation_second_val:string;
  icrquality_second_val:string;
  mequality_second_val:string;
  
  totalRecords: any;
  
  isCollapse: boolean; 
  showMoreOrLessIcon: string;
  fadeInOut: string;            
  dataFormat: string = 'MM-dd-yyyy';
  constructor(private http:HttpClient,private service:CommonService) { }

  ngOnInit(){ 	
    this.getScreenSize();
    
    this.labelsGroup={
        en : {
        'outcomes' : 'Outcomes',		
        'outcome_rating' : 'Outcome Rating',	
        'risk_to_development_outcome' : 'Risk to Development Outcome',		
        'bank_performance' : 'Bank Performance',		
        'borrower_performance' : 'Borrower Performance',		
        'government_performance' : 'Government Performance',		
        'implementing_agency' : 'Implementing Agency',		
        'icrquality' : 'ICR Quality',		
        'mequality' : 'M&E Quality',		
        'prev_rating' : 'PREVIOUS RATINGS',	
        'curr_rating' : 'CURRENT RATINGS',	
        'indicator' : 'INDICATOR',	
        'icr_report' : 'IMPLEMENTATION COMPLETION & RESULTS REPORT',	
        'icr_review' : 'ICR REVIEW',	
        'ppa_report' : 'PROJECT PERFORMANCE ASSESSMENT REPORT',	
        'na_text' : 'N/A',
        'implementingRatingsLabel' : 'IMPLEMENTATION RATINGS',	
        'completionRatingsLabel' : 'COMPLETION RATINGS',	
        'independantEvaluationRatingsLabel' : 'INDEPENDENT EVALUATION RATINGS',	
        'ratingsErrorMessage' : 'No data available.',	
        },
        es : {
        'outcomes' : 'Resultados',		
        'outcome_rating' : 'Calificación de los resultados',	
        'risk_to_development_outcome' : 'Riesgo para los resultados de desarrollo',		
        'bank_performance' : 'Desempeño del Banco',		
        'borrower_performance' : 'Desempeño del prestatario',		
        'government_performance' : 'Desempeño del Gobierno',		
        'implementing_agency' : 'Organismo Ejecutor',		
        'icrquality' : 'Calidad del IFE',		
        'mequality' : 'Calidad de SyE',		
        'prev_rating' : 'CALIFICACIONES PREVIAS',	
        'curr_rating' : 'CALIFICACIONES ACTUALES',	
        'indicator' : 'INDICADOR',	
        'icr_report' : 'INFORME DE LA TERMINACIÓN DE LA EJECUCIÓN Y DE RESULTADOS',	
        'icr_review' : 'REVISIÓN DEL ICR',	
        'ppa_report' : 'INFORME DE LA EVALUACIÓN DEL DESEMPEÑO DEL PROYECTO',	
        'na_text' : 'No Disponible',
        'implementingRatingsLabel' : 'CALIFICACIONES DE LA EJECUCIÓN',	
        'completionRatingsLabel' : 'CALIFICACIONES DE LA TERMINACIÓN',	
        'independantEvaluationRatingsLabel' : 'CALIFICACIONES DE EVALUACIONES INDEPENDIENTES',	
        'ratingsErrorMessage' : 'No hay datos disponibles.',	
        },
        fr : {
        'outcomes' : 'Résultats',		
        'outcome_rating' : 'Évaluation des résultats',	
        'risk_to_development_outcome' : 'Risques pour les résultats de développement',		
        'bank_performance' : 'Performance de la Banque',		
        'borrower_performance' : 'Performance de l'+"'"+'emprunteur',		
        'government_performance' : 'Performance de l’État',		
        'implementing_agency' : 'Organisme d'+"'"+'exécution',		
        'icrquality' : 'Qualité des RFE',		
        'mequality' : 'Qualité du suivi-évaluation',		
        'prev_rating' : 'NOTATIONS PRÉCÉDENTES',	
        'curr_rating' : 'NOTATIONS ACTUELLES',	
        'indicator' : 'INDICATEUR',	
        'icr_report' : 'BILAN DE FIN D’EXÉCUTION ET DE RÉSULTATS',	
        'icr_review' : 'EXAMEN RFE',	
        'ppa_report' : 'RAPPORT D’ÉVALUATION RÉTROSPECTIVE DE PROJET',	
        'na_text' : 'N/D',
        'implementingRatingsLabel' : 'EXÉCUTION DU PROJET',	
        'completionRatingsLabel' : 'FIN D’EXÉCUTION DU PROJET',	
        'independantEvaluationRatingsLabel' : 'NOTATION DE L’ÉVALUATION INDÉPENDANTE',	
        'ratingsErrorMessage' : 'Pas de données disponibles.',	
        },
        ar : {
        'outcomes' : 'النتائج',		
        'outcome_rating' : 'تقدير النواتج',	
        'risk_to_development_outcome' : 'مخاطر النواتج الإنمائية',		
        'bank_performance' : 'أداء البنك',		
        'borrower_performance' : 'استعرا�� الأداء',		
        'government_performance' : 'أداء الحكومة',		
        'implementing_agency' : 'الهيئة المنفذة',		
        'icrquality' : 'جودة تقرير إنجاز التنفيذ',		
        'mequality' : 'جودة الرصد والتقييم',		
        'prev_rating' : 'التقديرات السابقة',	
        'curr_rating' : 'الت��نيفات الحالية',	
        'indicator' : 'المؤشر',	
        'icr_report' : 'تقرير إنجاز التنفيذ والنتائج',	
        'icr_review' : 'مراجعة تقارير إنجاز التنفيذ',	
        'ppa_report' : 'تقرير تقييم أداء المشروع',	
        'na_text' : 'غير متاح',
        'implementingRatingsLabel' : 'تقديرات التنفيذ',	
        'completionRatingsLabel' : 'تقديرات الإنجاز',	
        'independantEvaluationRatingsLabel' : 'تقديرات التقييم المستقل',	
        'ratingsErrorMessage' : 'لا تتوفر بيانات.',	
        },
        zh : {
        'outcomes' : '成果',		
        'outcome_rating' : '成果评级',	
        'risk_to_development_outcome' : '对发展成果构成的风险',		
        'bank_performance' : '世行绩效',		
        'borrower_performance' : '借款人绩效',		
        'government_performance' : '政府绩效',		
        'implementing_agency' : '执行机构',		
        'icrquality' : '项目完工报告质量',		
        'mequality' : '���测与评估质量',		
        'prev_rating' : '之前评级',	
        'curr_rating' : '当前评级',	
        'indicator' : '指标',	
        'icr_report' : '项目完工与成果报告',	
        'icr_review' : '项目完工报告检查',	
        'ppa_report' : '项目绩效评估报告',	
        'na_text' : '暂无数据',
        'implementingRatingsLabel' : '实施评级',	
        'completionRatingsLabel' : '完成评级',	
        'independantEvaluationRatingsLabel' : '独立评估评级',	
        'ratingsErrorMessage' : '暂无数据',	
        },
        ru : {
        'outcomes' : 'Итоги',		
        'outcome_rating' : 'Рейтинг итогов',	
        'risk_to_development_outcome' : 'Риск недостижения запланированных итоговых результатов в области развития',		
        'bank_performance' : 'Результаты деятельности Банка',		
        'borrower_performance' : 'Результаты деятельности заемщика',		
        'government_performance' : 'Результаты деятельности правительства',		
        'implementing_agency' : 'Учреждение-исполнитель',		
        'icrquality' : 'Качество, пригодное для интеллектуального распознавания символов',		
        'mequality' : 'Качество, соответствующее критериям системы мониторинга и оценки',		
        'prev_rating' : 'ПРЕДЫДУЩИЕ РЕЙТИНГИ',	
        'curr_rating' : 'ТЕКУЩИЙ РЕЙТИНГ',	
        'indicator' : 'ПОКАЗАТЕЛЬ',	
        'icr_report' : 'ОТЧЕТ О РЕЗУЛЬТАТХ ПО ЗАВЕРШЕНИИ РЕАЛИЗАЦИИ ПРОЕКТА',	
        'icr_review' : 'АНАЛИЗ ОТЧЕТОВ О РЕАЛИЗАЦИИ И РЕЗУЛЬТАТАХ ПРОЕКТОВ',	
        'ppa_report' : 'ОТЧЕТ ОБ ОЦЕНКЕ РЕЗУЛЬТАТОВ ПРОЕКТА',
        'na_text' : 'Н/п',
        'implementingRatingsLabel' : 'РЕЙТИНГ РЕАЛИЗАЦИИ',	
        'completionRatingsLabel' : 'РЕЙТИНГ ПО ЗАВЕРШЕНИИ РЕАЛИЗАЦИИ',	
        'independantEvaluationRatingsLabel' : 'РЕЙТИНГИ ПО ИТОГАМ НЕЗАВИСИМОЙ ОЦЕНКИ',	
        'ratingsErrorMessage' : 'Нет данных.',	
        },
        pt : {
        'outcomes' : 'Resultados',		
        'outcome_rating' : 'Classificação de resultados',	
        'risk_to_development_outcome' : 'Risco para o resultado de desenvolvimento',		
        'bank_performance' : 'Desempenho do Banco Mundial',		
        'borrower_performance' : 'Desempenho do mutuário',		
        'government_performance' : 'Desempenho do governo',		
        'implementing_agency' : 'Entidade Executora',		
        'icrquality' : 'Qualidade da RCI',		
        'mequality' : 'Qualidade M&E',		
        'prev_rating' : 'CLASSIFICAÇÕES ANTERIORES',	
        'curr_rating' : 'CLASSIFICAÇÕES ATUAIS',	
        'indicator' : 'INDICADOR',	
        'icr_report' : 'RELATÓRIO SOBRE A CONCLUSÃO E RESULTADOS DA IMPLEMENTAÇÃO',	
        'icr_review' : 'REVISÃO DA RCI',	
        'ppa_report' : 'RELATÓRIO SOBRE AVALIAÇÃO DO DESEMPENHO DO PROJETO',
        'na_text' : 'N/A',
        'implementingRatingsLabel' : 'CLASSIFICAÇÕES DA IMPLEMENTAÇÃO',	
        'completionRatingsLabel' : 'CLASSIFICAÇÕES DAS CONCLUSÕES',	
        'independantEvaluationRatingsLabel' : 'CLASSIFICAÇÕES DA AVALIAÇÃO INDEPENDENTE',	
        'ratingsErrorMessage' : 'Não há dados disponíveis',	
        }
    }        		

    this.outcomes = this.labelsGroup[this.locale].outcomes;
    this.outcome_rating = this.labelsGroup[this.locale].outcome_rating;
    this.risk_to_development_outcome = this.labelsGroup[this.locale].risk_to_development_outcome;
    this.bank_performance = this.labelsGroup[this.locale].bank_performance;
    this.borrower_performance = this.labelsGroup[this.locale].borrower_performance;
    this.government_performance = this.labelsGroup[this.locale].government_performance;
    this.implementing_agency = this.labelsGroup[this.locale].implementing_agency;
    this.icrquality = this.labelsGroup[this.locale].icrquality;
    this.mequality = this.labelsGroup[this.locale].mequality;
    this.prev_rating = this.labelsGroup[this.locale].prev_rating;
    this.curr_rating = this.labelsGroup[this.locale].curr_rating;
    this.indicator = this.labelsGroup[this.locale].indicator;
    this.icr_report = this.labelsGroup[this.locale].icr_report;
    this.icr_review = this.labelsGroup[this.locale].icr_review;
    this.ppa_report = this.labelsGroup[this.locale].ppa_report;
    this.na_text = this.labelsGroup[this.locale].na_text;
    this.implementingRatingsLabel = this.labelsGroup[this.locale].implementingRatingsLabel;
    this.completionRatingsLabel = this.labelsGroup[this.locale].completionRatingsLabel;
    this.independantEvaluationRatingsLabel = this.labelsGroup[this.locale].independantEvaluationRatingsLabel;
    this.ratingsErrorMessage = this.labelsGroup[this.locale].ratingsErrorMessage;	
}

ngOnChanges() {         
    let totalRecords = '0';
   // this.http.post(this.apiResponse, '').subscribe((apiResponse:any) => {  
    
     // if (this.apiResponse.projects.hasOwnProperty(this.projectCode)) {  
        this.service.changeSummaryResults.subscribe((apiResponse:any) => {
      
            if (apiResponse) {           
        totalRecords=apiResponse.total;
        this.totalRecords = totalRecords;

        if(this.totalRecords>'0'){                          
            this.IRTable =true;
            this.CRTable =true;
            this.IERTable =true;
            
            // this.isCollapse = true;
            // this.showMoreOrLessIcon = this.isCollapse ? 'fa fa-angle-down' : 'fa fa-angle-up';
            // this.fadeInOut = 'load';
            
            let projUrlResponse=apiResponse.projects;
            projUrlResponse=projUrlResponse[this.projectCode];
            
            if(projUrlResponse.performance_templatename !== undefined || projUrlResponse.catname !== undefined){
                this.statusdate=projUrlResponse.statusdate;
                this.laststatusdate=projUrlResponse.laststatusdate;										
            
            if(projUrlResponse.performance_templatename !== undefined){
                this.performance_templatename_first_val = projUrlResponse.performance_templatename[0];
                this.performance_templatename_second_val = projUrlResponse.performance_templatename[1];
            }			
            if(projUrlResponse.performance_prevrating !== undefined){
                this.performance_prevrating_first_val = this.nilCheck(projUrlResponse.performance_prevrating[0]);
                this.performance_prevrating_second_val = this.nilCheck(projUrlResponse.performance_prevrating[1]);
            }					
            if(projUrlResponse.performance_currrating !== undefined){
                this.performance_currrating_first_val = this.nilCheck(projUrlResponse.performance_currrating[0]);
                this.performance_currrating_second_val = this.nilCheck(projUrlResponse.performance_currrating[1]);
            }
            this.catname = this.nilCheck(projUrlResponse.catname);					
            this.overall_prevrating = this.nilCheck(projUrlResponse.overall_prevrating[0]);
            this.overall_currentrating = this.nilCheck(projUrlResponse.overall_currentrating[0]);
            }
            
            //No results secnario				
            if((projUrlResponse.performance_templatename === undefined || projUrlResponse.performance_templatename[0] === 'NIL') && projUrlResponse.catname === undefined){
            this.IRTable =false;
            }

            if (projUrlResponse.icrdate === undefined) {
                this.icrdate = '';
            }

            this.icrdate=(projUrlResponse.icrdate === undefined || projUrlResponse.icrdate === '' )? this.na_text : projUrlResponse.icrdate;
            this.outratingind=(projUrlResponse.outratingind === undefined || projUrlResponse.outratingind === '' )? this.na_text : projUrlResponse.outratingind;
            this.completion_riskdo=(projUrlResponse.completion_riskdo[0] === undefined || projUrlResponse.completion_riskdo[0] === '' || projUrlResponse.completion_riskdo[0] === 'NIL')? this.na_text : projUrlResponse.completion_riskdo;
            this.overallrating=(projUrlResponse.overallrating === undefined || projUrlResponse.overallrating === '' )? this.na_text : projUrlResponse.overallrating;
            this.borroverall=(projUrlResponse.borroverall === undefined || projUrlResponse.borroverall === '' )? this.na_text : projUrlResponse.borroverall;
            this.borrgovt=(projUrlResponse.borrgovt === undefined || projUrlResponse.borrgovt === '' )? this.na_text : projUrlResponse.borrgovt;
            this.borrimplegency=(projUrlResponse.borrimplegency === undefined || projUrlResponse.borrimplegency === '' )? this.na_text : projUrlResponse.borrimplegency;
            
            //No results secnario				
            if(projUrlResponse.outratingind === undefined && (projUrlResponse.completion_riskdo === undefined || projUrlResponse.completion_riskdo[0] === 'NIL') && projUrlResponse.overallrating === undefined && projUrlResponse.borroverall === undefined && projUrlResponse.borrgovt === undefined && projUrlResponse.borrimplegency === undefined){
            this.CRTable =false;
            }
            
            if(projUrlResponse.evaldate !== undefined){                    
                this.evaldate_first_val = projUrlResponse.evaldate[0];
                this.evaldate_second_val = projUrlResponse.evaldate[1];
            }					
            if(projUrlResponse.outcome !== undefined){
                let splits = this.splitArr(projUrlResponse.outcome);
                this.outcome_first_val = splits[0];
                this.outcome_second_val = splits[1];
            }					
            if(projUrlResponse.evaluation_riskdo !== undefined){
                let splits = this.splitArr(projUrlResponse.evaluation_riskdo);
                this.evaluation_riskdo_first_val = splits[0];
                this.evaluation_riskdo_second_val = splits[1];
            }					
            if(projUrlResponse.overallbankperf !== undefined){
                let splits = this.splitArr(projUrlResponse.overallbankperf);
                this.overallbankperf_first_val = splits[0];
                this.overallbankperf_second_val = splits[1];
            }					
            if(projUrlResponse.overallborrowperf !== undefined){
                let splits = this.splitArr(projUrlResponse.overallborrowperf);
                this.overallborrowperf_first_val = splits[0];
                this.overallborrowperf_second_val = splits[1];
            }					
            if(projUrlResponse.borrowcompliance !== undefined){
                let splits = this.splitArr(projUrlResponse.borrowcompliance);
                this.borrowcompliance_first_val = splits[0];
                this.borrowcompliance_second_val = splits[1];
            }					
            if(projUrlResponse.borrowimplementation !== undefined){
                let splits = this.splitArr(projUrlResponse.borrowimplementation);
                this.borrowimplementation_first_val = splits[0];
                this.borrowimplementation_second_val = splits[1];
            }					
            if(projUrlResponse.icrquality !== undefined){
                let splits = this.splitArr(projUrlResponse.icrquality);                    
                this.icrquality_first_val = splits[0];
                this.icrquality_second_val = splits[1];
            }					
            if(projUrlResponse.mequality !== undefined){
                let splits = this.splitArr(projUrlResponse.mequality);
                this.mequality_first_val = splits[0];
                this.mequality_second_val = splits[1];
            }	

            //No results secnario				
            if(projUrlResponse.outcome === undefined && (projUrlResponse.evaluation_riskdo === undefined || projUrlResponse.evaluation_riskdo[0] === 'NIL') && projUrlResponse.overallbankperf === undefined && projUrlResponse.overallborrowperf === undefined && projUrlResponse.borrowcompliance === undefined && projUrlResponse.borrowimplementation === undefined && projUrlResponse.icrquality === undefined && (projUrlResponse.mequality === undefined || projUrlResponse.mequality[0] === 'NIL')){
            this.IERTable =false;
            }					
            

        }
    }
//   }
 });
}    

onLoadMore(collapse) {        
    this.isCollapse = collapse;
    this.fadeInOut = this.isCollapse ? 'in' : 'out';
    this.showMoreOrLessIcon = this.isCollapse ? 'fa fa-angle-down' : 'fa fa-angle-up';        
}

@HostListener('window:resize', ['$event'])
getScreenSize(event?) {
    if (window.innerWidth >= 320 && window.innerWidth <= 768) {
        this.isCollapse = true;
        this.fadeInOut = 'load';
    } else {
        this.isCollapse = false;
        this.fadeInOut = 'out';
    }
    this.showMoreOrLessIcon = this.isCollapse ? 'fa fa-angle-down' : 'fa fa-angle-up';
}

nilCheck(value) {        
    return value == undefined || value == '' || value == 'NIL' || value == 'NA' ? this.na_text : value;
}

splitArr(value) {         
    if (value.indexOf(',') === -1) {
        let val = value == '' || value == 'NIL' || value == 'NA' ? this.na_text : value[0];
        return [val, this.na_text];  
    } else {
        let splitOne = value[0] == '' || value[0] == 'NIL' || value[0] == 'NA'? this.na_text : value[0];
        let splitTwo = value[1] == '' || value[1] == 'NIL' || value[1] == 'NA' ? this.na_text : value[1];
        return [splitOne, splitTwo];  
    }
}

}
