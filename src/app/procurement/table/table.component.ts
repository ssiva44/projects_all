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
	 @Input() domain: string;
	 @Input() projectId: string;
	 @Input() tableHeaders: any;
 	 @Input() locale: string;
	 @Input() tabType: string;
	 @Input() apiUrl: string;
	 @Input() inputApiUrl: string;
	 @Input() headerLabel: string;
	 @Input() loadMoreLabel: string;
	 @Input() errorMsg: string;	  
	 @Input() downloadLabel: string;	
 	 showTable: boolean;
 	 totalRecords: any;
 	 rowsCount: any;
	 urlResponse: any[];
	 excelName:string;
	 // for excel download
	 excelJsonArrayResponse: any[];
	 excelUrlResponse: any[];
	  isUpArrow : any[];
	 dtOptions: any = {};	
	 sortDir = 1; 
	 dtTrigger: Subject<any> = new Subject();

	 contractTableHeadersExcelGroup: any = {}; 
	 contractTableHeadersExcel: string;
	 contractExcelTableHeaders: any; 
	 order: string = '';

	 reverse: boolean=false;
	constructor(private element: ElementRef,private excelService: ExcelService,private http:HttpClient){
	this.excelService = excelService;
	}  
  ngOnInit() {
    let tableHeaders = [];
		let rowsCount = '20';		
		tableHeaders=this.tableHeaders.split("%%");
		this.tableHeaders = tableHeaders;
		
		let contractExcelTableHeaders = [];
		contractExcelTableHeaders=this.contractTableHeadersExcel.split("%%");
		this.contractExcelTableHeaders = contractExcelTableHeaders;
		
		
		this.callAPI(rowsCount,'on-init');	
	
		this.dtOptions = {
			dom: 'Brt',
			order: []					
		}
  }
  ngOnChanges() {
    
    this.contractTableHeadersExcelGroup = { 
			'en' : 'Contract No%%Description%%Procurement Method%%Procurement Group%%Borrower Contract Reference%%Contractor Name%%Contractor Country%%No Objection Date%%Contract Signing Date%%Amount (US$)',
			'es' : 'N.° de contrato%%Descripción%%Método de adquisiciones%%Grupo de adquisiciones%%Referencia del contrato del prestatario%%Nombre del contratista%%País del contratista%%Fecha de no oposición de objeciones%%Fecha de firma del contrato%%Monto (US$)',
			'fr' : 'No de contrat%%Description%%Mode de passation%%Catégorie de marché%%Référence du contrat emprunteur%%Nom de l’attributaire%%Pays de l’attributaire%%Date d’approbation%%Date de signature du contrat%%Montant (en dollars)',
			'ar' : 'رقم العقد%%الوصف%%أسلوب المشتريات%%مجموعة المشتريات%%الرقم المرجعي لعقد المقترض%%اسم المقاول%%بلد المقاول%%تاريخ عدم الاعتراض%%تاريخ توقيع العقد%%(المبلغ (بالدولار',
			'zh' : '合同编号%%说明%%采购方法%%采购组%%借方合同参考%%承包方名称%%承包商国籍%%无异议的确认日期%%合同签署日期%%金额（美元）',
			'ru' : 'Контракт №%%Описание%%Метод закупок%%Группа по закупкам%%Номер контракта заемщика%%Наименование поставщика%%Страна поставщика%%Дата согласования%%Дата подписания контракта%%Сумма (ДОЛЛ. США)',
			'pt' : 'Nº do contrato%%Descrição%%Método de Aquisição%%Grupo de Aquisições%%Referência ao contrato do mutuário%%Nome do contratante%%País do contratante%%Data sem objeção%%Data de assinatura do contrato%%label.amountusdlow',
		}
		
		this.contractTableHeadersExcel=this.contractTableHeadersExcelGroup.hasOwnProperty(this.locale) ? this.contractTableHeadersExcelGroup[this.locale] : {}
 
		this.urlResponse=[];
  }

  callAPI(rowsCount,checkVal){	
		
		this.loader =true;
		this.showTable =false;
		
		let urlResponse = [];
		let planTabResponse = [];
	
		let totalRecords = '0';	
		if(this.tabType=='notices'){
		this.apiUrl=this.inputApiUrl+'&rows='+rowsCount+'&project_id=' + this.projectId+'&apilang='+ this.locale;
		}
		if(this.tabType=='contract'){
			this.apiUrl=this.inputApiUrl+'&rows='+rowsCount+'&projectid=' + this.projectId+'&apilang='+ this.locale;
		}
		if(this.tabType=='plan'){
			this.apiUrl=this.inputApiUrl+'&rows='+rowsCount+'&proid=' + this.projectId+'&apilang='+ this.locale;
		}
		
		this.rowsCount=rowsCount;
					
		this.http.get(this.apiUrl).subscribe((response:any)=> {	
			
			this.loader =false;	
		totalRecords=response.total;
		this.totalRecords = totalRecords;
		
		if(this.totalRecords==='0'){ 
				
		}

		if(this.totalRecords>'0'){  
			this.loader =false;
			this.showTable =true;

			urlResponse.push(response);
			this.urlResponse = urlResponse;

			if(this.tabType=='notices'){
				this.urlResponse = this.urlResponse[0].procnotices;
				if(checkVal=='on-init'){
					this.dtTrigger.next();
				}			
			}
			
			if(this.tabType=='contract'){
				this.urlResponse = this.urlResponse[0].contract;
				
				if(checkVal=='on-init'){
					this.dtTrigger.next();
				}
			}			
			if(this.tabType=='plan'){
				let documentsArr = [];
				let documents = this.urlResponse[0].documents
				delete documents.facets;
				
				Object.keys(documents).forEach(function(key) {
					documentsArr.push(documents[key]);
				});
				
				documentsArr.sort(function(a,b){
					return new Date(b.docdt).getTime() - new Date(a.docdt).getTime();
				});
				this.urlResponse = documentsArr;
								
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
		let excelJsonArrayElements= {};	 		

		this.http.get(this.inputApiUrl+'&rows=500'+'&project_id=' + this.projectId+'&apilang='+ this.locale).subscribe((response:any)=> {	
			if(response.total>0){
			excelUrlResponse.push(response);
			this.excelUrlResponse = excelUrlResponse;
			
			if(this.tabType=='notices'){
				this.excelName='NoticeSearchResults';
				this.excelUrlResponse = this.excelUrlResponse[0].procnotices;
				
				this.excelUrlResponse.forEach((index) => {  
					excelJsonArrayElements = {
						bid_description: (index.supp_name===undefined?index.project_name:index.bid_description),						
						notice_type: index.notice_type,
						notice_status: index.notice_status,						
						submission_date: DateFormatPipe.prototype.transform(index.submission_date,this.locale),
					}				
				excelJsonArrayResponse.push(excelJsonArrayElements);
				});
				this.excelJsonArrayResponse = excelJsonArrayResponse;			
				this.excelService.exportNoticesExcelFile(this.excelJsonArrayResponse, this.excelName, this.tableHeaders); 				
			}
			
			if(this.tabType=='contract'){
		    	this.excelName='ContractSearchResults';
				this.excelUrlResponse = this.excelUrlResponse[0].contract;
				
				this.excelUrlResponse.forEach((index) => {  
					excelJsonArrayElements = {
						contr_id: index.contr_id,
						contr_desc: index.contr_desc,
						procu_meth_text: index.procu_meth_text,
						procurement_group_desc: index.procurement_group_desc,
						contr_refnum: index.contr_refnum,
						supp_name: (index.supp_name===undefined?'':index.supp_name[0]),
						supplier_countryshortname: (index.supplier_countryshortname===undefined?'':index.supplier_countryshortname[0]),
						contr_no_obj_dat: index.contr_no_obj_dat,
						contr_sgn_date: index.contr_sgn_date,
						total_contr_amnt: index.total_contr_amnt,

					}				
				excelJsonArrayResponse.push(excelJsonArrayElements);
				});
				this.excelJsonArrayResponse = excelJsonArrayResponse;				
				this.excelService.exportContractExcelFile(this.excelJsonArrayResponse, this.excelName, this.contractExcelTableHeaders, this.projectId); 				
			}			
			if(this.tabType=='plan'){
						
		    	this.excelName='Plans';
				this.excelUrlResponse = this.excelUrlResponse[0].documents;

				 for (var planIdObject in this.excelUrlResponse) {
					if(planIdObject!='facets'){
						excelPlanTabResponse.push(this.excelUrlResponse[planIdObject]);
					}
				 }
				this.excelUrlResponse = excelPlanTabResponse;

                this.excelUrlResponse.forEach((index) => {  									
					excelJsonArrayElements = {
						col: index.display_title,
						date: DateFormatPipe.prototype.transform(index.docdt,this.locale),
						reportno:index.repnb,
						docty:index.docty
					}				
					excelJsonArrayResponse.push(excelJsonArrayElements);
				});
				
				this.excelJsonArrayResponse = excelJsonArrayResponse;				
				this.excelService.exportPlanExcelFile(this.excelJsonArrayResponse, this.excelName, this.tableHeaders); 


			}
			}
		});
		
	}
	public onSort(tableHeaderValue) {
	
		this.order=tableHeaderValue;
		this.reverse=!this.reverse
	}
	

	public onScrollToTop() {
		window.scrollTo(0, 0);		
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
