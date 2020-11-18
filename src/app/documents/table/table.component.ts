import { Component, OnInit,ElementRef,Input } from '@angular/core';
import { Subject } from 'rxjs';
import { ExcelService } from '../../services/excel.service';
import { DateFormatPipe } from '../date.pipe';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'table-api',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  loader: boolean;
  @Input() imagePath: string;
  @Input() tableHeaders: any;
   @Input() locale: string;
  @Input() tabType: string;
  @Input() apiUrl: string;
  @Input() inputApiUrl: string;
  @Input() headerLabel: string;
  @Input() loadMoreLabel: string;
  @Input() errorMsg: string;	  
  @Input() downloadLabel: string;
  @Input() projectid: string;
  @Input() type: string;		
  
   showTable: boolean;
  
   totalRecords: any;
   rowsCount: any;
  urlResponse: any[];
  projectTabResponse: any[];
  disclaimerText: string;
  excelName:string;	 

  dtOptions: any = {};	 
  dtTrigger: Subject<any> = new Subject();	
     
  // for excel download
  excelJsonArrayResponse: any[];
  excelUrlResponse: any[];
  reverse: boolean=false;
  //added for sort
  sortedColumns: any[] = [];
  projectHeadersProperties:any[]=[];
  archiveHeadersProperties:any[]=[];
  sortedArchieveColumns: any[] = [];
  sortType:string = 'asc'; 
  sortArchieveType:string = 'asc';
  projectHeaders: any[] = [];
 
  sortDir = 1; 
 constructor(private element: ElementRef, private excelService: ExcelService,private http:HttpClient){
 this.excelService = excelService;
 }  
 

 ngOnInit(){ 
		
  let tableHeaders = [];
  let rowsCount = '20';		
  
  tableHeaders=this.tableHeaders.split("%%");
  this.tableHeaders = tableHeaders;
  this.callAPI(rowsCount,'on-init','');	
  this.dtOptions = {
    dom: 'Brt',
    order: []					
  } 

  if (this.locale == "en") {
    this.disclaimerText = "The World Bank Group Archives is the custodian for archival records over 20 years of age and facilitates access to these records through the World Bank Policy on <a href='https://www.worldbank.org/en/access-to-information'>Access to Information</a>.  The list above provides information about the records for this project that are in the Archives custody, some of which have been disclosed and digitized for on-line access. Other records are only available in hardcopy in the Archives Reading Room in Washington, DC by appointment.  If you wish to access any of these hardcopy records, please submit your request via the <a href='https://www.worldbank.org/en/access-to-information'>Access to Information</a> webpage citing the unique  folder number(s).  The World Bank Group Archives strives to ensure the accuracy of this information, and updates may occur in the future.  No list will be available in cases where the Archives does not have custody of the records related to this project or they are under 20 years of age, there will be no data available in the list above.";
  } else if (this.locale == "es") { 
    this.disclaimerText = "La Unidad de Archivos del Grupo del Banco Mundial actúa como custodio de los registros de archivos que tienen más de 20 años de antigüedad y facilita el acceso a estos en conformidad con la Política de <a href='https://www.bancomundial.org/es/access-to-information'>acceso a la información</a> del Banco Mundial. La lista presentada más arriba contiene información acerca de los registros de este proyecto que están en custodia de la Unidad de Archivos, algunos de los cuales han sido publicados y puestos a disposición en formato digital para poder acceder a ellos en línea. Otros registros están disponibles en forma impresa exclusivamente en la sala de lecturas de los Archivos en la ciudad de Washington, para lo cual se requiere cita previa. Si usted desea tener acceso a algunos de los registros impresos, por favor envíe su solicitud a través de la página web <a href='https://www.bancomundial.org/es/access-to-information'>“Acceso a la información”</a>, incluyendo el o los números específicos de la carpeta. La Unidad de Archivos del Banco Mundial procura garantizar que la información sea correcta, y podrían realizarse actualizaciones en el futuro. La lista anteriormente mencionada no contiene datos sobre registros relacionados con este proyecto que no están en custodia de los Archivos del Banco Mundial o que tienen menos de 20 años de antigüedad.";
  } else if (this.locale == "fr") {
    this.disclaimerText = "Le service des Archives du Groupe de la Banque mondiale est le « conservateur » des documents d'archive ayant plus de 20 ans, et a pour rôle de permettre au public d'accéder à ceux-ci conformément à la politique <a href='https://www.banquemondiale.org/fr/access-to-information'>d'accès à l'information</a> du Groupe. La liste ci-dessus fournit des informations sur les documents associés à ce projet qui sont sous la responsabilité du service des Archives. Certains de ces documents ont fait l’objet d’une procédure de diffusion et d’une numérisation, et sont accessibles en ligne. D'autres documents ne sont disponibles que sous forme papier et ne peuvent être consultés (sur rendez-vous) que dans la salle de lecture du service des Archives à Washington. Pour y accéder, veuillez effectuer une demande via le site Web <a href='https://www.banquemondiale.org/fr/access-to-information'>d'accès à l'information</a> du Groupe de la Banque mondiale en indiquant le ou les numéros de dossier associés. Le service des Archives met tout en œuvre pour garantir la précision de ces i";
  } else if (this.locale == "pt") {
    this.disclaimerText = "Há mais de 20 anos o Arquivo do Grupo Banco Mundial é o custódio dos registros de arquivo e facilita o acesso a esses registros por meio da Política do Banco Mundial sobre <a href='https://www.worldbank.org/pt/access-to-information'>Acesso à Informação</a>. A lista acima fornece informação sobre os registros para este projeto que estão sob a custódia do Arquivo, alguns dos quais foram divulgados e digitalizados para acesso on-line. Outros registros somente estão disponíveis em cópia impressa na Sala de Leitura do Arquivo em Washington, D.C. com hora marcada. Caso deseje acessar esses registros em cópia impressa, favor enviar pedido no website do <a href='https://www.worldbank.org/pt/access-to-information'>Acesso à Informação</a> indicando o(s) número(s) específico(s) da pasta. O Arquivo do Grupo Banco Mundial empenha-se em assegurar a exatidão da informação e atualizações podem ocorrer no futuro. Se o Arquivo não tiver a custódia dos registros relacionados com o projeto ou se os dados tiverem menos de 20 anos, não haverá dados disponíveis na li";
  } else if (this.locale == "ru") {
    this.disclaimerText = "Архив Группы Всемирного банка является хранителем архивных документов более чем 20-летней давности и предоставляет к ним доступ в соответствии с Политикой Всемирного банка в отношении <a href='https://www.vsemirnyjbank.org/ru/access-to-information'>доступа к информации</a>. Вышеприведенный список содержит информацию о находящихся на хранении в Архиве документах по этому проекту, некоторые из которых были раскрыты и оцифрованы с целью обеспечения доступа к ним в режиме он-лайн. Другие документы доступны только на бумажном носителе в читальном зале Архива в г. Вашингтоне по предварительной записи. Если Вы желаете получить доступ к любому из этих документов на бумажном носителе, просим подать заявку, перейдя по гиперссылке на страницу <a href='https://www.vsemirnyjbank.org/ru/access-to-information'>«Доступ к информации»</a> и указав идентификационный номер(а) папки. Архив Всемирного банка стремится обеспечить точность этой информации и может актуализировать ее в будущем. В случаях, когда Архив не располагает связанными с проектом документами или эти докум";
  } else if (this.locale == "zh") {
    this.disclaimerText = "世界银行集团档案馆保管超过20年的档案记录，并通过《世界银行<a href='https://www.shihang.org/zh/access-to-information'>信息获取</a>政策》提供这些记录的获取。以上所列清单为档案馆保管的有关本项目记录的信息，其中部分记录已经披露，可在网上获取电子版本。其它记录只能通过预约在华盛顿的档案馆阅读室获取印刷版。如果您希望获取任何印刷版记录，请通过<a href='https://www.shihang.org/zh/access-to-information'>信息获取</a>网页提交申请，并请注明具体的文件夹号。世界银行集团档案馆致力于确保信息的准确性，将来可能会随时更新。如果档案馆没有保存有关本项目的记录，或者该记录不到20年，则不包括在以上所列清单中。";
  } else if (this.locale == "ar") {
    this.disclaimerText = "أرشيف مجموعة البنك الدولي هي مكان حفظ السجلات المؤرشفة خلال 20 سنة وتسهل الوصول إلى هذه السجلات<a href='https://www.albankaldawli.org/ar/access-to-information'>طريق سياسة تداول الم</a> عن علومات بالبنك الدولي. وتوفر القائمة أعلاه معلومات عن السجلات المخصصة لهذا المشروع والموجودة في الأرشيف، وقد تم الإفصاح عن بعضها أو تحويلها إلى الصورة الرقمية للوصول إليها عبر الإنترنت<a href='https://www.albankaldawli.org/ar/access-to-information'>وبعض السجلات الأخرى </a>. غير متاحة إلا في صورة ورقية في غرفة القراءة بالأرشيف في واشنطن، ويمكن الاطلاع عليها بعد ترتيب موعد. وإذا رغبت في الحصول على أي من هذه السجلات الورقية، يمكن تقديم طلب عبر موقع تداول المعلومات مع ذكر رقم أو أرقام الملف. ويسعى أرشيف مجموعة البنك الدولي جاهدا لضمان دقة هذه المعلومات، وقد يتم التحديث مستقبلا. وفي حالة عدم توفر السجلات ذات الصلة بهذا المشروع في الأرشيف أو إذا كان مضى عليها أكثر من 20 سنة، فلن تتوفر بيانات على القائمة أعلاه.";
  } else {
    this.disclaimerText = "The World Bank Group Archives is the custodian for archival records over 20 years of age and facilitates access to these records through the World Bank Policy on <a href='https://www.worldbank.org/en/access-to-information'>Access to Information</a>.  The list above provides information about the records for this project that are in the Archives? custody, some of which have been disclosed and digitized for on-line access. Other records are only available in hardcopy in the Archives Reading Room in Washington, DC by appointment.  If you wish to access any of these hardcopy records, please submit your request via the <a href='https://www.worldbank.org/en/access-to-information'>Access to Information</a> webpage citing the unique  folder number(s).  The World Bank Group Archives strives to ensure the accuracy of this information, and updates may occur in the future.  No list will be available in cases where the Archives does not have custody of the records related to this project or they are under 20 years of age, there will be no data available in the list above.";
  }

//added for sort
this.projectHeadersProperties=["display_title","docdt","repnb","docty"];
this.archiveHeadersProperties=["folder_title","id","start_date","disclosure_status"];
  }
  onArchiveSort(property, sortType){
    this.reverse=!this.reverse;
    if (this.sortedArchieveColumns.indexOf(property) === -1) {
      this.sortedArchieveColumns.push(property);
      this.sortArchieveType = 'asc';
    } else {
      this.sortedArchieveColumns.splice(this.sortedArchieveColumns.indexOf(property), 1);
      this.sortArchieveType = sortType == 'asc' ? 'desc' : 'asc';
    }
    let url="";
   
    url =  '&srt=' + property + '&order=' + this.sortArchieveType; 
    this.callAPI(this.rowsCount,"sort",url); 
  }
  public onSort(property, sortType) {
    
    this.reverse=!this.reverse;
    if (this.sortedColumns.indexOf(property) === -1) {
      this.sortedColumns.push(property);
      this.sortType = 'asc';
    } else {
      this.sortedColumns.splice(this.sortedColumns.indexOf(property), 1);
      this.sortType = sortType == 'asc' ? 'desc' : 'asc';
    }
    let url="";
  
    property = property.replace("display_title","display_title_exact");
    property = property.replace("docty","docty_exact");
    url =  '&srt=' + property + '&order=' + this.sortType; 
   
    this.callAPI(this.rowsCount,"sort",url); 
  }

