import { Component, OnInit,ElementRef } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import {CommonService} from '../../common.service';
import {Router} from '@angular/router'
import { Observable,forkJoin } from 'rxjs';
import 'rxjs';
@Component({
  selector: 'project-details',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading: boolean;
  imagePath: string; 
  projectCode: string;
  locale: string;
  projectDetailsApi: string;
  apiResponse: any;  
  apiResponse1: any; 
  mapPath: string;

  abstract: string;
  keyDetails: string;
  finances: string;
  ratings: string;
  results: string;
  summary: string;
  procurement: string;
  documents: string;
  news: string;
  photo: string;

  allLocales:any={};
  constructor(private element: ElementRef,private commonservice: CommonService,private http:HttpClient,private routing:Router) {

    commonservice.changeClosingallStatus.subscribe((val:any) => {
      if (val) { 

        this.imagePath = val.summary_imagePath;  
        this.projectCode = val.summary_projectCode;
        this.locale = val.summary_locale;
        this.projectDetailsApi = val.summary_projectApi;
        this.mapPath = val.summary_mapPath;
        //this.apiResponse = val.summary_url;
      
        if(this.projectCode)
        {
          this.mapPath = this.mapPath + "&pid="+this.projectCode; 
        }
      
         
      }

      this.allLocales = {
        en : {
            abstract: 'Abstract',
            keyDetails: 'Key Details',
            finances:'Finances',
            ratings:'Ratings',
            results:'Results',
            summary:'Summary',
            procurement:'Procurement',
            documents:'Documents',
            news:"News and media",
            photo:'Photo Gallery'
        },
        es : {
            abstract: 'Abstracto',
            keyDetails: 'Detalles clave' ,
            finances:'Finanzas',
            ratings:'Calificaciones',
            results:'resultados',
            summary:'RESUMEN',
            procurement:'OBTENCIÓN',
            documents:'DOCUMENTOS',
            news:"NOTICIAS Y MEDIOS",
            photo:'Galería de fotos'
        },
        fr : {
            abstract: 'Abstrait',
            keyDetails: 'Détails clés' ,
            finances:'Finances',
            ratings:'Évaluations',
            results:'Résultats',
            summary:'résumé',
            procurement:'approvisionnement',
            documents:'Documents',
            news:"Nouvelles et médias",
            photo:'Galerie de photos'
           
        },
        pt : {
            abstract: 'Abstrato',
            keyDetails: 'Detalhes principais' ,
            finances:'Finanças',
            ratings:'Classificações',
            results:'Resultados',
            summary:'resumo',
            procurement:'Procurement',
            documents:'Documentos',
            news:"Notícias e mídia",
            photo:'Galeria de fotos'
        },
        ru : {
            abstract: 'Абстрактные',
            keyDetails: 'Основные сведения' ,
            finances:'Финансы',
            ratings:'Рейтинги',
            results:'Результаты',
            summary:'резюме',
            procurement:'закупка',
            documents:'документы',
            news:"Новости и СМИ",
            photo:'Фотогалерея'
        },
        ar : {
            abstract: 'تفاصيل رئيسة',
            keyDetails: 'التفاصيل الرئيسية' ,
            finances:'المالية',
            ratings:'تصنيفات',
            results:'النتائج',
            summary:'ملخص',
            procurement:'تدبير',
            documents:'مستندات',
            news:"أخبار ووسائط إعلام",
            photo:'معرض الصور'
        },
        zh : {
            abstract: '概要',
            keyDetails: '關鍵細節' ,
            finances:'財政',
            ratings:'評級',
            results:'結果',
            summary:'概要',
            procurement:'採購',
            documents:'文件',
            news:"新聞和媒體",
            photo:'照片庫'
        }
    } 
  
    this.abstract = this.allLocales[this.locale].abstract;
    this.keyDetails = this.allLocales[this.locale].keyDetails;
    this.finances = this.allLocales[this.locale].finances;
    this.ratings = this.allLocales[this.locale].ratings;
    this.results = this.allLocales[this.locale].results;
    });

    this.loading = true;
    let url = this.projectDetailsApi + '&id=' + this.projectCode + '&apilang=' + this.locale;
    
    this.http.post(url, '').subscribe((apiResponse:any) => {  
      this.loading = false;
      
      if (apiResponse.projects.hasOwnProperty(this.projectCode)) {
        this.commonservice.updateSummaryResults(apiResponse);
        this.apiResponse = apiResponse; 
       // this.apiResponse1 = apiResponse;       
      }      
    });
//}, 100);
   
  }

  ngOnInit() {
  }
  scroll(id,event:any) {
    $('#wrap1 ul li a').removeClass('active');
   //  setTimeout(()=>{
   //   event.srcElement.classList.add("active");
   // },0)
   
     $('#summary_top').addClass('active');
   let el = document.getElementById(id);
    el.scrollIntoView({behavior:"smooth"});
    $('#'+id+'topmenu').addClass('active');
 }
}
