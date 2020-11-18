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
  detailsPath: string;
  galleryData: any[] = []; 
  isResponse: boolean;   
  languageLocales: any = {};
  dateLabel: string;
  countryLabel: string;
  topicLabel: string;
  loading: boolean;
  imagePath: string;
  peopleImage: string;
  noData: string;
  viewAllLabel: string;
  viewAllLink: string;
  constructor(private element: ElementRef,private commonservice:CommonService,private http:HttpClient){
    commonservice.changeClosingallStatus.subscribe((val:any) => {
      if (val) { 
        
        this.loading = true;
    this.imagePath = val.photo_imagePath; 
    this.peopleImage = val.photo_peopleImage; 
    this.projectCode = val.photo_projectCode;
    this.languageCode = val.photo_languageCode;    
    this.url = val.photo_projects_photo_gallery_api;
    this.detailsPath = val.photo_details_path;     
    this.viewAllLabel = val.photo_viewall_label;     
    this.viewAllLink = val.photo_viewall_link;  

    this.languageLocales = {
      en : 'English',
      es : 'Spanish',
      fr : 'French',
      pt : 'Portuguese',
      ru : 'Russian',
      ar : 'Arabic',
      zh : 'Chinese'            
    }    
    
    if (this.url != null) { 
      let i18nService = I18nService.ALL_LOCALES[this.languageCode];
            
      this.dateLabel = i18nService.date;
      this.countryLabel = i18nService.country;
      this.topicLabel = i18nService.topic;
      this.noData = i18nService.noData;
       
      let url = this.url + '&apilang='+ this.languageCode + '&lang_exact=' + this.languageLocales[this.languageCode] + '&wbg_project_id=' + this.projectCode;
      
      this.http.get(url).subscribe((data) =>  {        
        this.loading = false;  
        if (data.hasOwnProperty("photoarchives")) {
          this.isResponse = true;
          let photoarchives = data["photoarchives"];
          
          Object.keys(photoarchives).forEach( key => {		
            let data = photoarchives[key];
            this.galleryData.push({
                title : data.hasOwnProperty("iptc_title") ? data.iptc_title : "cataloguing in process",
                url : this.detailsPath.indexOf('/content/') === -1 ? this.detailsPath + '.' + data.id : this.detailsPath + '.' + data.id+ '.html',
                description : data.hasOwnProperty("wbg_caption") ? data.wbg_caption : "N/A",
                date : data.hasOwnProperty("iptc_date_created") ? data.iptc_date_created : "N/A",
                topic : data.hasOwnProperty("wbg_topics") ? data.wbg_topics : "N/A",
                country : data.hasOwnProperty("wbg_country") ? data.wbg_country : "N/A",
                image : this.peopleImage.replace("{id}", data.id) 
            });            
          });            
        } else {
          this.isResponse = false;
        }
      });

    }
  
       }

    });
  }

  ngOnInit() {
  }

}