callAPI(rowsCount,checkVal,sortUrl){	

  this.loader =true;
  this.showTable =false;

  
  let projectTabResponse = [];
  let totalRecords = '0';	
  if(sortUrl!=""){
    this.urlResponse = [];
    this.apiUrl=this.inputApiUrl+'&rows='+rowsCount;
    let modifiedUrl = this.removeURLParameter(this.apiUrl, 'srt');
    modifiedUrl = this.removeURLParameter(modifiedUrl, 'order');			
    this.apiUrl=modifiedUrl+sortUrl;
  
  }else{
    this.apiUrl=this.inputApiUrl+'&rows='+rowsCount;
  }
  if(this.tabType=='archival'){
    this.apiUrl = this.apiUrl+'&project_id_exact=' + this.projectid+'&apilang='+ this.locale;
  }
  if(this.tabType=='projects'){
    this.apiUrl = this.apiUrl+'&proid=' + this.projectid+'&apilang='+ this.locale;
  }
   
  this.rowsCount=rowsCount;
  
  // jsonarray for dowloading data as excel
  let excelJsonArrayResponse=[];
  let excelJsonArrayElements= {};	 	
  
  this.http.get(this.apiUrl).subscribe((response:any)=> {	
    
    let urlResponse = [];
  totalRecords=response.total;
  this.totalRecords = totalRecords;
  
  if(this.totalRecords == 0){ 
    this.loader =false;		
  }			
  
  if(this.totalRecords> 0){ 
  
    this.loader =false;
    this.showTable =true;
    urlResponse.push(response);
    this.urlResponse = urlResponse;
  
    if(this.tabType=='projects'){
      this.excelName='Project Documents';

      let documentsArr = [];
      let documents = this.urlResponse[0].documents
      delete documents.facets;
      
      Object.keys(documents).forEach(function(key) {
        documentsArr.push(documents[key]);
      });
      
      /*documentsArr.sort(function(a,b){
        return new Date(b.docdt).getTime() - new Date(a.docdt).getTime();
      });*/
      this.urlResponse = documentsArr;
      
              this.urlResponse.forEach((index) => {  
        excelJsonArrayElements = {
          col: index.display_title,
          date: DateFormatPipe.prototype.transform(index.docdt,this.locale),
          reportno:index.repnb,
          docty:index.docty
        }
        excelJsonArrayResponse.push(excelJsonArrayElements);
      });
      this.excelJsonArrayResponse	=excelJsonArrayResponse;
      if(checkVal=='on-init'){
        this.dtTrigger.next();
      }
    }	

    if(this.tabType=='archival'){
      this.excelName='Archival Documents';

      this.urlResponse = this.urlResponse[0].projectsarchives;
      if(checkVal=='on-init'){
        this.dtTrigger.next();
      }			
    }
  }
  });
  
}

