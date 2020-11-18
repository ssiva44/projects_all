import { Component,ElementRef,ViewChild } from '@angular/core';
import {CommonService} from './common.service';
import {Router,ActivatedRoute} from '@angular/router'
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { PlatformLocation,Location } from '@angular/common';
import { ProjectsListComponent } from './projectlist/projects-list/projects-list.component';
import { ProjectAppComponent } from './projectlistsummary/app/app.component';
@Component({
  selector: 'projectsall',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projects';
  summary_locale: string;
  allLocales:any={};
  loading: boolean;
  isPortugues:boolean=false;
  summary_imagePath: string;
  @ViewChild(ProjectsListComponent)
  private projlist: ProjectsListComponent;
  @ViewChild(ProjectAppComponent)
  private projlistsummary: ProjectAppComponent;

  txtSearch:string="";
  summary_projectApi: string;
  summary_procurementApi: string;   
  summary_lendingApi: string;
  summary_mapPath: string;
  summary_projectCode: string;
  summary_procurementsPath: string;
  summary_procurementSearchPath: string;
  summary_projectResponse: any;
  project_name:string="";
  summary_projectListPath: string;
  summary_procurementResponse: any;
  summary_lendingResponse: any;

  procurement_imagePath: string;
  procurement_locale: string;
  procurement_domain: string;
  procurement_projectId: string;
  procurement_noticesApiUrl: string;
  procurement_contractsApiUrl: string;
  procurement_planApiUrl: string;

  document_imagePath:string;
  document_locale:string;
  document_projectsApiUrl:string;
  document_archivalApiUrl:string;
  document_projectid:string;
  document_tabType:string;
isBack:boolean=false;
  newsmedia_imagePath:string;
newsmedia_projectCode:string;
newsmedia_languageCode:string;
newsmedia_url:string;
newsmedia_multimediaApi:string;
projectdetailssummary:boolean=false;
photo_imagePath:string;
photo_peopleImage:string;
photo_projects_photo_gallery_api:string;
photo_projectCode:string;
photo_languageCode:string;
photo_details_path:string;
photo_viewall_label:string;
photo_viewall_link:string;
list_summary_apiUrl :string;
    list_summary_buttonLink:string;
    list_summary_projectDetailsPath :string;
    list_summary_mapPath :string;
  list_summary_ctryCode :string;
    list_summary_sectorCode :string;
  list_summary_regionName:string;

summary_routing:string;
procurement_routing:string;
document_routing:string;
newsmedia_routing:string;
photogallery_routing:string;
summary_projectresponse:string;
projectlist_routing:string;
issummary:boolean=false;
isprojdetails:boolean=false;

list_project_list_api:string;
      list_project_details_page:string;
      list_excel_file:string;
      list_download_excel:string;

abstract: string;
  keyDetails: string;
  finances: string;
  ratings: string;
  projectlist:string;
  results: string;
  summary: string;
  procurement: string;
  documents: string;
  project:string;
  news: string;
  photo: string;
  search:string;
  projectlistsummary_routing:string;
  runmode:string;
  list_summary_routing:string;
  list_routing:string;
  domain_en:string;
  domain_es:string;
  domain_pt:string;
  domain_zh:string;
  domain_ar:string;
  domain_fr:string;
  domain_ru:string;
  constructor(private element: ElementRef,private commonservice:CommonService,
    private http:HttpClient,private routing:Router,private locations:Location,
    private location: PlatformLocation,private route:ActivatedRoute) { 
      debugger;  
   this.initial(routing,location,"first");
  }

  initial(routing,location,firstTxt){
    debugger;
    this.summary_imagePath = this.element.nativeElement.getAttribute('imagePath'); 
    this.summary_projectApi = this.element.nativeElement.getAttribute('summary-project-api');
    //this.summary_procurementApi = this.element.nativeElement.getAttribute('summary-procurement-api');
    this.summary_mapPath = this.element.nativeElement.getAttribute('summary-mapPath');
    this.summary_projectCode = this.element.nativeElement.getAttribute('projectCode');
    if(firstTxt=="first") {
    
      this.summary_locale = this.element.nativeElement.getAttribute('locale');
      this.list_summary_routing= this.element.nativeElement.getAttribute('list-summary-routing');
      this.list_routing= this.element.nativeElement.getAttribute('list-routing');
      this.summary_routing = this.element.nativeElement.getAttribute('summary-routing');  
      this.procurement_routing = this.element.nativeElement.getAttribute('procurement-routing');  
      this.document_routing = this.element.nativeElement.getAttribute('document-routing');  
      this.newsmedia_routing = this.element.nativeElement.getAttribute('newsmedia-routing');  
      this.photogallery_routing = this.element.nativeElement.getAttribute('photogallery-routing');

      
    }         
   
      
        if(routing.config!=undefined){
          routing.config.forEach((query:any) => {
    
            if(query.loadChildren!=undefined){
              if(query.loadChildren.indexOf('summary')!=-1){
                query.path = this.summary_routing;
              }
              if(query.loadChildren.indexOf('procurement')!=-1){
                query.path = this.procurement_routing;
              }
              if(query.loadChildren.indexOf('documents')!=-1){
                query.path = this.document_routing;
              }
              if(query.loadChildren.indexOf('newsmedia')!=-1){
                query.path = this.newsmedia_routing;
              }
              if(query.loadChildren.indexOf('photogallery')!=-1){
                query.path = this.photogallery_routing;
              }
              
              if(query.loadChildren.indexOf('projectlist')!=-1){
                query.path = this.list_routing;;
              }
              if(query.loadChildren.indexOf('projectlistsummary')!=-1){
                query.path = this.list_summary_routing;
              }
            }
            if(query.pathMatch!=undefined){
              if(query.pathMatch.indexOf('full')!=-1){
                query.redirectTo=this.list_summary_routing;
              }
            }
          });
        }
        routing.resetConfig(routing.config);
    this.runmode= this.element.nativeElement.getAttribute('runmode');
    this.domain_en= this.element.nativeElement.getAttribute('domain-en');
    this.domain_es= this.element.nativeElement.getAttribute('domain-es');
    this.domain_pt= this.element.nativeElement.getAttribute('domain-pt');
    this.domain_zh= this.element.nativeElement.getAttribute('domain-zh');
    this.domain_ar= this.element.nativeElement.getAttribute('domain-ar');
    this.domain_fr= this.element.nativeElement.getAttribute('domain-fr');
    this.domain_ru= this.element.nativeElement.getAttribute('domain-ru');
    //localStorage.setItem('locale', JSON.stringify({ locale: this.summary_locale}));
   
    //this.projectlist_routing=this.element.nativeElement.getAttribute('projectlist-routing');
    //this.projectlistsummary_routing=this.element.nativeElement.getAttribute('projectlistsummary-routing');
    // let langPath=[];
    // debugger
    // let path="";
    // let locale="";
    // if(window.location.pathname!=undefined && window.location.pathname.length>1){
    //   debugger
    //    langPath=this.getLangualge();
    //    if(langPath!=undefined){
    //     // path= langPath[0].path;
    //     // locale= langPath[0].locale;
    //     if(this.runmode=="author"){
    //       path = "content/wb-home/"+langPath[0].locale+langPath[0].path;
    //      }else{
    //       path=langPath[0].locale+langPath[0].path;;
    //      }
        
    //     if (window.location.pathname.indexOf('projects-summary') != -1) {
    //       this.list_summary_routing=locale+path;
    //     }else if (window.location.pathname.indexOf('projects-list') != -1) {
    //       this.list_routing=locale+path;
    //     }
    //    }
    // }
    

    this.allLocales = {
      en : {
          abstract: 'Abstract',
          keyDetails: 'Key Details',
          finances:'Finances',
          ratings:'Ratings',
          results:'Results',
          summary:'Summary',
          projectlist:'Project List',
          project:'Projects',
          procurement:'Procurement',
          documents:'Documents',
          news:"News and media",
          photo:'Photo Gallery',
          search:'Search..'
      },
      es : {
          abstract: 'Abstracto',
          keyDetails: 'Detalles clave' ,
          finances:'Finanzas',
          ratings:'Calificaciones',
          results:'resultados',
          summary:'RESUMEN',
          projectlist:'Proyecto Lista',
          project:'Proyecto',
          procurement:'OBTENCIÓN',
          documents:'DOCUMENTOS',
          news:"NOTICIAS Y MEDIOS",
          photo:'Galería de fotos',
          search:'Buscar..'
      },
      fr : {
          abstract: 'Abstrait',
          keyDetails: 'Détails clés' ,
          finances:'Finances',
          ratings:'Évaluations',
          results:'Résultats',
          summary:'résumé',
          projectlist:'Projet liste',
          project:'Projets',
          procurement:'approvisionnement',
          documents:'Documents',
          news:"Nouvelles et médias",
          photo:'Galerie de photos',
          search:'Entrez un mot-clé'
         
      },
      pt : {
          abstract: 'Abstrato',
          keyDetails: 'Detalhes principais' ,
          finances:'Finanças',
          ratings:'Classificações',
          results:'Resultados',
          summary:'resumo',
          projectlist:'Projeto Lista',
          project:'Projetos',
          procurement:'Procurement',
          documents:'Documentos',
          news:"Notícias e mídia",
          photo:'Galeria de fotos',
          search:'Digitar palavra-chave'
      },
      ru : {
          abstract: 'Абстрактные',
          keyDetails: 'Основные сведения' ,
          finances:'Финансы',
          ratings:'Рейтинги',
          results:'Результаты',
          summary:'резюме',
          projectlist:'Проекты Список',
          project:'Проекты',
          procurement:'закупка',
          documents:'документы',
          news:"Новости и СМИ",
          photo:'Фотогалерея',
          search:'Введите ключевое слово'
      },
      ar : {
          abstract: 'تفاصيل رئيسة',
          keyDetails: 'التفاصيل الرئيسية' ,
          finances:'المالية',
          ratings:'تصنيفات',
          results:'النتائج',
          summary:'ملخص',
          projectlist:'المشاريع قائمة',
          project:'المشاريع ',
          procurement:'تدبير',
          documents:'مستندات',
          news:"أخبار ووسائط إعلام",
          photo:'معرض الصور',
          search:'أدخل  كلمات رئيسية'
      },
      zh : {
          abstract: '摘要',
          keyDetails: '主要细节' ,
          finances:'财务',
          ratings:'評級',
          results:'成果',
          summary:'概要',
          projectlist:'項目 名單',
          project:'项目',
          procurement:'採購',
          documents:'文件',
          news:"新聞和媒體",
          photo:'照片庫',
          search:'输入关键词'
      }
  } 

  this.abstract = this.allLocales[this.summary_locale].abstract;
  this.keyDetails = this.allLocales[this.summary_locale].keyDetails;
  this.finances = this.allLocales[this.summary_locale].finances;
  this.ratings = this.allLocales[this.summary_locale].ratings;
  this.results = this.allLocales[this.summary_locale].results;
  this.summary = this.allLocales[this.summary_locale].summary;
  this.projectlist=this.allLocales[this.summary_locale].projectlist;
  this.procurement = this.allLocales[this.summary_locale].procurement;
  this.news = this.allLocales[this.summary_locale].news;
  this.documents = this.allLocales[this.summary_locale].documents;
  this.photo = this.allLocales[this.summary_locale].photo;
  this.search = this.allLocales[this.summary_locale].search;
  this.projectdetailssummary=false;
  this.project= this.allLocales[this.summary_locale].project;
  // if(window.location.pathname.indexOf(this.summary_routing)!=-1 || window.location.pathname.indexOf(this.procurement_routing)!=-1||
  // window.location.pathname.indexOf(this.document_routing)!=-1||window.location.pathname.indexOf(this.newsmedia_routing)!=-1
  // ||window.location.pathname.indexOf(this.photogallery_routing)!=-1){
  //   this.summary_projectCode=window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)
  // }
   let summarydetails="";
  // if(this.summary_projectCode!=undefined && this.summary_projectCode!=""){

  // }
 
    this.newsmedia_imagePath = this.element.nativeElement.getAttribute('imagePath'); 
    this.newsmedia_projectCode = this.element.nativeElement.getAttribute('projectCode');
    this.newsmedia_languageCode = this.element.nativeElement.getAttribute('locale');    
    this.newsmedia_url = this.element.nativeElement.getAttribute('newsmedia-news-media-api');
    this.newsmedia_multimediaApi = this.element.nativeElement.getAttribute('newsmedia-multimedia-api'); 
    let url = this.summary_projectApi + '&id=' + this.summary_projectCode + '&apilang=' + this.summary_locale;
          this.getProjectName(this.summary_projectCode);


    this.procurement_imagePath = this.element.nativeElement.getAttribute('imagePath');
		this.procurement_locale = this.element.nativeElement.getAttribute('locale');
		this.procurement_domain = this.element.nativeElement.getAttribute('procurement-domain');
    this.procurement_projectId = this.element.nativeElement.getAttribute('projectCode');
    this.procurement_noticesApiUrl=this.element.nativeElement.getAttribute('procurement-noticesApiUrl');
		this.procurement_contractsApiUrl=this.element.nativeElement.getAttribute('procurement-contractsApiUrl');
    this.procurement_planApiUrl=this.element.nativeElement.getAttribute('procurement-planApiUrl');
    
    this.document_imagePath = this.element.nativeElement.getAttribute('imagePath');
		this.document_locale = this.element.nativeElement.getAttribute('locale');
		this.document_projectsApiUrl=this.element.nativeElement.getAttribute('document-projectsApiUrl');
		this.document_archivalApiUrl=this.element.nativeElement.getAttribute('document-archivalApiUrl');
		this.document_projectid=this.element.nativeElement.getAttribute('projectCode');
    this.document_tabType=this.element.nativeElement.getAttribute('document-type');
    this.photo_imagePath = this.element.nativeElement.getAttribute('imagePath'); 
    this.photo_peopleImage = this.element.nativeElement.getAttribute('photo-peopleImage'); 
    this.photo_projectCode = this.element.nativeElement.getAttribute('projectCode');
    this.photo_languageCode = this.element.nativeElement.getAttribute('locale');    
    this.photo_projects_photo_gallery_api = this.element.nativeElement.getAttribute('photo-projects-photo-gallery-api');
    this.photo_details_path = this.element.nativeElement.getAttribute('photo-details-path');     
    this.photo_viewall_label = this.element.nativeElement.getAttribute('photo-viewall-label');     
    this.photo_viewall_link = this.element.nativeElement.getAttribute('photo-viewall-link'); 

    this.list_project_list_api=this.element.nativeElement.getAttribute('list-project-list-api'); 
    this.list_project_details_page=this.element.nativeElement.getAttribute('list-project-details-page'); 
    this.list_excel_file=this.element.nativeElement.getAttribute('list-excel-file'); 
    this.list_download_excel=this.element.nativeElement.getAttribute('list-download-excel'); 
    this.list_summary_apiUrl=this.element.nativeElement.getAttribute('list-summary-apiUrl'); 
    this.list_summary_buttonLink=this.element.nativeElement.getAttribute('list-summary-buttonLink'); 
    this.list_summary_projectDetailsPath=this.element.nativeElement.getAttribute('list-summary-projectDetailsPath'); 
    this.list_summary_mapPath=this.element.nativeElement.getAttribute('list-summary-mapPath'); 
    this.list_summary_ctryCode=this.element.nativeElement.getAttribute('list-summary-ctryCode'); 
    this.list_summary_sectorCode=this.element.nativeElement.getAttribute('list-summary-sectorCode'); 
    this.list_summary_regionName=this.element.nativeElement.getAttribute('list-summary-regionName'); 
   let qterm =this.getQterm();
    let objProject={
      summary_imagePath :this.summary_imagePath,
      summary_projectApi:this.summary_projectApi,
      summary_mapPath:this.summary_mapPath,
      summary_projectCode:this.summary_projectCode,
      summary_locale:this.summary_locale,
      summary_url:url,
      procurement_imagePath:this.procurement_imagePath,
      procurement_locale:this.summary_locale,
      procurement_domain:this.procurement_domain,
      procurement_projectId:this.procurement_projectId,
      procurement_noticesApiUrl:this.procurement_noticesApiUrl,
      procurement_contractsApiUrl:this.procurement_contractsApiUrl,
      procurement_planApiUrl:this.procurement_planApiUrl,
      document_imagePath:this.document_imagePath,
      document_locale:this.summary_locale,
      document_projectsApiUrl:this.document_projectsApiUrl,
      document_archivalApiUrl:this.document_archivalApiUrl,
      document_projectid:this.document_projectid,
      document_tabType:this.document_tabType,
      newsmedia_imagePath:this.newsmedia_imagePath,
      newsmedia_projectCode:this.newsmedia_projectCode,
      newsmedia_languageCode:this.newsmedia_languageCode,
      newsmedia_url:this.newsmedia_url,
      newsmedia_multimediaApi:this.newsmedia_multimediaApi,
      photo_imagePath :this.photo_imagePath,
   photo_peopleImage:this.photo_peopleImage,
    photo_projectCode:this.photo_projectCode,
    photo_languageCode:this.summary_locale,   
    photo_projects_photo_gallery_api:this.photo_projects_photo_gallery_api,
    photo_details_path:this.photo_details_path, 
    photo_viewall_label :this.photo_viewall_label,    
   photo_viewall_link :this.photo_viewall_link,
   list_project_list_api:this.list_project_list_api,
      list_project_details_page:this.list_project_details_page,
      list_excel_file:this.list_excel_file,
      list_download_excel:this.list_download_excel,
      list_summary_apiUrl:  this.list_summary_apiUrl,
      list_summary_buttonLink:this.list_summary_buttonLink,
      list_summary_projectDetailsPath:this.list_summary_projectDetailsPath ,
      list_summary_mapPath:this.list_summary_mapPath ,
      list_summary_ctryCode:this.list_summary_ctryCode, 
      list_summary_sectorCode:this.list_summary_sectorCode, 
      list_summary_regionName:this.list_summary_regionName,
      searchTerm:qterm,
   summary_routing:this.summary_routing,
   procurement_routing:this.procurement_routing,
   document_routing:this.document_routing,
   newsmedia_routing:this.newsmedia_routing,
   photogallery_routing:this.photogallery_routing,
   projectlist_routing:this.list_routing,
   projectlistsummary_routing:this.list_summary_routing//+listsummary
    }
    this.commonservice.closingStatusallUpdated(objProject);
    this.isBack=false;
   
  this.commonservice.changeIsSummary.subscribe((val:any) => {
    debugger;  
    if(val.isProj==true){
      objProject.summary_projectCode=val.value;
      objProject.photo_projectCode=val.value;
      objProject.newsmedia_projectCode=val.value;
      objProject.document_projectid=val.value;
      objProject.procurement_projectId=val.value;
      let summarydetail="";
      if(this.runmode=='author'){
        summarydetail = '.'+objProject.summary_projectCode+'.html';
      }else{
        summarydetail= '/'+objProject.summary_projectCode;
      }
      setTimeout(() => {
        this.getProjectName(val.value);
      }, 100);
      if(routing.config!=undefined){
        routing.config.forEach((query:any) => {
  
          if(query.loadChildren!=undefined){
            if(query.loadChildren.indexOf('summary')!=-1){
              query.path = this.summary_routing+summarydetail;
            }
            if(query.loadChildren.indexOf('procurement')!=-1){
              query.path = this.procurement_routing+summarydetail
            }
            if(query.loadChildren.indexOf('documents')!=-1){
              query.path = this.document_routing+summarydetail;
            }
            if(query.loadChildren.indexOf('newsmedia')!=-1){
              query.path = this.newsmedia_routing+summarydetail;
            }
            if(query.loadChildren.indexOf('photogallery')!=-1){
              query.path = this.photogallery_routing+summarydetail;
            }
            
           
          }
          if(query.pathMatch!=undefined){
            if(query.pathMatch.indexOf('full')!=-1){
              query.redirectTo=this.summary_routing+summarydetail;
            }
          }
        });
      }
      routing.resetConfig(routing.config);
      this.commonservice.closingStatusallUpdated(objProject);
      this.routing.navigate([this.summary_routing+summarydetail]);
      //this.redirectTo(this.summary_routing+'/'+val.value);
      
      this.isprojdetails=true; 
    }else{
      this.isprojdetails=false; 
    }
   
  });
  location.onPopState(() => {
    //this.isBack=true;
    // alert();
     this.load();
});
  }

  portugues(){
      this.isPortugues=!this.isPortugues;
  }
  getSummaryPath(){
    let lasindexpath="";
    if(this.runmode=='author'){
      lasindexpath = '.'+this.summary_projectCode+'.html';
    }else{
      lasindexpath = '/'+this.summary_projectCode;
    }
    return lasindexpath
  }
  getListPath(txt){
    let lasindexpath="";
    if(this.runmode=='author'){
      if(txt=="summary"){
        lasindexpath = this.list_summary_routing;
      }else{
        lasindexpath = this.list_routing;
      }
    }else{
      lasindexpath = "";
    }
    return lasindexpath
  }
 getProjectName(id){
  let url = this.summary_projectApi + '&id=' + id + '&apilang=' + this.summary_locale;
  this.http.post(url,'').subscribe((response:any)=>{
    let projectDetails = response.projects[id];
    this.project_name= projectDetails.project_name
  })
 }
  ngOnInit(){
    this.load();
    let qterm=this.getQterm();
    //   if (window.location.pathname.indexOf('projects-summary') != -1) {
    //   if(qterm!=""){
    //     this.getSummarylist(qterm,"");
    //   }else{
    //     this.routing.navigate([this.list_summary_routing]);
    //   }
    // }else  if (window.location.pathname.indexOf('projects-list') != -1) {
    //   if(qterm!=""){
    //     this.getProjectlist(qterm,"");
    //   }else{
    //     this.routing.navigate([this.list_routing]);
    //   }
    // }
    //this.load();
    $(window).scroll(function(){
      if ($(window).scrollTop() >= 300) {
         $('#subnav_section').addClass('fixed-header');
      }
      else {
         $('#subnav_section').removeClass('fixed-header');
      }
  });
  }
  ngOnChanges() {
   
    
  }

summaryUpdateLang(txt){
  debugger
    let summary_routing:any;
    let procurement_routing:any;
    let document_routing:any;
    let newsmedia_routing:any;
    let photogallery_routing:any;
    let summary_routingPath=[];
    let procurement_routingPath=[];
    let document_routingPath=[];
    let newsmedia_routingPath=[];
    let photogallery_routingPath=[];
    let summarydetails="";
    if(this.routing.config!=undefined){
     summary_routingPath=this.getdetails(this.routing.config[0].path);
     procurement_routingPath=this.getdetails(this.routing.config[1].path);
     document_routingPath=this.getdetails(this.routing.config[2].path);
     newsmedia_routingPath=this.getdetails(this.routing.config[3].path);
     photogallery_routingPath=this.getdetails(this.routing.config[4].path);
    }
    
    if(this.runmode=="author"){
      summarydetails = '.'+this.summary_projectCode+'.html';
      if(summary_routingPath!=undefined && summary_routingPath[0].path!=undefined){
        summary_routing = "content/wb-home/"+txt+summary_routingPath[0].path
      }
      if(procurement_routingPath!=undefined && procurement_routingPath[0].path!=undefined){
        procurement_routing="content/wb-home/"+txt+procurement_routingPath[0].path
      }
      if(document_routingPath!=undefined && document_routingPath[0].path!=undefined){
        document_routing="content/wb-home/"+txt+document_routingPath[0].path
      }
      if(newsmedia_routingPath!=undefined && newsmedia_routingPath[0].path!=undefined){
        newsmedia_routing="content/wb-home/"+txt+newsmedia_routingPath[0].path
      }
      if(photogallery_routingPath!=undefined && photogallery_routingPath[0].path!=undefined){
        photogallery_routing="content/wb-home/"+txt+photogallery_routingPath[0].path
      }
    }else{
      summarydetails = '/'+this.summary_projectCode;
      if(summary_routingPath!=undefined && summary_routingPath[0].path!=undefined){
        summary_routing=txt+summary_routingPath[0].path;
        
      }
      if(procurement_routingPath!=undefined && procurement_routingPath[0].path!=undefined){
        procurement_routing=txt+procurement_routingPath[0].path;
     }
     if(document_routingPath!=undefined && document_routingPath[0].path!=undefined){
      document_routing=txt+document_routingPath[0].path;
     }
     if(newsmedia_routingPath!=undefined){
      newsmedia_routing=txt+newsmedia_routingPath[0].path;
     }
     if(photogallery_routingPath!=undefined){
      photogallery_routing=txt+photogallery_routingPath[0].path;
     }
    }
    this.summary_routing = summary_routing;  
    this.procurement_routing = procurement_routing;  
    this.document_routing = document_routing;  
    this.newsmedia_routing = newsmedia_routing;  
    this.photogallery_routing = photogallery_routing;

    if(this.routing.config!=undefined){
      this.routing.config.forEach((query:any) => {

        if(query.loadChildren!=undefined){
          if(query.loadChildren.indexOf('summary')!=-1){
            query.path = summary_routing+summarydetails;
          }
          if(query.loadChildren.indexOf('procurement')!=-1){
            query.path = procurement_routing+summarydetails;
          }
          if(query.loadChildren.indexOf('documents')!=-1){
            query.path = document_routing+summarydetails;
          }
          if(query.loadChildren.indexOf('newsmedia')!=-1){
            query.path = newsmedia_routing+summarydetails;
          }
          if(query.loadChildren.indexOf('photogallery')!=-1){
            query.path = photogallery_routing+summarydetails;
          }
          
         
        }
        if(query.pathMatch!=undefined){
          if(query.pathMatch.indexOf('full')!=-1){
            query.redirectTo=summary_routing;
          }
        }
      });
    }
    this.routing.resetConfig(this.routing.config);
}

  langSetting(txt){
    
    let langPath:any;
    if(window.location.pathname.indexOf('projects-list')==-1 && window.location.pathname.indexOf('projects-summary')==-1){
      langPath=this.getdetails(window.location.pathname);
    }else{
      langPath=this.getLangualge(window.location.pathname);
    }
    
    let lang:any;
    let listRouting:any;
    let listSummaryRouting:any;
    debugger
    let listPath=this.getLangualge(this.list_routing);
   let listSummaryPath=this.getLangualge(this.list_summary_routing);
   if(this.runmode=="author"){
     debugger
     if(langPath!=undefined){
      lang = "content/wb-home/"+txt+langPath[0].path;
     }
     if(listPath!=undefined){
      listRouting="content/wb-home/"+txt+listPath[0].path;
     }
     if(listSummaryPath!=undefined ){
        listSummaryRouting="content/wb-home/"+txt+listSummaryPath[0].path;
     }
   }else{
    if(langPath!=undefined && langPath[0].path!=undefined){
       lang=txt+langPath[0].path;
    }
    if(listPath!=undefined && listPath[0].path!=undefined){
      listRouting=txt+listPath[0].path;
    }
    if(listSummaryPath!=undefined && listSummaryPath[0].path!=undefined){
      listSummaryRouting=txt+listSummaryPath[0].path;
    }
   }
   
   this.summary_locale=txt;
   this.list_routing = listRouting;
   this.list_summary_routing=listSummaryRouting;
   this.summaryUpdateLang(txt);
   //window.history.pushState({urlPath:lang}, "",this.domain_en+lang);
   this.initial(this.routing,this.location,"second");
   //this.ngOnInit();
   debugger
  //setTimeout(() => {
  //    debugger
  //    //window.history.replaceState('','',lang);
  //    if (!!(window.history && history.pushState)) {

    /// window.location.href=lang;
    //  window.history.replaceState( {} , "", window.location.pathname )
    //  window.history.replaceState(  , "", window.location.pathname )
    //this.routing.navigate([lang])
      window.history.pushState(null, null, this.domain_en+lang);

     // window.location.pathname.replace("content/wb-homeasas/","content/wb-home1/"+txt)
     // }
     //this.loading=false;
   // window.history.replaceState( {} , "", window.location.pathname );
   //window.location.pathname="";
   // window.history.pushState("", "",lang);
   this.loading=false;
 // }, 100);
  
  }
getLangualge(path:any){
  
  let UrlPath=[];
  //let language=['en','es','fr','ar','ru','zh','pt'];
  debugger
  if(this.runmode=="author"){
    let urlSplit="";
    let finalSplit=[]
    urlSplit= path.split('content/wb-home/')[1]
    let urlSplits = urlSplit.split('/');
    let locales=window.location.pathname.split('content/wb-home/')[1]
      let localeSplit = locales.split('/');
    finalSplit=path.split('content/wb-home/'+urlSplits[0]);
   // finalSplit = finalSplit[1].substring(finalSplit[1].lastIndexOf('/') + 1)
    UrlPath.push({
      locale:localeSplit[0],
      path:finalSplit[1]});
  }else{
    let urlSplit=[];
    let localeSplit=[];
    urlSplit=path.split('/');
    localeSplit=window.location.pathname.split('/');
    let urlSplits = path.split(urlSplit[1]);
    UrlPath.push({
      locale:localeSplit[1],
      path:urlSplits[1]});
    //UrlPath = urlSplits[1];
  }
  
  //  let strlang="";
  //  UrlPath.forEach(element => {
  //   if(element!=""){
  //     if(language.indexOf(element)==-1){
  //       strlang+=element+'/';
  //      }
  //   }
  //  });
  //  if(strlang!=""){
  //   strlang = strlang.substring(0,strlang.length-1);
  //  }
   
   return UrlPath;
}


getdetails(path:any){
  
  let UrlPath=[];
  //let language=['en','es','fr','ar','ru','zh','pt'];
  debugger
  if(this.runmode=="author"){
    let urlSplit="";
    let finalSplit=[]
    urlSplit= path.split('content/wb-home/')[1]
    let urlSplits = urlSplit.split('/');
    let locales=window.location.pathname.split('content/wb-home/')[1]
      let localeSplit = locales.split('/');
    finalSplit=path.split('content/wb-home/'+urlSplits[0]);
    debugger
  // let finalSplits = finalSplit[1].substring(finalSplit[1].lastIndexOf('/') + 1);
   let localeSplits = finalSplit[1].split('.');
   debugger
    UrlPath.push({
      locale:localeSplit[0],
      path:localeSplits[0]});
  }else{
    let urlSplit=[];
    let localeSplit=[];
    urlSplit=path.split('/');
    localeSplit=window.location.pathname.split('/');
    let urlSplits = path.split(urlSplit[1]);
    UrlPath.push({
      locale:localeSplit[1],
      path:urlSplits[1]});
    //UrlPath = urlSplits[1];
  }
  
  //  let strlang="";
  //  UrlPath.forEach(element => {
  //   if(element!=""){
  //     if(language.indexOf(element)==-1){
  //       strlang+=element+'/';
  //      }
  //   }
  //  });
  //  if(strlang!=""){
  //   strlang = strlang.substring(0,strlang.length-1);
  //  }
   
   return UrlPath;
}

load(){
  this.clear();
  let summarydetails="";
 

  let parameters = location.search.substring(1);  
    let qterm="";      
    if (parameters.indexOf('searchTerm=') != -1) {
         qterm = this.getParameterByName('searchTerm', '?' + parameters);
      //  parameters = this.removeURLParameter(parameters, 'searchTerm');
       // parameters = (parameters == '' ? parameters : parameters + '&') + 'qterm=' + (qterm == null ? '' : qterm);
    }  
  if(window.location.pathname.indexOf(this.summary_routing)!=-1){
    
    this.isprojdetails=true;
     $('#summary_top').addClass('active');
     if(this.routing.config!=undefined){
      this.routing.navigate([this.routing.config[0].path]);
    }
   }
   if(window.location.pathname.indexOf(this.procurement_routing)!=-1){
    this.isprojdetails=true;
    if(this.routing.config!=undefined){
      this.routing.navigate([this.routing.config[1].path]);
    }
     $('#procurement_top').addClass('active');
   }
   if(window.location.pathname.indexOf(this.document_routing)!=-1){
    this.isprojdetails=true;
    if(this.routing.config!=undefined){
      this.routing.navigate([this.routing.config[2].path]);
    }
     $('#documents_top').addClass('active');
   }
   if(window.location.pathname.indexOf(this.newsmedia_routing)!=-1){
    this.isprojdetails=true;
    if(this.routing.config!=undefined){
      this.routing.navigate([this.routing.config[3].path]);
    }
     $('#news_top').addClass('active');
   }
   if(window.location.pathname.indexOf(this.photogallery_routing)!=-1){
    this.isprojdetails=true;
    if(this.routing.config!=undefined){
      this.routing.navigate([this.routing.config[4].path]);
    }
     $('#photo_top').addClass('active');
   }

  if(window.location.pathname.indexOf('projects-summary')!=-1){
    this.isprojdetails=false;
    $('#projectsummary').addClass('active');
    this.getSummarylist(qterm,""); 
  }
  if(window.location.pathname.indexOf('projects-list')!=-1){
    this.isprojdetails=false;
    $('#projectslist').addClass('active');
     this.getProjectlist(qterm,"");
  }
}
  navigationRouting(params,event:any){
    
    $('#wrap ul li a').removeClass('active');
    setTimeout(()=>{
      event.srcElement.classList.add("active");
    },0)
   debugger
    let parameters = location.search.substring(1);  
    let qterm="";      
    let lang:any;
    
   if(this.runmode=="author"){
    lang = "content/wb-home/";
   }else{
    lang="";
   }
    if (parameters.indexOf('searchTerm=') != -1) {
         qterm = this.getParameterByName('searchTerm', '?' + parameters);
      //  parameters = this.removeURLParameter(parameters, 'searchTerm');
       // parameters = (parameters == '' ? parameters : parameters + '&') + 'qterm=' + (qterm == null ? '' : qterm);
    }
    let langPath=[];
    if(params=="summary"){
      if(this.routing.config!=undefined){
        this.routing.navigate([this.routing.config[0].path]);
      }
    }else if(params=="procurement"){
      if(this.routing.config!=undefined){
        this.routing.navigate([this.routing.config[1].path]);
      }
    }else if(params=="documents"){
      if(this.routing.config!=undefined){
        this.routing.navigate([this.routing.config[2].path]);
      }
      
    }else if(params=="news"){
      if(this.routing.config!=undefined){
        this.routing.navigate([this.routing.config[3].path]);
      }
    }else if(params=="photo"){
      if(this.routing.config!=undefined){
        this.routing.navigate([this.routing.config[4].path]);
      }
    }else if(params=="projectsummary"){
        this.getSummarylist(qterm,"");
    }else if(params=="projectslist"){
        this.getProjectlist(qterm,"");
    }
  }

  searchBox(){
      this.getProjectlist(this.txtSearch,"search");
  }
  getQterm(){
    let parameters = location.search.substring(1);  
    let qterm="";      
    if (parameters.indexOf('searchTerm=') != -1) {
         qterm = this.getParameterByName('searchTerm', '?' + parameters);
    }
    return qterm
  }
  getSummarylist(search,txt){
    debugger
    let qterm=this.getQterm();
    let searchText="";
    if(search!=""){
      searchText = search;
    }else{
      if(txt=="search"){
        searchText ="";
      }else{
        searchText =qterm;
      }
    }
    let lang:any;
    
    let summarydetails="";
    if(this.runmode=='author'){
      lang = "content/wb-home/";
      //summarydetails = '.'+this.summary_projectCode+'.html';
    }else{
      lang="";
      //summarydetails = '/'+this.summary_projectCode;
    }
    let response =""
     //let summaryPath=this.getLangualge(this.summary_routing);
    
    let objProject={
      searchTerm:searchText,
      list_summary_apiUrl:  this.list_summary_apiUrl,
    list_summary_buttonLink:this.list_summary_buttonLink,
    list_summary_projectDetailsPath:this.list_summary_projectDetailsPath ,
    list_summary_mapPath:this.list_summary_mapPath ,
    list_summary_ctryCode:this.list_summary_ctryCode, 
    list_summary_sectorCode:this.list_summary_sectorCode, 
    list_summary_regionName:this.list_summary_regionName,
    summary_locale :this.summary_locale,
    summary_routing:this.summary_routing,
    projectlist_routing:this.list_routing,
    response:response
    }
    //let path = lang+this.summary_locale+listSummaryPath[0].path;
    if(searchText!=""){
    this.routing.navigate([this.list_summary_routing], { queryParams: { searchTerm: searchText  }});
    }else{
      this.routing.navigate([this.list_summary_routing]);
     
    }
    this.isprojdetails=false;
    this.commonservice.closingStatusallUpdated(objProject);
  }
getProjectlist(search,txt){
  debugger
  let qterm=this.getQterm();
  let searchText="";
    if(search!=""){
      searchText =search;
    }else{
      if(txt=="search"){
        searchText ="";
      }else{
        searchText =qterm;
      }
     
    }
    
  let obj={
    searchTerm:this.txtSearch,
    summary_locale:this.summary_locale,
    list_project_list_api:this.list_project_list_api
  }
  if(searchText!=""){
    this.routing.navigate([this.list_routing], { queryParams: { searchTerm: searchText  }});
    }else{
      this.routing.navigate([this.list_routing]);
    }
 
 
  this.commonservice.updateSearchResults(obj);
}
  public getParameterByName(name, url) {	    
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  
  public removeURLParameter(url, parameter) {		
    var prefix = encodeURIComponent(parameter) + '=';
    var pars= url.split(/[&;]/g);
    
    for (var i= pars.length; i-- > 0;) {    
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
        pars.splice(i, 1);
      }
    }
    return pars.join('&');					
  }
 clear(){
  $('#summary_top').removeClass('active');
  $('#procurement_top').removeClass('active');
  $('#documents_top').removeClass('active');
  $('#news_top').removeClass('active');
  $('#photo_top').removeClass('active');
  $('#projectsummary').removeClass('active');
  $('#projectslist').removeClass('active');
  
 }
  

  navigate(){
   
  }
}
