import { Component, OnInit,ElementRef } from '@angular/core';
import {CommonService} from '../../common.service';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable,forkJoin } from 'rxjs';
import { I18nService } from '../I18nService';
@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectCode: string;
  languageCode: string;
  url: string;
  multimediaApi: string; 
  apiResponse: any;
  multimediaResponse: any;
  allDocuments: any[];
  documents: any[];
  multimedia: any[];
  sortTypes: any[];
  isResponse: boolean;
  projectId: string;      
  sortBy: string = 'SortBy';	
  date: string = 'Date';
  type: string = 'displayconttype_exact';
  language: string = 'lang_exact';  
  languageLocales: any = {};
  isDateSorted: boolean;
  dateAngle: string;
  contentType: string;
  loading: boolean;
  imagePath: string;
  allLabel: string;
  noData: string;
  constructor(private element: ElementRef,private commonservice:CommonService,private http:HttpClient){
    commonservice.changeClosingallStatus.subscribe((val:any) => {
      
      if (val) {
        this.loading = true;
        this.imagePath =  val.newsmedia_imagePath; 
        this.projectCode =  val.newsmedia_projectCode;
        this.languageCode =  val.newsmedia_languageCode;    
        this.url =  val.newsmedia_url;
        this.multimediaApi =  val.newsmedia_multimediaApi;
        this.languageLocales = {
          en : 'English',
          es : 'Spanish',
          fr : 'French',
          pt : 'Portuguese',
          ru : 'Russian',
          ar : 'Arabic',
          zh : 'Chinese'            
      }
      this.isDateSorted = false;
      this.dateAngle = this.isDateSorted ? 'fa fa-angle-up' : 'fa fa-angle-down';
  
      this.getData(); 
      }
    })
  }
  getData() { 
    if (this.url != null) {                
        let i18nService = I18nService.ALL_LOCALES[this.languageCode];
        
        this.date = i18nService.Date;
        this.sortBy = i18nService.SortBy;
        this.language = i18nService.lang_exact;
        this.type = i18nService.displayconttype_exact;     
        this.allLabel = i18nService.All;
        this.noData = i18nService.noData;

        this.contentType = this.allLabel;

        let url = this.url+ '&apilang='+ this.languageCode + '&lang_exact=' + this.languageLocales[this.languageCode] + '&proid=' + this.projectCode;
        let multimediaApi = this.multimediaApi + '&project_id=' + this.projectCode + '&apilang=' + this.languageCode;
        const combined =this.http.post(url, '');
      const combined1=this.http.post(multimediaApi, '');

        // const combined =           
        //     this.http.post(url , '').map((response: Response) => {
        //         // console.log('api ' + new Date);
        //         return response.json();
        //     }),
        //     this.http.post(multimediaApi, '').map((response: Response) => {
        //         // console.log('api ' + new Date);
        //         return response.json();
        //     })
        // )
        
        forkJoin([combined,combined1]).subscribe(combinedValues => {      
            this.loading = false;                
            const [ apiResponse, multimediaResponse ] = combinedValues;			
            this.apiResponse = apiResponse;
            this.multimediaResponse = multimediaResponse;   
            
            delete this.apiResponse.documents.facets;
            delete this.multimediaResponse.multimedia.facets;
            
            let documents = [];
            let sortTypes = [];
            sortTypes.push(this.allLabel); 

            if (Object.keys(this.apiResponse.documents).length > 0) {
                this.isResponse = true;
                                                                                                                    
                Object.keys(this.apiResponse.documents).forEach( key => {		
                    let data = this.apiResponse.documents[key];
                    documents.push({
                        title : data.title,
                        url : data.url,
                        description : data.descr,
                        date : data.lnchdt,
                        type : data.displayconttype,
                        language : data.lang,
                        image : ""
                    });

                    if(sortTypes.indexOf(data.displayconttype) === -1)
                        sortTypes.push(data.displayconttype);
                });                                                                         
            } 

            if (Object.keys(this.multimediaResponse.multimedia).length > 0) {
                this.isResponse = true;
                
                Object.keys(this.multimediaResponse.multimedia).forEach( key => {		
                    let data = this.multimediaResponse.multimedia[key];
                    documents.push({
                        title : data.short_title,
                        url : data.url,
                        description : data.short_description,
                        date : data.content_date,
                        type : data.content_type,
                        language : data.lang,
                        image : data.keyframeurl
                    });

                    if(sortTypes.indexOf(data.content_type) === -1)
                        sortTypes.push(data.content_type);
                });
            }
            this.allDocuments = this.documents = documents;
                    this.sortTypes = sortTypes;     

            if (Object.keys(this.apiResponse.documents).length == 0 && 
                Object.keys(this.multimediaResponse.multimedia).length == 0) { 
                this.isResponse = false;
            }                                                                                                  
        });
    }                          
}

onDateSort(sortType) {        
    this.isDateSorted = sortType;
    this.dateAngle = this.isDateSorted ? 'fa fa-angle-up' : 'fa fa-angle-down';
                    
    this.sortDocuments(sortType);    
}

onSortType(sortType, isDateSorted) {      
    this.contentType = sortType;     
    if (sortType == this.allLabel) {
        this.documents = this.allDocuments;
    } else {
        this.documents = this.allDocuments.filter( t => t.type == sortType);
    }
    this.sortDocuments(isDateSorted);              
}  

sortDocuments(sort) {
    if (this.documents.length > 1) {           
        if (sort) {
            this.documents.sort((val1, val2)=> { 
                return <any>new Date(val1.date) - <any>new Date(val2.date);
            });    
        } else {
            this.documents.sort((val1, val2)=> { 
                return <any>new Date(val2.date) - <any>new Date(val1.date);
            });    
        }           
    } 
}
  ngOnInit() {
  }

}
