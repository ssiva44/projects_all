import { Component, OnInit, Input,OnChanges } from '@angular/core';
import { I18nService } from '../I18nService';
import {CommonService} from '../../common.service';
@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit,OnChanges {
  @Input() locale: any;
  @Input() projectsPath: any;
  @Input() projectResponse: any;
  @Input() loading: any;
  @Input() imagePath: any;
  @Input() projectListPath: any;

  title: string;
  projectTitle: string;
  projectsListLabel: string;
  projectsList: any[] = [];
  projecHeaderLocales: any;
  projectHeaders: any[] = [];
  constructor(private service:CommonService) { 
    this.projecHeaderLocales = { 
      en: ['Country', 'Project Title', 'Approval Date'], 
      es: ['País', 'Nombre del Proyecto', 'Fecha de aprobación'], 
      fr: ['Pays', 'Intitulé du Projet', "Date d'approbation"], 
      pt: ['País', 'Título do projeto', 'Data da aprovação'], 
      ru: ['Страна', 'Название Проекта', 'Дата утверждения'], 
      ar: ['البلد', 'اسم المشروع', 'تاريخ الموافقة'], 
      zh: ['国家', '项目名称', '批准日期']
    }; 
  }
  ngOnChanges(){
    this.service.changeSummaryResults.subscribe((apiResponse:any) => {
      
      if (apiResponse) {
      this.title = I18nService.PROJECT[this.locale].title;
      this.projectTitle = I18nService.PROJECT[this.locale].projectTitle;
      this.projectsListLabel = I18nService.PROJECT[this.locale].projectList;
      let projects = apiResponse.projects;            
      let projectsList = [];
      this.projectHeaders = this.projecHeaderLocales[this.locale];
      
      for(let project in projects) {
          projectsList.push(projects[project]);
      }            
      this.projectsList = projectsList;            
  }
});
  }
  ngOnInit() {
    
   
  }

}
