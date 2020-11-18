import { Component, OnInit,Input } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'theme-section',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})


export class ThemeComponent implements OnInit{ 
  @Input() apiResponse: any; 
  @Input() projectCode: string;
  @Input() locale: string;

  titleLocales: any = {};  
  isResponse: boolean;
  themesTitle: string;
  themeArr: any[];
  themePercentArr: any[];
  isTheme: boolean = true;  
  noData: string;
  noDataLocales: any = {};
   
  constructor(private http:HttpClient) {
    this.titleLocales = { 
      en: 'Themes', 
      es: 'Temas', 
      fr: 'Thèmes', 
      pt: 'Temas', 
      ru: 'Темы', 
      ar: 'محاور التركيز', 
      zh: '主题' 
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
  ngOnInit() {
  }
  ngOnChanges() { 
    // this.http.post(this.apiResponse, '').subscribe((apiResponse:any) => {  
         
    //   if (apiResponse.projects.hasOwnProperty(this.projectCode)) {                                             
    if (this.apiResponse != undefined) {
      this.themesTitle = this.titleLocales[this.locale];
      this.noData = this.noDataLocales[this.locale];
      this.isResponse = true;
      let themeArr = [];
      let themePercentArr = [];
      let projectDetails = this.apiResponse.projects[this.projectCode];


      if (projectDetails.hasOwnProperty('theme_list')) {
          let themeListArr = projectDetails.theme_list;      
          themeArr.push(themeListArr);                     
          this.themeArr = themeArr;
      } else {
        this.isTheme = false;
      }
    }
  }
// });
//   }        
}
   
