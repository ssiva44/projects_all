import { Component, OnInit,ElementRef } from '@angular/core';
import {CommonService} from '../../common.service';
import {Router,ActivatedRoute } from '@angular/router'
@Component({
  selector: 'documentsTab',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  imagePath: string;
  ishide:boolean=false;
	 projectsTableHeaders:any;
	 archivalTableHeaders: any;
	 
	 projectsTableHeadersGroup: any = {}; 
	 archivalTableHeadersGroup: any = {}; 
	 
	 locale: string;
	 
	 projectsApiUrl: string;
	 archivalApiUrl: string;	
	 
	 projectsLabel: string;
	 archivalLabel: string;
	 
	 projectsLabelGroup: any = {}; 	 
	 archivalLabelGroup: any = {};	 
	 
	 loadMoreLabel: string;
	 loadMoreLabelGroup: any = {}; 
	 
	 projectsErrorMessage: string; 
	 archivalErrorMessage: string; 
	 
	 projectsErrorMessageGroup: any = {}; 	 
	 archivalErrorMessageGroup: any = {};	 
	 
 	 downloadLabel: string;	 
	 downloadLabelGroup: any = {};
	 projectid: string; 
  tabType:string;
  document_routing:string;
  archive:boolean=true;
  projects:boolean=false;
   constructor(private element: ElementRef,private commonservice:CommonService,
    private route:Router,private activatedRoute:ActivatedRoute){
    commonservice.changeClosingallStatus.subscribe((val:any) => {
      
      if (val) {
        
        this.imagePath = val.document_imagePath;
        this.locale = val.document_locale;
        this.projectsApiUrl=val.document_projectsApiUrl;
        this.archivalApiUrl=val.document_archivalApiUrl;
        this.projectid=val.document_projectid;
        this.tabType=val.document_tabType;
        this.document_routing=val.document_routing;
        this.projectsTableHeadersGroup = { 
          'en' : 'DOCUMENT TITLE%%DATE%%REPORT NO.%%DOCUMENT TYPE',
          'es' : 'TÍTULO DEL DOCUMENTO%%FECHA%%INFORME NO.%%TIPO DE DOCUMENTO',
          'fr' : 'TITRE DU DOCUMENT%%DATE%%NO DE RAPPORT%%TYPE DE DOCUMENT',
          'ar' : 'مسمى الوثيقة%%التاريخ%%ت��رير رقم%%نوع الوثيقة',
          'zh' : '文件标题%% 日期%%报告编号%% 文件类别',
          'ru' : 'НАЗВАНИЕ ДОКУМЕНТА%%ДАТА%%ДОКЛАД  №%%Тип Документа',
          'pt' : 'TÍTULO DO DOCUMENTO%%DATA%%RELATÓRIO Nº%%TIPO DO DOCUMENTO',
        }
        
        this.archivalTableHeadersGroup = { 
          'en': 'FOLDER TITLE%%FOLDER NO.%%DATES%%DISCLOSURE STATUS',
                'es': 'TíTULO DE CARPETA%%FECHAS%%No. DE CARPETA%%ESTADO DE DIVULGACIÓN',
                'fr': 'TITRE DU DOSSIER%%N° DU DOSSIER%%DATES%%STATUT DE DIFFUSION',
                'ar': 'رقم المجلد%%عنوان المجلد%%التواريخ%%وضع الإفصاح',
                'zh': '文件夹名称%%文件夹号%%日期%%披露状态',
                'ru': 'Название папки%%Номер папки%%Даты%%уровень доступa к информации',
                'pt': 'TÍTULO DA PASTA%%PASTA Nº%%DATAS%%SITUAÇÃO DE DIVULGAÇÃO',
        }  
        
        this.projectsLabelGroup = {
          'en' : 'Project Documents',
          'es' : 'Documentos del Proyecto',
          'fr' : 'Documents de Projet',
          'ar' : 'وثائق المشروع',
          'zh' : '项目文件',
          'ru' : 'Документы по Проекту',
          'pt' : 'Documentos do projeto',
        }
        
        this.archivalLabelGroup = {
          'en' : 'Archival Records',
          'es' : 'Registros Archivísticos',
          'fr' : 'Documents d’archives',
          'ar' : 'سجلات الأرشيف',
          'zh' : '档案记录',
          'ru' : 'Архивные документы',
          'pt' : 'Documentos do Arquivo',
        }
        
        this.projectsErrorMessageGroup = {
          'en' : 'No data available.',
          'es' : 'No hay datos disponibles.',
          'fr' : 'Pas de données disponibles.',
          'ar' : 'لا تتوفر بيانات.',
          'zh' : '暂无数据',
          'ru' : 'Нет данных.',
          'pt' : 'Não há dados disponíveis',
        }
        
        this.archivalErrorMessageGroup = {
          'en' : 'No data available.',
          'es' : 'No hay datos disponibles.',
          'fr' : 'Pas de données disponibles.',
          'ar' : 'لا تتوفر بيانات.',
          'zh' : '暂无数据',
          'ru' : 'Нет данных.',
          'pt' : 'Não há dados disponíveis',
        }
        
        
        this.loadMoreLabelGroup = {
          'en' : 'LOAD MORE',
          'es' : 'LOAD MORE',
          'fr' : 'LOAD MORE',
          'ar' : 'LOAD MORE',
          'zh' : 'LOAD MORE',
          'ru' : 'LOAD MORE',
          'pt' : 'LOAD MORE',
        }
        
        this.downloadLabelGroup = {
          'en' : 'Download to Excel',
          'es' : 'Exportar datos a Excel',
          'fr' : 'Télécharger en Excel',
          'ar' : 'تنزيل إلى ملف Excel',
          'zh' : '下载到Excel表',
          'ru' : 'Загрузить в формате Excel',
          'pt' : 'Baixar para Excel',
    
        }
        this.projectsLabel = this.projectsLabelGroup.hasOwnProperty(this.locale) ? this.projectsLabelGroup[this.locale] : {}
        this.archivalLabel = this.archivalLabelGroup.hasOwnProperty(this.locale) ? this.archivalLabelGroup[this.locale] : {}
        this.loadMoreLabel = this.loadMoreLabelGroup.hasOwnProperty(this.locale) ? this.loadMoreLabelGroup[this.locale] : {}
        this.projectsErrorMessage = this.projectsErrorMessageGroup.hasOwnProperty(this.locale) ? this.projectsErrorMessageGroup[this.locale] : {}
        this.archivalErrorMessage = this.archivalErrorMessageGroup.hasOwnProperty(this.locale) ? this.archivalErrorMessageGroup[this.locale] : {}
        this.projectsTableHeaders = this.projectsTableHeadersGroup.hasOwnProperty(this.locale) ? this.projectsTableHeadersGroup[this.locale] : {}
        
        this.archivalTableHeaders = this.archivalTableHeadersGroup.hasOwnProperty(this.locale) ? this.archivalTableHeadersGroup[this.locale] : {}
        this.downloadLabel=this.downloadLabelGroup.hasOwnProperty(this.locale) ? this.downloadLabelGroup[this.locale] : {}
        
      }
    });
  }

  ngOnInit() {
    this.archive=false;
    this.projects=true;
  
    if(window.location.search!=""){
      let split:any=[];
       split=window.location.search.split('type=');
       
      if(split.length>1){
       let tab = split[1];
       this.tab("",tab);
      }
    }else{
      
      this.route.navigate([this.document_routing+'/'+this.projectid], { queryParams: { type: 'projects'  }});
    }
  }
  tab(event,txt){
    
    $(".nav li a").removeClass('menu-active');
    if(event!=""){
      event.target.classList.add('menu-active');
    }else{
      $('#'+txt).addClass('menu-active');
    }
    
    this.archive=false;
    this.projects=false;
    if(txt=="archival"){
      this.archive=true;
    }
    if(txt=="projects"){
      this.projects=true;
    }
    
    this.route.navigate([this.document_routing+'/'+this.projectid], { queryParams: { type: txt  }});
   
  }
}
