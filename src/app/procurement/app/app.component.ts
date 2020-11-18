import { Component, OnInit,ElementRef } from '@angular/core';
import {CommonService} from '../../common.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'procurementApp',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [    	
		trigger('footNoteFadeInOut', [
			state('false', style({ height: "0px", display: "none" })),
			state('true', style({ height: "*", display: "block" })),
		  transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))			
		])
	] 
})
export class AppComponent implements OnInit {

  imagePath: string;
	 domain: string;
	 projectId: string;

	 noticesTableHeaders:any;
	 contractsTableHeaders: any;
	 planTableHeaders: any;
	 
	 noticesTableHeadersGroup: any = {}; 
	 contractsTableHeadersGroup: any = {}; 
	 planTableHeadersGroup: any = {}; 
	 
	 locale: string;
	 
	 noticesApiUrl: string;
	 contractsApiUrl: string;	
	 planApiUrl: string;	
	 
	 noticesLabel: string;
	 contractsLabel: string;
	 plansLabel: string;
	 
	 noticesLabelGroup: any = {}; 	 
	 contractsLabelGroup: any = {};	 
	 plansLabelGroup: any = {}; 
	 
	 loadMoreLabel: string;
	 loadMoreLabelGroup: any = {}; 
	 
	 noticesErrorMessage: string; 
	 contractErrorMessage: string; 
	 planErrorMessage: string; 
	 
	 noticesErrorMessageGroup: any = {}; 	 
	 contractErrorMessageGroup: any = {};	 
	 planErrorMessageGroup: any = {}; 
	 
 	 downloadLabel: string;	 
	 downloadLabelGroup: any = {}; 	