downloadExcel(){
  
  let excelUrlResponse = [];
  let excelPlanTabResponse = [];
  
  // jsonarray for dowloading data as excel
  let excelJsonArrayResponse=[];
  let titleLinks=[];
  let titleLinksArchive=[];
  let excelJsonArrayElements= {};	 	
  if(this.tabType=='archival'){
    this.inputApiUrl = this.apiUrl+'&rows=500'+'&project_id_exact=' + this.projectid+'&apilang='+ this.locale;
  }
  if(this.tabType=='projects'){
    this.inputApiUrl = this.apiUrl+'&rows=500'+'&proid=' + this.projectid+'&apilang='+ this.locale;
  }
  this.http.get(this.inputApiUrl).subscribe((response:any)=> {	

  if(response.total>'0'){  
    excelUrlResponse.push(response);
    this.excelUrlResponse = excelUrlResponse;
    
    if(this.tabType=='projects'){
      this.excelName='Project Documents '+this.projectid;
      this.excelUrlResponse = this.excelUrlResponse[0].documents;
       for (var planIdObject in this.excelUrlResponse) {
        if(planIdObject!='facets'){
          excelPlanTabResponse.push(this.excelUrlResponse[planIdObject]);
        }
       }
      this.excelUrlResponse = excelPlanTabResponse;
              this.excelUrlResponse.forEach((index) => {
        if(index.url != undefined)
         titleLinks.push(index.url);
        else
         titleLinks.push("");
          excelJsonArrayElements = {
          display_title: index.display_title,
          date: DateFormatPipe.prototype.transform(index.docdt,this.locale),
          reportno:index.repnb,
          docty:index.docty
        }
        excelJsonArrayResponse.push(excelJsonArrayElements);
      });
      this.excelJsonArrayResponse	=excelJsonArrayResponse;
      this.excelService.exportProjectsExcelFile(this.excelJsonArrayResponse, this.excelName, this.tableHeaders, titleLinks); 				
    }	

    if(this.tabType=='archival'){
      this.excelName='Project Archival Records '+this.projectid;
      this.excelUrlResponse = this.excelUrlResponse[0].projectsarchives;
      this.excelUrlResponse.forEach((index) => {
        if(index.folder_url != undefined)
         titleLinksArchive.push(index.folder_url);
        else
         titleLinksArchive.push(""); 
          
        excelJsonArrayElements = {
          folder_title:index.folder_title,
          id: index.id,
          date: DateFormatPipe.prototype.transform(index.start_date,this.locale)+'-'+DateFormatPipe.prototype.transform(index.end_date,this.locale),
          disclosure_status:index.disclosure_status
        }
        excelJsonArrayResponse.push(excelJsonArrayElements);
      });
      this.excelJsonArrayResponse	=excelJsonArrayResponse;
      this.excelService.exportArchivalExcelFile(this.excelJsonArrayResponse, this.excelName, this.tableHeaders, titleLinksArchive); 	
    }
  }
  });
  
}
public onScrollToTop() {
  window.scrollTo(0, 0);		
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

  sortArr(colName:any){
		this.urlResponse.sort((a,b)=>{
		  a= a[colName].toLowerCase();
		  b= b[colName].toLowerCase();
		  return a.localeCompare(b) * this.sortDir;
		});
	  }

	  onSortClick(event, index,col) {
		let target = event.srcElement,
		  classList = target.innerHTML;
         if(classList!=""){
		if (classList.indexOf('fa-chevron-up')>-1) {
		  
		  target.innerHTML = (target.tagName!='SPAN') ? 
		  this.tableHeaders[index] + ' <span class="fa fa-chevron-down arrow_up" ></span>' : 
		  '<span class="fa fa-chevron-down arrow_up" ></span>';
		  this.sortDir=-1;
		} else {
		 target.innerHTML = (target.tagName!='SPAN') ? 
		 this.tableHeaders[index] + ' <span class="fa fa-chevron-up arrow_up" ></span>' : 
		 '<span class="fa fa-chevron-up arrow_up" ></span>';
		  this.sortDir=1;
		}
	}else{
		if (target.className.indexOf('fa-chevron-up')>-1) {
			target.className="fa fa-chevron-down arrow_up";
			this.sortDir=-1;
		  } else {
			target.className="fa fa-chevron-up arrow_up";
			this.sortDir=1;
		  }
	}
		
		this.sortArr(col);
	  }

}
