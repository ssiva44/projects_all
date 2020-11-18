import { Component, OnInit, Input, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as moment from 'moment';
import { ExcelService } from "../services/excel.service";
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import {CommonService} from '../../common.service';
@Component({
  selector: 'finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.css'],
  providers: [ExcelService],
  animations: [
    trigger('fadeInOut', [
    state('load', style({ height: "0px", display: "none" })),
    state('in', style({ height: "0px", display: "none", opacity: 0.1 })),
    state('out', style({ height: "*", display: "block", opacity: 1 })),
    transition("in <=> out", animate(500)),			
    transition("out <=> load", animate(500))			
      ]),
      trigger('footNoteFadeInOut', [
    state('false', style({ height: "0px", display: "none" })),
    state('true', style({ height: "*", display: "block" })),
    transition("false <=> true", animate(200))			
  ])		
  ]  
})
export class FinancesComponent implements OnInit {

  @Input() apiResponse: any;
  @Input() projectCode: string;
  @Input() locale: string;    

  fadeInOut: string;            
  dtOptions: any = {};    
  allLocales: any = {};
  jsonLocales: any = {};
  isResponse: boolean;  
  isCollapse: boolean; 
  finances: string;   
  financePlanningTitle: string;    
  financePlanningHeaders: any[] = [];
  financePlanning: any[] = [];
  isFinancePlanning: boolean = true;
  istotalProjectFinancing: boolean;
  totalProjectFinancingTitle: string;
  totalProjectFinancingHeaders1: any[] = [];
  totalProjectFinancingHeaders2: string;
  totalProjectFinancing1: any[] = [];
  totalProjectFinancing2: any[] = [];
  summaryFinancingTitle: string;
  summaryFinancingHeaders: any[] = [];
  summaryFinancing: any[] = [];
  summaryFinancingExcel: any[] = [];
  isSummaryFinancing: boolean = true;
  detailedFinancialTitle: string;
  detailedFinancialHeaders: any[] = [];
  detailedFinancial: any[] = []; 
  detailedFinancialExcel: any[] = [];
  isDetailedFinancial: boolean = true;
  download: string;
  reverse: boolean = false;
  descriptions: string;
  showMoreOrLessIcon: string;
  noData: string;
  footNoteAnimation: boolean = false;
  lendingInstrument: string;
  sortDir=1;
  constructor(private excelService: ExcelService,private http:HttpClient,private service:CommonService) {
    this.getScreenSize();
    
    this.jsonLocales = { en: '', es: '_SPA', fr: '_FRE', pt: '_POR', ru: '_RUS', ar: '_ARA', zh: '_CHI' };
    this.allLocales = {
        en : {
            finances : 'Finances',
            financePlanning : {
                title : 'Financing Plan At Board Presentation (US$ Millions)',
                tableHeaders : ['Financier', 'Commitments']
            },
            totalProjectFinancing : {
                title : 'Total Project Financing (US$ Millions)',
                tableHeaders1 : ['Product Line', 'IBRD/IDA'],
                tableColumn1 : ['IBRD Commitment', 'IDA Commitment', 'IBRD + IDA Commitment'],
                tableHeaders2 : 'Lending Instrument',
                tableColumn2 : ['Grant Amount', 'Total Project Cost**']
            },
            summaryFinancing : {
                title : 'Summary Status of World Bank Financing (US$ Millions) as of',
                tableHeaders : ['Financier', 'Approval Date', 'Closing Date', 'Principal', 'Disbursed', 'Repayments', 'Interest, Charges & Fees']
            },
            detailedFinancial: {
                title : 'Detailed Financial Activity as of',
                tableHeaders : ['Period', 'Financier', 'Transaction Type', 'Amount (US$)']
            },
            noData : 'No data available.',
            emptyProperty : 'N/A',
            download : 'Download',
            descriptions: [
                '*The financial data in this block are updated on a monthly basis. For more information on World Bank lending by country please visit the <a href="http://web.worldbank.org/WBSITE/EXTERNAL/PROJECTS/0,,menuPK:64383817~pagePK:64387457~piPK:64387543~theSitePK:40941,00.html">Country Lending Summaries</a>.',
                //'**Total project cost includes funding from World Bank and non-bank sources in US$ millions. Active and Closed projects show commitment at Board approval. It does not reflect any cancellations. Proposed (pipeline) and dropped projects show the forecast amount. The commitment amount for projects in the pipeline is indicative and may be modified during the project preparation.',
                '** Principal refers to the original US dollar amount of the loan, credit, or grant that was committed and approved. Disbursements represent increases in the balance outstanding due to payments made to borrowers, as well as capitalized charges (such as loan origination fees on IBRD loans). Repayments refer to the total principal amount paid or prepaid to IBRD or IDA in US dollars, calculated at the exchange rate on the value date of the individual repayment. Repayments include payments made by borrowers, debt relief provided by IDA, and payments made by third parties on behalf of the borrowers. The disbursed amount less the repaid amount, for loans and credits, may not equal the loan or credit balance outstanding due to exchange rate movements.'
            ]                                            
        },
        es : {
            finances : 'Finanzas',
            financePlanning : {
                title : 'Financiamiento total del proyecto (millones de US$)',
                tableHeaders : ['Entidad De Financiamiento', 'Compromisos']
            },
            totalProjectFinancing : {
                title : 'Financiamiento total del proyecto (millones de US$)',
                tableHeaders1 : ['Línea de productos', 'BIRF/AIF'],
                tableColumn1 : ['Compromiso del BIRF', 'Compromiso de la AIF', 'Compromiso del BIRF + AIF'],
                tableHeaders2 : 'Instrumento de Financiamiento',
                tableColumn2 : ['Monto a título de donación', 'Costo total del proyecto**']
            },
            summaryFinancing : {
                title : 'Resumen del financiamiento del Banco Mundial (millones de US$) al',
                tableHeaders : ['Entidad De Financiamiento', 'Fecha De Aprobación', 'Fecha De Cierre', 'Principal', 'Desembolsado', 'Reembolsos', 'Intereses Y Cargos']
            },
            detailedFinancial: {
                title : 'Actividad financiera detallada al',
                tableHeaders : ['Período', 'Entidad De Financiamiento', 'Tipo De Transacción', 'Monto (US$)']
            },
            noData : 'No hay datos disponibles.',
            emptyProperty : 'No Disponible',
            download : 'Exportar',
            descriptions: [
                '*Para mayor información sobre el financiamiento otorgado por el Banco Mundial a los países, visite el sitio <a href="http://web.worldbank.org/WBSITE/EXTERNAL/BANCOMUNDIAL/PROJECTSSPA/0,,menuPK:2805151~pagePK:64387457~piPK:64817073~theSitePK:2748767,00.html">Resúmenes financiamiento a los países</a>.',
                //'**El costo total del proyecto incluye el financiamiento del Banco Mundial y otras fuentes en millones de US$. Los proyectos activos y cerrados muestran el monto del compromiso al momento de ser aprobados por el Directorio. Esto no refleja ninguna cancelación. Los proyectos propuestos (en tramitación) y los abandonados muestran el monto previsto. El monto del compromiso para los proyectos en tramitación es indicativo y podría ser modificado durante la preparación de un proyecto.',
                '**Capital se refiere al monto original en US$ del préstamo, crédito o donación comprometido y aprobado. Los desembolsos representan aumentos en el saldo pendiente debido a pagos hechos a los prestatarios, así como cargos capitalizados (como comisiones de tramitación del préstamo en el caso del BIRF). Reembolsos se refiere al monto total del capital pagado o prepagado al BIRF o la AIF en US$, calculados según la tasa de cambio en la fecha del valor del reembolso particular. Estos reembolsos incluyen pagos hechos por prestatarios, alivio de la deuda proporcionado por la AIF y pagos hechos por terceros en nombre de los prestatarios. El monto desembolsado menos la cantidad reembolsada, en el caso de préstamos y créditos, no puede ser igual al saldo pendiente del préstamo o crédito debido a las variaciones del tipo de cambio.'
            ]
        },
        fr : {
            finances : 'Finances',
            financePlanning : {
                title : 'Plan De Financement Envisagé À La Date De Présentation Au Conseil (Millions De Dollars)',
                tableHeaders : ['Org. De Financement', 'Engagements']
            },
            totalProjectFinancing : {
                title : 'Financement total du projet (USD millions)',
                tableHeaders1 : ['Type de produit/service', 'BIRD/IDA'],
                tableColumn1 : ['Engagement BIRD', 'Engagement IDA', 'Engagement BIRD + IDA'],
                tableHeaders2 : 'Instrument de prêt',
                tableColumn2 : ['Élément don', 'Coût total du projet**']
            },
            summaryFinancing : {
                title : 'État récapitulatif du financement de la Banque (USD millions) au',
                tableHeaders : ['Org. De Financement', "Date D'approbation", 'Date De Cloture', 'Montant En Principal', 'Décaissé', 'Remboursements', 'Intérêts, Charges Et Commissions Financières']
            },
            detailedFinancial: {
                title : 'Activité financière détaillée au',
                tableHeaders : ['Période', 'Org. De Financement', 'Type De Transaction', 'Montant (USD)']
            },
            noData : 'Pas de données disponibles.',
            emptyProperty : 'N/D',
            download : 'Télécharger',
            descriptions: [
                '*Les données financières figurant ici sont mises à jour tous les mois. Pour plus de renseignements sur la ventilation par pays des activités de prêt de la Banque mondiale, veuillez visiter la page <a href="http://web.worldbank.org/WBSITE/EXTERNAL/ACCUEILEXTN/PROJECTSFRE/0,,menuPK:2804828~pagePK:64387457~piPK:64779258~theSitePK:2748750,00.html">État récapitulatif des financements par pays</a>.',
                //'**Le coût total du projet inclut l’ensemble des financements provenant de la Banque mondiale et d’autres sources, et est exprimé en millions de dollars. Pour les projets en cours et clos, le montant indiqué correspond à l’engagement pris à la date d’approbation par le Conseil. Il ne reflète aucune annulation. Pour les projets envisagés (en réserve) et abandonnés, le montant indiqué correspond au montant envisagé. Le montant des engagements pour les projets en réserve est donné à titre indicatif et est susceptible de changer en cours de préparation du projet.',
                '** Principal désigne le montant initial en équivalent dollars du prêt, crédit ou don engagé et approuvé. Décaissement correspond au solde non remboursé au titre des montants versés à l’emprunteur, ainsi qu’aux commissions capitalisées (par exemple, commissions sur prêts pour la BIRD). Remboursement désigne l’ensemble des montants en principal remboursés par anticipation et des remboursements normaux versés en dollars à la BIRD/IDA, calculés au taux de change en vigueur à la date de valeur des différents remboursements. Cela inclut les montants payés par les emprunteurs, les allégements de dette consentis par l’IDA et les paiements effectués par des tierces parties pour le compte des emprunteurs. Pour les prêts et crédits, la différence entre montant décaissé et montant remboursé peut ne pas être égale au solde non remboursé en raison des fluctuations de change.'
            ]
        },
        pt : {
            finances : 'Finanças',
            financePlanning : {
                title : 'Plano De Financiamento Na Apresentação Da Diretoria Executiva (US$ Milhões)',
                tableHeaders : ['Financiador', 'Compromissos']
            },
            totalProjectFinancing : {
                title : 'Financiamento total do projeto (US$ milhões)',
                tableHeaders1 : ['Linha de produtos', 'BIRD/AID'],
                tableColumn1 : ['Compromisso do BIRD', 'Compromissos da AID', 'Compromisso do BIRD + AID'],
                tableHeaders2 : 'Instrumento de empréstimo',
                tableColumn2 : ['Montante do subsídio', 'Custo total do projeto**']
            },
            summaryFinancing : {
                title : 'Resumo da situação do financiamento do Banco Mundial (em US$ milhões) em',
                tableHeaders : ['Financiador', 'Data Da Aprovação', 'Data De Encerramento', 'Principal', 'Desembolsado', 'Pagamentos', 'Juros, Custos E Taxas']
            },
            detailedFinancial: {
                title : 'Atividade financeira detalhada em',
                tableHeaders : ['Período', 'Financiador', 'Tipo De Transção', 'Montante (US$)']
            },
            noData : 'Não há dados disponíveis',
            emptyProperty : 'N/A',
            download : 'Baixar',
            descriptions: [
                '*Os dados financeiros deste bloco são atualizados mensalmente. Para obter informações mais detalhadas sobre empréstimos pelo Banco Mundial por país, favor consultar o website <a href="http://web.worldbank.org/WBSITE/EXTERNAL/PROJECTS/0,,menuPK:64383817~pagePK:64387457~piPK:64387543~theSitePK:40941,00.html">Country Lending Summaries</a>.',
                //'**O custo total de um projeto inclui financiamento do Banco Mundial e de outras fontes não bancárias em US$ milhões. Projetos ativos e encerrados indicam o compromisso na aprovação por parte da Diretoria. Isto não reflete nenhum cancelamento. Projetos propostos (em tramitação) e rejeitados mostram o montante previsto. O montante comprometido para projetos em tramitação tem caráter indicativo e pode ser alterado durante a preparação do projeto.',
                '** O principal refere-se ao montante original em US$ do empréstimo, crédito ou subsídio comprometido e aprovado. Os desembolsos representam aumentos no saldo pendente em decorrência de pagamentos feitos a mutuários, bem como custos capitalizados (tais como taxas por tramitação do empréstimo concedidos pelo BIRD). Pagamentos referem-se ao montante total do principal pago ou pré-pago ao BIRD ou à AID em US$, calculado à taxa de câmbio na data de valor do pagamento individual. Os pagamentos incluem pagamentos feitos por mutuários, alívio da dívida proporcionado pela AID e pagamentos feitos por terceiros em nome dos mutuários. O montante desembolsado menos o montante pago a título de empréstimos e créditos poderá não ser igual ao saldo do empréstimo ou crédito devido aos movimentos da taxa de câmbio.'
            ]
        },  
        ru : {
            finances : 'Финансы',
            financePlanning : {
                title : 'План Финансирования На Этапе Представления Совету Директоров (Млн Долл. США)',
                tableHeaders : ['Финансист', 'Объём Средств']
            },
            totalProjectFinancing : {
                title : 'Суммарный объем финансирования проектов',
                tableHeaders1 : ['Линия продукта', 'МБРР/МАР'],
                tableColumn1 : ['Зарезервированные средства МБРР', 'Зарезервированные средства МАР', 'Зарезервированные средства МБРР + МАР'],
                tableHeaders2 : 'Инструмент кредитования', 
                tableColumn2 : ['Сумма безвозмездной ссуды', 'Общая стоимость проекта**']
            },
            summaryFinancing : {
                title : 'Сводное состояние финансирования по линии Всемирного банка (млн. долл. США) по состоянию на',
                tableHeaders : ['Финансист', 'Дата Утверждения', 'Дата Закрытия', 'Основная Сумма', 'Освоено', 'Погашение', 'Проценты Пo Кредитам, Комиссионные И Сборы']
            },
            detailedFinancial: {
                title : 'Подробное описание финансовых операций по состоянию на',
                tableHeaders : ['Период', 'Финансист', 'Вид Операции', 'Сумма (ДОЛЛ. США)']
            },
            noData : 'Нет данных.',
            emptyProperty : 'Н/п',
            download : 'Загрузить',
            descriptions: [
                '*Финансовые данные, указываемые в настоящем разделе, обновляются раз в месяц. Более подробную информацию о кредитах Всемирного банка в разбивке по странам см. на следующей странице: <a href="http://web.worldbank.org/WBSITE/EXTERNAL/PROJECTS/0,,menuPK:64383817~pagePK:64387457~piPK:64387543~theSitePK:40941,00.html">Информация о кредитах, предоставленных стране </a>.',
                //'**Общая сумма средств в миллионах долларов США включает финансовые ресурсы, выделенные Всемирным банком и полученные из других источников. Информация об активных и закрытых проектах включает средства, зарезервированные во время утверждения Советом. Аннулированные суммы не указаны. По планируемым и прекращенным проектам показана прогнозируемая сумма. Сумма, зарезервированная на планируемые проекты, является предварительной и может быть изменена на стадии подготовки проекта.',
                '** Основная сумма – это первоначальная сумма займа, кредита, гранта в долларах США, которая была зарезервирована или одобрена. Выплаты кредитных средств представляют собой увеличение суммы, подлежащей погашению, в связи с перечислением денежных средств заемщикам, а также капитализируемые платежи за кредиты (например, комиссионные за организацию кредитов МБРР). Платежи в погашение займов и кредитов – суммы платежей в погашение основных сумм займов и кредитов, перечисленные в срок или досрочно на счета МБРР или МАР в долларах США, рассчитанные по курсу на дату зачисления данного платежа. Суммы платежей в погашение займов и кредитов учитывают и суммы списания долгов со стороны МАР, а также суммы, перечисляемые третьими лицами от имени заемщиков и в их интересах. Сумма предоставленных кредитных средств за вычетом погашенной суммы займов и кредитов из-за изменения валютных курсов, возможно, не будет в точности соответствовать непогашенному остатку задолженности по займу или кредиту.'
            ]
        },
        ar : {
            finances : 'المالية',
            financePlanning : {
                title : 'خطة التمويل عند عرضها على مجلس المديرين التنفيذيين (مليون دولار)',
                tableHeaders : ['الممول', '	الارتباطات']
            },
            totalProjectFinancing : {
                title : 'إجمالي تمويل المشروع (بملايين الدولارات)',
                tableHeaders1 : ['نوع الأداة', 'البنك الدولي للإنشاء والتعمير/المؤسسة الدولية للتنمية'],
                tableColumn1 : ['ارتباط مقدم من البنك الدولي للإنشاء والتعمير', 'ارتباط مقدم من المؤسسة الدولية للتنمية', 'ارتباط مقدم من البنك الدولي للإنشاء والتعمير + المؤسسة الدولية للتنمية'],
                tableHeaders2 : 'أداة إقراض',
                tableColumn2 : ['مبلغ المنحة', 'التكلفة الكلية للمشروع**']
            },
            summaryFinancing : {
                title : 'ملخص عن وضع التمويل المقدم من البنك الدولي (بملايين الدولارات)',
                tableHeaders : ['الممول', 'تاريخ الموافقة', 'تاريخ الإقفال', 'أصل القرض', 'المدفوع من القرض', 'الدفعات', 'الفائدة والرسوم والمصاريف']
            },
            detailedFinancial: {
                title : 'نشاط مالي تفصيلي في',
                tableHeaders : ['فترة', 'الممول', 'نوع العملية', '(المبلغ (بالدولار']
            },
            noData : 'لا تتوفر بيانات.',
            emptyProperty : 'غير متاح',
            download : 'تحميل',
            descriptions: [
                '*يتم تحديث البيانات المالية في هذه المجموعة على أساس شهري. للمزيد من المعلومات حول إقراض البنك الدولي حسب البلدان، يرجى زيارة الموقع: <a href="http://web.worldbank.org/WBSITE/EXTERNAL/PROJECTS/0,,menuPK:64383817~pagePK:64387457~piPK:64387543~theSitePK:40941,00.html">ملخصات الإقراض القطري</a>.',
                //'**تشمل التكلفة الكلية للمشروع التمويل المقدم من البنك الدولي وأية مصادر غير مصرفية بملايين الدولارات. وتظهر المشروعات الجارية والمقفلة قيمة الارتباط وقت موافقة المجلس عليها. ولا تُظهر أية إلغاءات. وتظهر المشروعات المقترحة (الجاري إعدادها) والمشروعات المسقطة المبلغ المتوقع. علماً بأن مبلغ الارتباط الخاص بالمشروعات الجاري إعدادها هو مبلغ تأشيري، ويمكن تعديله أثناء مرحلة إعداد المشروع.',
                '** الأصل يشير إلى المبلغ الأصلي للقرض أو الاعتماد أو المنحة بالدولار والذي تم الارتباط بدفعه وإقراره. تمثل المبالغ المنصرفة الزيادات في الرصيد القائم الم��تحق نتيجة للمبالغ المدفوعة للمقترضين، وكذلك رسملة الرسوم (مثل رسم تصدير القرض على قروض البنك الدولي للإنشاء والتعمير). إجمالي المبالغ المسددة تشير إلى إجمالي مبلغ أصل القرض الذي سدد في مواعيد الاستحقاق أو قبلها للبنك الدولي للإنشاء والتعمير أو للمؤسسة الدولية للتنمية بالدولار، ويتم حسابها بسعر الصرف في تاريخ القيمة الخاص بالمبالغ الفردية المسددة. تشتمل المبالغ المسددة على مدفوعات قدمها المقترضون، وشطب الديون من جانب المؤسسة الدولية للتنمية، ومدفوعات قدمها طرف ثالث بالنيابة عن المقترض. المبالغ المنصرفة مخصوما منها المبالغ المسددة، للقروض والاعتمادات، ربما لا تعادل رصيد القرض أو الاعتماد القائم بسبب تحركات أسعار الصرف.'
            ]
        },
        zh : {
            finances : '财政',
            financePlanning : {
                title : '提交执董会时的融资计划 (美元（百万）)',
                tableHeaders : ['融资方', '承诺额']
            },
            totalProjectFinancing : {
                title : '项目融资总额（美元，百万）',
                tableHeaders1 : ['产品线', '国际复兴开发银行/国际开发协会'],
                tableColumn1 : ['IBRD承诺额', 'IDA承诺额', 'IBRD和IDA承诺额'],
                tableHeaders2 : '贷款工具',
                tableColumn2 : ['赠款总额', '项目总成本**']
            },
            summaryFinancing : {
                title : '世界银行融资现状概要（百万美元） 截至',
                tableHeaders : ['融资方', '批准日期', '关闭日期', '本金', '已支付金额', '还款', '利息、收费及其他费用']
            },
            detailedFinancial: {
                title : '财务活动详细信息 截至',
                tableHeaders : ['期', '融资方', '交易类型', '金额（美元）']
            },
            noData : '暂无数据',
            emptyProperty : '暂无数据',
            download : '下载',
            descriptions: [
                '*了解更多世界银行在各国的贷款信息，请访问世界银行 <a target="_blank" href="http://web.worldbank.org/WBSITE/EXTERNAL/PROJECTS/0,,menuPK:64383817~pagePK:64387457~piPK:64387543~theSitePK:40941,00.html">国别贷款概揽</a>.',
                //'**对于再建项目和已完成的项目，执董会批准的承诺额以百万美元为单位显示，不包括取消的部分。准备中和取消的项目显示的是预计的金额。准备中项目的承诺额是预计的，在项目准备过程中有可能修改。',
                '** 本金指的是已承诺并批准的贷款、信贷或赠款的原始美元金额。支付额指的是向借款人支付以及资本费用（如国际复兴开发银行贷款的贷款手续费）所带来未偿还余额的增加。还款额指的是向国际复兴开发银行或国际开发协会支付或预支付的本金美元总额，按每笔还款交割日的汇率计算。还款额包括借款人的还款、国际开发协会提供的债务减免以及由第三方代表借款人的还款。对于贷款和信贷，由于汇率变动，支付额减去还款额可能与贷款或信贷的未偿还余额不相等。'
            ]
        }
    }       
}   

ngOnInit(): void {
  this.dtOptions = {
      //"scrollY": "250px",
      //"scrollCollapse": true,
      paging: false,            
      info: false,
      searching: false,            
      order: []                   
  };
}
ngOnChanges() {   
  // this.http.post(this.apiResponse, '').subscribe((apiResponse:any) => {  
         
  //   if (apiResponse.projects.hasOwnProperty(this.projectCode)) { 
    this.service.changeSummaryResults.subscribe((apiResponse:any) => {
      
        if (apiResponse) {      
                                                          
      this.isResponse = true;
      this.finances = this.allLocales[this.locale].finances;
      this.download = this.allLocales[this.locale].download; 
      this.descriptions = this.allLocales[this.locale].descriptions;     
      this.noData = this.allLocales[this.locale].noData;     
      
      let projectDetails = apiResponse.projects[this.projectCode];

      var d = new Date();
      d.setDate(1);            
      d.setDate(d.getDate() - 1);

      //Financing Plan
      this.financePlanningTitle = this.allLocales[this.locale].financePlanning.title;
      this.financePlanningHeaders = this.allLocales[this.locale].financePlanning.tableHeaders; 

      if (projectDetails.hasOwnProperty('lendinginstr'))
      {
          this.lendingInstrument = projectDetails.lendinginstr;
      }
      
     
                            
      if (projectDetails.hasOwnProperty('fincrname') && projectDetails.hasOwnProperty('fincr_curr_amt')) {                
          let financers = projectDetails.fincrname;                                                        
          let financierAmount = projectDetails.fincr_curr_amt;

          if (financers.length == financierAmount.length) {
              financers.forEach((element, index) => {
                  this.financePlanning.push({name: financers[index], amount: financierAmount[index]});
              });                   
          } else
              this.financePlanning.push({name: this.allLocales[this.locale].noData, amount: ''});                        
      } else {
          this.isFinancePlanning = false;
      }
      
      //Total Project Financing
      this.totalProjectFinancingTitle = this.allLocales[this.locale].totalProjectFinancing.title;
      this.totalProjectFinancingHeaders1 = this.allLocales[this.locale].totalProjectFinancing.tableHeaders1;
      this.totalProjectFinancingHeaders2 = this.allLocales[this.locale].totalProjectFinancing.tableHeaders2;
           
      this.totalProjectFinancing1.push({key: this.allLocales[this.locale].totalProjectFinancing.tableColumn1[0], value: (projectDetails.ibrdcommamt == 0 || projectDetails.ibrdcommamt == undefined) ? this.allLocales[this.locale].emptyProperty : this.convertCurrency(projectDetails.ibrdcommamt)});
      this.totalProjectFinancing1.push({key: this.allLocales[this.locale].totalProjectFinancing.tableColumn1[1], value: (projectDetails.idacommamt == 0 || projectDetails.idacommamt == undefined) ? this.allLocales[this.locale].emptyProperty : this.convertCurrency(projectDetails.idacommamt)});
      this.totalProjectFinancing1.push({key: this.allLocales[this.locale].totalProjectFinancing.tableColumn1[2], value: (projectDetails.totalamt == 0 || projectDetails.totalamt == undefined) ? this.allLocales[this.locale].emptyProperty : this.convertCurrency(projectDetails.totalamt)});

      this.totalProjectFinancing2.push({key: this.allLocales[this.locale].totalProjectFinancing.tableColumn2[0], value: (projectDetails.grantamt == 0 || projectDetails.grantamt == undefined) ? this.allLocales[this.locale].emptyProperty : this.convertCurrency(projectDetails.grantamt)});
      this.totalProjectFinancing2.push({key: this.allLocales[this.locale].totalProjectFinancing.tableColumn2[1], value: (projectDetails.lendprojectcost == 0 || projectDetails.lendprojectcost == undefined) ? this.allLocales[this.locale].emptyProperty : this.convertCurrency(projectDetails.lendprojectcost)});                                  

      //Summary Status of World Bank Financing 
      this.summaryFinancingTitle = this.allLocales[this.locale].summaryFinancing.title + " " + this.getFormateDate(d, this.locale, false);  
      this.summaryFinancingHeaders = this.allLocales[this.locale].summaryFinancing.tableHeaders;                                                                           
      let financierArrary = projectDetails.hasOwnProperty('financier') ? projectDetails.financier : [];            
      let approvalDate, approvalDateExcel, closingDate, closingDateExcel;
      if (projectDetails.hasOwnProperty('boardapprovaldate')) {
          approvalDate = this.getFormateDate(projectDetails.boardapprovaldate, this.locale, false);
          approvalDateExcel = this.getFormateDate(projectDetails.boardapprovaldate, this.locale, true);
      } else {
          approvalDate = approvalDateExcel = '';
      }
      if (projectDetails.hasOwnProperty('closingdate')) {
          closingDate = this.getFormateDate(projectDetails.closingdate, this.locale, false);
          closingDateExcel = this.getFormateDate(projectDetails.closingdate, this.locale, true);
      } else {
          closingDate = closingDateExcel = '';
      }
      
      let commitment = 'commitment' + this.jsonLocales[this.locale];            
      let princpalArrary = projectDetails.hasOwnProperty(commitment) ? projectDetails[commitment] : [];
      let disbursement = 'disbursement' + this.jsonLocales[this.locale];            
      let disbursementArrary = projectDetails.hasOwnProperty(disbursement) ? projectDetails[disbursement] : [];
      let repayment = 'repayment' + this.jsonLocales[this.locale];            
      let repaymentArrary = projectDetails.hasOwnProperty(repayment) ? projectDetails[repayment] : [];
      let interestandcharges = 'interestandcharges' + this.jsonLocales[this.locale];            
      let interestandchargesArrary = projectDetails.hasOwnProperty(interestandcharges) ? projectDetails[interestandcharges] : [];            
      
      if (financierArrary.length == 0) {
          this.isSummaryFinancing = false;                
      } else {
          financierArrary.sort((a, b) => a.localeCompare(b));
          financierArrary.forEach((name, index) => {                               
              this.summaryFinancing.push({                            
                  name : name,
                  approvalDate : approvalDate,
                  closingDate : closingDate,
                  principal :  princpalArrary[index] == undefined ? '': princpalArrary[index],
                  disbursed : disbursementArrary[index] == undefined ? '' : disbursementArrary[index],
                  repayments : (repaymentArrary[index] == '0.00' || repaymentArrary[index] == undefined) ? this.allLocales[this.locale].emptyProperty : repaymentArrary[index],
                  interests : (interestandchargesArrary[index] == '0.00' || interestandchargesArrary[index] == undefined) ? this.allLocales[this.locale].emptyProperty : interestandchargesArrary[index]
              }); 
              this.summaryFinancingExcel.push({                            
                  [this.summaryFinancingHeaders[0]] : name,
                  [this.summaryFinancingHeaders[1]] : approvalDateExcel,
                  [this.summaryFinancingHeaders[2]] : closingDateExcel,
                  [this.summaryFinancingHeaders[3]] : princpalArrary[index] == undefined ? '': princpalArrary[index],
                  [this.summaryFinancingHeaders[4]] : disbursementArrary[index] == undefined ? '' : disbursementArrary[index],
                  [this.summaryFinancingHeaders[5]] : (repaymentArrary[index] == '0.00' || repaymentArrary[index] == undefined) ? '0.00' : repaymentArrary[index],
                  [this.summaryFinancingHeaders[6]] : (interestandchargesArrary[index] == '0.00' || interestandchargesArrary[index] == undefined) ? '0.00' : interestandchargesArrary[index]
              });                                                     
          }); 
          
      }            

      //Detailed Financial
      this.detailedFinancialTitle = this.allLocales[this.locale].detailedFinancial.title + " " + this.getFormateDate(d, this.locale, false);  
      this.detailedFinancialHeaders = this.allLocales[this.locale].detailedFinancial.tableHeaders;
      let period = 'period' + this.jsonLocales[this.locale];
      let periodArray = projectDetails.hasOwnProperty(period) ? projectDetails[period] : [];
      let financierLoan = 'financier_loan' + this.jsonLocales[this.locale];
      let financierLoanArray = projectDetails.hasOwnProperty(financierLoan) ? projectDetails[financierLoan] : [];
      let transactiontype = 'transactiontype' + this.jsonLocales[this.locale];
      let transactiontypeArray = projectDetails.hasOwnProperty(transactiontype) ? projectDetails[transactiontype] : [];                    
      let amount = 'amount' + this.jsonLocales[this.locale];
      let amountArray = projectDetails.hasOwnProperty(amount) ? projectDetails[amount] : [];            
      
      if (periodArray.length == 0) {
          this.isDetailedFinancial = false;
      } else {
          periodArray.forEach((period, index) => {                
              this.detailedFinancial.push({
                  period: period, 
                  financierLoan: financierLoanArray[index] == undefined ? '' : financierLoanArray[index],
                  transactionType: transactiontypeArray[index] == undefined ? '' : transactiontypeArray[index],
                  amount: amountArray[index] == undefined ? this.allLocales[this.locale].emptyProperty : this.toCurrency(Number(amountArray[index]))
              });
              this.detailedFinancialExcel.push({
                  [this.detailedFinancialHeaders[0]]: period, 
                  [this.detailedFinancialHeaders[1]]: financierLoanArray[index],
                  [this.detailedFinancialHeaders[2]]: transactiontypeArray[index],
                  [this.detailedFinancialHeaders[3]]: amountArray[index] == undefined ? this.allLocales[this.locale].emptyProperty : this.toCurrency(Number(amountArray[index]))
              });
          });   
      }            
  }   
//}
  });                       
} 

onFootNotes(footNoteAnimation) {
  this.footNoteAnimation = footNoteAnimation;
}

@HostListener('window:resize', ['$event'])
getScreenSize(event?) {
  if (window.innerWidth >= 320 && window.innerWidth <= 768) {
      this.isCollapse = true;
      this.fadeInOut = 'load';
  } else {
      this.isCollapse = false;
      this.fadeInOut = 'out';
  }
  this.showMoreOrLessIcon = this.isCollapse ? 'fa fa-angle-down' : 'fa fa-angle-up';
}

getFormateDate(date, locale, isExcel) {
  let m = moment.utc(date);
  let formatedDate = '';
  if (isExcel) {
      formatedDate = m.format('YYYY-MM-DD');
  } else {
      if (locale === 'en') 
          formatedDate = m.locale(locale).format('MMMM D, YYYY');
      else if (locale === 'es' || locale === 'pt')            
          formatedDate = m.locale(locale).format('D [de] MMMM [de] YYYY');
      else if (locale === 'fr')
          formatedDate = m.locale(locale).format('D MMMM YYYY');
      else if (locale === 'ru')
          formatedDate = m.locale(locale).format('D MMMM YYYY [года]');
      else if (locale === 'ar')            
          formatedDate = m.format('YYYY[/]MM[/]DD');
      else if (locale === 'zh')            
          formatedDate = m.format('YYYY[年]M[月]D[日]');
  }                 
  return formatedDate;
}

convertCurrency (currency) {                        
  return (Math.abs(Number(currency.replace(/\,/g,''))) / 1.0e+6).toFixed(2);             
}  

toCurrency(n) {
  return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

onDownloadExcel(type) {        
  if (type === 'summaryFinancing')                     
      this.excelService.exportAsExcelFile(this.summaryFinancingExcel, this.projectCode, 'WB funding status - ' + this.projectCode);
  else if (type === 'detailedFinancial')            
      this.excelService.exportAsExcelFile(this.detailedFinancialExcel, this.projectCode, 'WB financiers - ' + this.projectCode);
}

onLoadMore(collapse) {        
  this.isCollapse = collapse;
  this.fadeInOut = this.isCollapse ? 'in' : 'out';
  this.showMoreOrLessIcon = this.isCollapse ? 'fa fa-angle-down' : 'fa fa-angle-up';        
}
public onSort() {
    this.reverse=!this.reverse
}

sortArr(colName:any){
    this.detailedFinancial.sort((a,b)=>{
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
      this.detailedFinancialHeaders[index] + ' <span class="fa fa-chevron-down arrow_up" ></span>' : 
      '<span class="fa fa-chevron-down arrow_up" ></span>';
      this.sortDir=-1;
    } else {
     target.innerHTML = (target.tagName!='SPAN') ? 
     this.detailedFinancialHeaders[index] + ' <span class="fa fa-chevron-up arrow_up" ></span>' : 
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