 	 disclaimerText: string;	 
	 disclaimerTextGroup: any = {}; 
	 footNoteAnimation: boolean = false;
	 isTab1:boolean=true;	 
	 isTab2:boolean=false;
	 isTab3:boolean=false;
	 constructor(private element: ElementRef,private commonservice:CommonService){
    commonservice.changeClosingallStatus.subscribe((val:any) => {
      
      if (val) {
        this.imagePath = val.procurement_imagePath;
		this.locale = val.procurement_locale;
		this.domain = val.procurement_domain;
    this.projectId = val.procurement_projectId;
    this.noticesApiUrl=val.procurement_noticesApiUrl;
		this.contractsApiUrl=val.procurement_contractsApiUrl;
		this.planApiUrl=val.procurement_planApiUrl;
       
    this.noticesTableHeadersGroup = { 
			'en' : 'DESCRIPTION%%NOTICE TYPE%%STATUS%%PUBLISHED DATE',
			'es' : 'DESCRIPCIÓN%%TIPO DEL ANUNCIO%%ESTATUS%%FECHA DE PUBLICACIÓN',
			'fr' : 'DESCRIPTION%%TYPE D’AVIS%%ÉTAT%%DATE DE PUBLICATION',
			'ar' : 'الوصف%%نوع الإخطار%%الوضع%%تاريخ الإصدار',
			'zh' : '内容%%通知类型%%状态%%发布日期',
			'ru' : 'ОПИСАНИЕ%%ТИП УВЕДОМЛЕНИЯ%%СТАТУС%%ОПУБЛИКОВАННАЯ ДАТА',
			'pt' : 'DESCRIÇÃO%%TIPO DE NOTIFICAÇÃO%%SITUAÇÃO%%Data de publicação',
		}
		
		this.contractsTableHeadersGroup = {
			'en' : 'CONTRACT DESCRIPTION%%PROCUREMENT METHOD%%PROC. GROUP**%%SIGNING DATE%%AMOUNT*',
			'es' : 'DESCRIPCIÓN DEL CONTRATO%%Método de adquisiciones%%GRUPO DE ADQUISICIONES**%%FECHA DEL CONTRATO%%Monto (US$)*',
			'fr' : 'DESCRIPTION DU MARCHÉ/CONTRAT%%Mode de passation%%CATÉGORIE**%%DATE DE SIGNATURE%%MONTANT*',
			'ar' : 'وصف العقد%%أسلوب المشتريات%%فئة التوريد**%%تاريخ التوقيع%%المبلغ*',
			'zh' : '合同简介%%采购方法%%采购类别**%%签署日期%%金额*',
			'ru' : 'Описание контракта%%Метод закупок%%ГРУППА ПО ЗАКУПКАМ**%%ДАТА ПОДПИСАНИЯ%%СУММА*',
			'pt' : 'DESCRIÇÃO DE CONTRATOS%%Método de Aquisição%%GRUPO DE AQUISIÇÕES GRUPO**%%DATA DE ASSINATURA%%MONTANTE*',

		}
		
		this.planTableHeadersGroup = {
			'en' : 'DOCUMENT TITLE%%DATE%%REPORT NO.%%DOCUMENT TYPE',
			'es' : 'TÍTULO DEL DOCUMENTO%%FECHA%%INFORME NO.%%TIPO DE DOCUMENTO',
			'fr' : 'TITRE DU DOCUMENT%%DATE%%NO DE RAPPORT%%TYPE DE DOCUMENT',
			'ar' : 'مسمى الوثيقة%%التاريخ%%ت��رير رقم%%نوع الوثيقة',
			'zh' : '文件标题%% 日期%%报告编号%% 文件类别',
			'ru' : 'НАЗВАНИЕ ДОКУМЕНТА%%ДАТА%%ДОКЛАД  №%%Тип Документа',
			'pt' : 'TÍTULO DO DOCUMENTO%%DATA%%RELATÓRIO Nº%%TIPO DO DOCUMENTO',
		}
		
		this.noticesLabelGroup = {
			'en' : 'Notices',
			'es' : 'Anuncios',
			'fr' : 'Avis',
			'ar' : 'الإخطارات',
			'zh' : '通知',
			'ru' : 'Уведомления',
			'pt' : 'Notificações',
		}
		
		this.contractsLabelGroup = {
			'en' : 'Contracts',
			'es' : 'Contratos',
			'fr' : 'Contrats',
			'ar' : 'العقود',
			'zh' : '合同',
			'ru' : 'Контракты',
			'pt' : 'Contratos',
		}
		
		this.plansLabelGroup = {
			'en' : 'Plans',
			'es' : 'Plans',
			'fr' : 'Plans',
			'ar' : 'خطط',
			'zh' : '计划',
			'ru' : 'План',
			'pt' : 'Planos',
		}
		
		this.noticesErrorMessageGroup = {
			'en' : 'No Procurement Notices available for this project',
			'es' : 'No hay anuncios de adquisiciones disponibles para este proyecto.',
			'fr' : 'Il n’y a pas d’avis de passation de marché de disponible pour ce projet.',
			'ar' : 'لا تتوفر إخطارات توريد بالنسبة لهذا المشروع',
			'zh' : '此项目暂无采购通告',
			'ru' : 'Объявления о закупках по данному проекту отсутствуют',
			'pt' : 'Não há Notificações de Aquisições disponíveis para este projeto',
		}
		
		this.contractErrorMessageGroup = {
			'en' : 'No Contract Data available for this project',
			'es' : 'No hay datos sobre contratos disponibles para este proyecto.',
			'fr' : 'Il n’y a pas de données sur le marché de disponibles pour ce projet.',
			'ar' : 'لا تتوفر بيانات عن العقود بالنسبة لهذا المشروع',
			'zh' : '此项目暂无合同数据',
			'ru' : 'Данные по контрактам по этому проекту отсутствуют',
			'pt' : 'Não há Dados de Contrato disponíveis para este projeto',
		}

		this.planErrorMessageGroup = {
			'en' : 'No data available',
			'es' : 'No hay datos disponibles.',
			'fr' : 'Pas de données disponibles.',
			'ar' : 'لا تتوفر بيانات.',
			'zh' : '暂无数据',
			'ru' : 'Нет данных.',
			'pt' : 'Não há dados disponíveis',
		}
		
		this.disclaimerTextGroup = {
			'en' : '<p>*&nbsp;Contract amount in US$.<br>**&nbsp;Procurement Group: GO – Goods, CW – Civil Works,  CS – Consultants, NC – Non-Consulting Services.</p><p>Procurement notices for contracts procured through open international competition are also available in <a target="_blank" href="http://www.devbusiness.com/">UN Development Business</a>.</p><p>See more details on <a target="_self" href="http://www.worldbank.org/en/projects-operations/products-and-services/procurement-projects-programs">procurement processes</a> and the <a target="_self" href="http://www.worldbank.org/en/projects-operations/products-and-services/brief/monthly-operational-summary">Monthly Operational Summary</a>. To contact the implementing agency, open the most recent PID or PAD in the in the documents tab.</p>',		
			'es' : '<p>Para este proyecto no se han adjudicado contratos que cumplan los criterios para su inclusión en esta base de datos. Véanse más detalles sobre estos criterios en la <a href="http://web.worldbank.org/WBSITE/EXTERNAL/BANCOMUNDIAL/PROJECTSSPA/0,,menuPK:2805175~pagePK:95864~piPK:64625801~theSitePK:2748767,00.html">Base de datos de contratos adjudicados</a>.</p><p>*&nbsp;Monto del contrato en US$.<br>**&nbsp;Grupo de adquisiciones: GW - Goods and Works CS - Consultores.</p><p>Las notificaciones de adquisiciones para los contratos adquiridos a través de una licitación pública internacional también están disponibles en la <a target="_blank" href="http://www.devbusiness.com/">División de Desarrollo de las Naciones Unidas</a>.</p><p>Vea más información sobre <a target="_self" href="http://web.worldbank.org/WBSITE/EXTERNAL/PROJECTS/PROCUREMENT/0,,pagePK:84271~theSitePK:84266,00.html">procedimientos de adquisiciones</a> y el <a target="_self" href="http://web.worldbank.org/WBSITE/EXTERNAL/PROJECTS/PROCUREMENT/0,,contentMDK:50004501~menuPK:63001537~pagePK:84269~piPK:60001558~theSitePK:84266,00.html">Resumen mensual de operaciones</a>. Para contactar al organismo ejecutor, consulte la versión más reciente del documento de información del proyecto o del documento de evaluación inicial del mismo en la pestaña “documentos”.</p>',
			'fr' : "<p>Ce projet n'a donné lieu à l'attribution d'aucun marché ou contrat répondant aux critères voulus pour figurer dans cette base de données. Pour plus de renseignements, cliquez sur le lien suivant : <a href='http://web.worldbank.org/WBSITE/EXTERNAL/ACCUEILEXTN/PROJECTSFRE/0,,menuPK:2804924~pagePK:95864~piPK:64625794~theSitePK:2748750,00.html'></a>.À propos de la base de données sur les marchés/contrats attribués.</p><p>*&nbsp;Montant du marché/contrat en dollars.<br>**&nbsp;Catégorie de marché&nbsp;: GW = Fournitures et travaux&nbsp;; CS = Consultants</p><p>Les avis de passation des marchés attribués dans le cadre d'appels d'offres internationaux sont également disponibles sur le site <a target='_blank' href='http://www.devbusiness.com/'>Development Business</a> de l’ONU.</p><p>Pour plus de détails, reportez-vous aux pages <a target='_self' href='http://www.worldbank.org/en/projects-operations/products-and-services/procurement-projects-programs'>Passation des marchés et contrats</a> et <a target='_self' href='http://www.worldbank.org/en/projects-operations/products-and-services/brief/monthly-operational-summary'>Monthly Operational Summary</a>. Pour en savoir plus sur l'organisme d'exécution à contacter, reportez-vous au document d'information (PID) ou d'évaluation (PAD) le plus récent sur le projet, sous la rubrique Documents.</p>",
			'ar' : '<p>لا توجد بيانات عن إرساء العقود لهذا المشروع تستوفي معايير إدراجها في قاعدة ا��بيانات تلك. يرجى الاطلاع على نطاق قاعدة بيانات إرساء العقود للمزيد من التفاصيل.</p><p>*&nbsp;مبلغ العقد الدولارات الأمريكية<br>**&nbsp;فريق التوريدات: السلع والأشغال ـ الاستشاريون.</p><p>إشعارات التوريد الخاصة بالعقود المفتوحة الدولية متاحة أيضاً في الموقع: <a target="_blank" href="http://www.devbusiness.com/">نشرة الأمم المتحدة لأعمال التنمية</a>.</p><p>انظر المزيد من التفاصيل بشأن: <a target="_self" href="http://www.worldbank.org/en/projects-operations/products-and-services/procurement-projects-programs">إجراءات التوريد</a> و <a target="_self" href="http://www.worldbank.org/en/projects-operations/products-and-services/brief/monthly-operational-summary">نشرة العمليات الشهرية</a>. للاتصال بالهيئة المنفذة، افتح أحدث وثيقة لمعلومات المشروع أو وثيقة التقييم المسبق للمشروع في علامة التبويب الخاصة بالوثائق.</p>',
			'zh' : '<p>数据库中没有符合条件的该项目的合同授予信息。请参阅 <a href="http://web.worldbank.org/WBSITE/EXTERNAL/EXTCHINESEHOME/PROJECTSCHI/0,,menuPK:3535647~pagePK:95864~piPK:64778346~theSitePK:3535340,00.html">合同授予数据</a>库了解更多信息。</p><p>*&nbsp;合同金额以美元计。<br>**&nbsp;采购类别: GW - 货物与工程 CS - 咨询顾问</p><p>国际公开招标采购合同的采购通告也可参见联 <a href="http://www.devbusiness.com/">合国发展商业报</a></p><p>点击此处查阅更详细的 <a target="_self" href="http://www.worldbank.org/en/projects-operations/products-and-services/procurement-projects-programs">采购程序 (en)</a> 和 <a target="_self" href="http://www.worldbank.org/en/projects-operations/products-and-services/brief/monthly-operational-summary">月度业务概览(en)</a>. 欲与执行机构联系，请打开“概要"栏下最新的项目信息文件和项目评估文件。</p>',
			'ru' : '<p>По данному проекту нет присуждённых контрактов, которые отвечали бы критериям для включения в базу данных. Более подробную информацию можно получить, ознакомившись с положениями об охвате БД "Присуждённые контракты".</p><p>*&nbsp;Сумма контракта в долл. США<br>**&nbsp;Группа закупок: GW - товары и работы, CS - консультанты</p><p>Уведомления о закупках для контрактов, закупленных на открытом международном конкурсе, также доступны в <a target="_blank" href="http://www.devbusiness.com/">Организации развития Организации Объединенных Наций.</a>.</p><p>Более подробную информацию см. на следующей странице: <a target="_self" href="http://www.worldbank.org/en/projects-operations/products-and-services/procurement-projects-programs">процедуры закупок </a> и <a target="_self" href="http://www.worldbank.org/en/projects-operations/products-and-services/brief/monthly-operational-summary">Месячная сводка об операциях </a>. Для того чтобы связаться с учреждением-исполнителем, откройте самые последние PID или PAD на странице «документы».</p>',
			'pt' : '<p>NULO</p><p>*&nbsp;Montante do contrato em USD.<br>**&nbsp;Grupo de Aquisições: GW - Goods and Works CS - Consultants.</p><p>Os avisos de licitação para de contratos adquiridos por meio de concorrência internacional aberta também estão disponíveis em <a target="_blank" href="http://www.devbusiness.com/">United Nations Development Business</a>.</p><p>Mais detalhes podem ser consultados em <a target="_self" href="http://web.worldbank.org/WBSITE/EXTERNAL/PROJECTS/PROCUREMENT/0,,pagePK:84271~theSitePK:84266,00.html">procurement processes</a> and the <a target="_self" href="http://web.worldbank.org/WBSITE/EXTERNAL/PROJECTS/PROCUREMENT/0,,contentMDK:50004501~menuPK:63001537~pagePK:84269~piPK:60001558~theSitePK:84266,00.html">Monthly Operational Summary</a>. Para contatar a entidade executora, favor abrir o PID ou PAD mais recente na aba documentos.</p>'
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
		
		

		

		this.noticesLabel = this.noticesLabelGroup.hasOwnProperty(this.locale) ? this.noticesLabelGroup[this.locale] : {}
		this.contractsLabel = this.contractsLabelGroup.hasOwnProperty(this.locale) ? this.contractsLabelGroup[this.locale] : {}
		this.plansLabel = this.plansLabelGroup.hasOwnProperty(this.locale) ? this.plansLabelGroup[this.locale] : {}
		
		this.loadMoreLabel = this.loadMoreLabelGroup.hasOwnProperty(this.locale) ? this.loadMoreLabelGroup[this.locale] : {}
		
		this.noticesErrorMessage = this.noticesErrorMessageGroup.hasOwnProperty(this.locale) ? this.noticesErrorMessageGroup[this.locale] : {}
		this.contractErrorMessage = this.contractErrorMessageGroup.hasOwnProperty(this.locale) ? this.contractErrorMessageGroup[this.locale] : {}
		this.planErrorMessage = this.planErrorMessageGroup.hasOwnProperty(this.locale) ? this.planErrorMessageGroup[this.locale] : {}
		
		this.noticesTableHeaders = this.noticesTableHeadersGroup.hasOwnProperty(this.locale) ? this.noticesTableHeadersGroup[this.locale] : {}
		this.contractsTableHeaders = this.contractsTableHeadersGroup.hasOwnProperty(this.locale) ? this.contractsTableHeadersGroup[this.locale] : {}
		this.planTableHeaders = this.planTableHeadersGroup.hasOwnProperty(this.locale) ? this.planTableHeadersGroup[this.locale] : {}
		
		
		
		this.downloadLabel=this.downloadLabelGroup.hasOwnProperty(this.locale) ? this.downloadLabelGroup[this.locale] : {}
		
		this.disclaimerText=this.disclaimerTextGroup.hasOwnProperty(this.locale) ? this.disclaimerTextGroup[this.locale] : {}
			
      }
    });
   } 

  ngOnInit() {
    this.isTab1=true;
	this.isTab2=false;
	this.isTab3=false;
  }
  tab(istab,event){
	 
    $(".nav li a").removeClass('menu-active');
    event.target.classList.add('menu-active');
	this.isTab1=false;
	this.isTab2=false;
	this.isTab3=false;
	if(istab=="1"){
		this.isTab1=true;
	}else if(istab=="2"){
		this.isTab2=true;
	}else if(istab=="3"){
		this.isTab3=true;
	}
  }
  onFootNotes(footNoteAnimation) {
    this.footNoteAnimation = footNoteAnimation;
}
}
