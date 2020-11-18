export class I18nService {    
    public static LENDING_INDICATORS = {
        en : {
            title : 'World Bank Operations at a Glance',
            subTitle : 'Key lending indicators from the World Bank',
            chartTitle : 'Lending Commitments by Year',
            xtitle : 'Fiscal Year',
            ytitle : 'US$ Billions',                        
            pointFormat : 'Year: <b>{point.x}</b>, Amount: <b>US$ {point.y:.1f} Billion </b>'
        },
        es : {
            title : 'Un vistazo a las operaciones del Banco Mundial',
            subTitle : 'Indicadores clave de financiamiento del Banco Mundial',
            chartTitle : 'Financiamiento por año',
            xtitle : 'Ejercicio',
            ytitle : 'miles de millones de US$',                        
            pointFormat : 'Año: <b>{point.x}</b>, Monto: <b>US$ {point.y:.1f} Miles de millones </b>'
        },
        fr : {
            title : 'Les opérations de la Banque mondiale en un coup d’œil',
            subTitle : 'Données clés',
            chartTitle : 'Montant des prêts par année',
            xtitle : 'Exercice',
            ytitle : 'Milliards de dollars',                        
            pointFormat : 'Exercice: <b>{point.x}</b>, Montant: <b>USD {point.y:.1f} Milliards </b>'
        },
        pt : {
            title : 'Visão panorâmica das operações do Banco Mundial',
            subTitle : 'Principais indicadores de empréstimos do Banco Mundial',
            chartTitle : 'Compromissos de empréstimos por ano',
            xtitle : 'Exercício financeiro',
            ytitle : 'US$ bilhões',                        
            pointFormat : 'Ano: <b>{point.x}</b>, Montante: <b>US$ {point.y:.1f} Bilhões </b>'
        },  
        ru : {
            title : 'Краткий обзор операций Всемирного банка',
            subTitle : 'Основные показатели займов и кредитов Всемирного банка',
            chartTitle : 'Объём займов и кредитов по годам',
            xtitle : 'Финансовый год',
            ytitle : 'млрд долл. США',                        
            pointFormat : 'Год: <b>{point.x}</b>, Сумма: <b>ДОЛЛ. США {point.y:.1f} млрд. </b>'
        },
        ar : {
            title : 'لمحة سريعة عن عمليات البنك الدولي',
            subTitle : 'المؤشرات الأساسية لقروض البنك الدولي',
            chartTitle : 'الإقراض حسب السنة',
            xtitle : 'السنة المالية',
            ytitle : 'مليار دولار',                        
            pointFormat : 'السنة: <b>{point.x}</b>, المبلغ: <b>دولار أمريكي{point.y:.1f}مليار </b>'
        },
        zh : {
            title : '世界银行业务一览',
            subTitle : '世界银行关键贷款指标',
            chartTitle : '年度贷款承诺额',
            xtitle : '财政年度',
            ytitle : '美元（十亿）',                        
            pointFormat : '年: <b>{point.x}</b>, 金额: <b>美元 {point.y:.1f} 十亿 </b>'                
        }
    }

    public static PROJECT = {
        "en":{
            "title":"RECENTLY APPROVED PROJECTS",
            "projectTitle" : 'Project Title',
            "projectList": "project list"
        },
        "es":{
            "title":"PROYECTOS APROBADOS RECIENTEMENTE",
            "projectTitle" : 'Nombre del Proyecto',
            "projectList": 'LISTA DE PROYECTOS'
        },
        "fr":{
            "title":"PROJETS RÉCEMMENT APPROUVÉS",
            "projectTitle" : 'Intitulé du Projet',
            "projectList": 'projet liste'
        },
        "pt":{
            "title":"PROJETOS RECÉM-APROVADOS",
            "projectTitle" : 'Título do projeto',
            "projectList": 'projeto Lista'
        },
        "ru":{
            "title":"Последние одобренные проекты",
            "projectTitle" : 'Название Проекта',
            "projectList": 'Список проектов'
        },
        "ar":{
            "title":"الإخطارات المنشورة حديثا",
            "projectTitle" : 'اسم المشروع',
            "projectList": 'قائمة المشاريع'
        },
        "zh":{
            "title":"近期批准的项目",
            "projectTitle" : '项目名称',
            "projectList": '项目清单'
        }
    }

    public static PROCUREMENT = {
      "en":{
          "title":"RECENTLY PUBLISHED PROCUREMENT PLANS",
        },
      "es":{
          "title":"PLANS DE ADQUISICIONES PUBLICADOS RECIENTEMENTE"
        },
      "fr":{
          "title":"PLANS DE PASSATION DES MARCHES RÉCEMMENTS PUBLIÉS",
        },
      "pt":{
          "title":"RECÉM-PUBLICADOS PLANO DE AQUISIÇÕES",
    },
      "ru":{
          "title":"НЕДАВНО ОПУБЛИКОВАННЫЕ ПЛАНЫ ЗАКУПОК",
        },
      "ar":{
          "title":"خطط التوريدات المنشورة حديثا",
        },
      "zh":{
          "title":"近期发布的采购计划",
        }
    }

    public static PROCUREMENT_NOTICES = {
        "en":{
            "title":"RECENTLY PUBLISHED NOTICES",
            "noticesList" : "NOTICES LIST"
        },
        "es":{
            "title":"ANUNCIOS PUBLICADOS RECIENTEMENTE",
            "noticesList" : "ANUNCIOS lista"
        },
        "fr":{
            "title":"AVIS RÉCEMMENTS PUBLIÉS",
            "noticesList" : "AVIS liste"
        },
        "pt":{
            "title":"NOTIFICAÇÕES RECÉM-PUBLICADAS",
            "noticesList" : "NOTIFICAÇÕES Lista"
        },
        "ru":{
            "title":"Последние опубликованные уведомления",
            "noticesList" : "Список уведомлений"
        },
        "ar":{
            "title":"الإخطارات المنشورة حديثا",
            "noticesList" : "قائمة الإخطارات"
        },
        "zh":{
            "title":"近期发布的采购通知 ",
            "noticesList" : "采购通知清单"
        }
    }
}