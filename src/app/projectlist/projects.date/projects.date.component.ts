import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { IMyDpOptions, IMyDate } from '../my-date-picker/interfaces';
@Component({  
	selector: 'projects-date', 	
	templateUrl: './projects.date.component.html',
	providers: [],
	animations: [    	
		trigger('dateFadeInOut', [
			state('load, in', style({ height: "0px", display: "none" })),
			state('out', style({ height: "*", display: "block" })),
			transition("in <=> out", animate(200)),
			transition("load <=> out", animate(200))
		])
	]
})

export class ProjectsDateComponent {		
	@Input() locale: string;
	@Output() selectedDateRange = new EventEmitter<any>();
	@Output() updatedDates = new EventEmitter<string>();
	
	allLocales: any = {};
	specificDateRange: string;
	startDateLabel: string;
	endDateLabel: string;
	startDate: string = '';
	endDate: string = '';	
	i18nValues: any;
	isCollapsed: boolean = true;
	collapseAnimation: string = 'load';
	dateIcon: string;	
	
	constructor() { 
		this.allLocales = {
			en : {                               
				specificDateRange: "Specific Date Range",
				startDate: "Start Date",
				endDate: "End Date"           
            },
            es : {
				specificDateRange: "Rango de fechas específico",
				startDate: "Fecha de inicio",
				endDate: "Fecha final"
            },
            fr : {
                specificDateRange: "Recherche par date",
				startDate: "Du",
				endDate: "Au"
            },
            pt : {
				specificDateRange: "Por datas específicas",
				startDate: "Data de início",
				endDate: "Data de encerramento"
            },  
            ru : {
                specificDateRange: "Конкретные даты",
				startDate: "Дата начала",
				endDate: "Дата завершения"
            },
            ar : {
				specificDateRange: "المدة الزمنية",
				startDate: "تاريخ البدء",
				endDate: "تاريخ الانتهاء"
            },
            zh : {
                specificDateRange: "具体日期范围",
				startDate: "起始日期",
				endDate: "终止日期"
            }
		}				
	}

	ngOnChanges() {	
		this.specificDateRange = this.allLocales[this.locale].specificDateRange;	
		this.startDateLabel = this.allLocales[this.locale].startDate;	
		this.endDateLabel = this.allLocales[this.locale].endDate;	
		this.dateIcon = this.locale == 'ar' ? 'fa fa-caret-left' : 'fa fa-caret-right';      	
    }	
		
	public onStartDateChanged(dateChanged: any) {			
		this.startDate = dateChanged.formatted;		
	}

	public onEndDateChanged(dateChanged: any) {		
		this.endDate = dateChanged.formatted;		
	}

	startDateOptions: IMyDpOptions = {	
        todayBtnTxt: 'Today',
        dateFormat: 'mm/dd/yyyy',
        editableDateField: true,
        openSelectorOnInputClick: true,
        showClearDateBtn: false,
        disableUntil: <IMyDate>{},
        disableSince: <IMyDate>{},
        selectorWidth: '100%',
		selectorHeight: '200px',		
    };

    endDateOptions: IMyDpOptions = {	
        todayBtnTxt: 'Today',
        dateFormat: 'mm/dd/yyyy',
        editableDateField: true,
        openSelectorOnInputClick: true,
        showClearDateBtn: false,
        disableUntil: <IMyDate>{},
        disableSince: <IMyDate>{},
        selectorWidth: '100%',
        selectorHeight: '200px'
    };

    placeholder: string = 'mm/dd/yyyy';   

    public replaceAll(str, find, replace) {
    	return str.replace(new RegExp(find, 'g'), replace);
	}

	public onDateRange() {						
		if (this.startDate == '' || this.endDate == '') {
			this.startDate = this.endDate = '';
		}      		
		this.updatedDates.emit('strdate=' + this.replaceAll(this.startDate, '/', '-') + '&enddate=' + this.replaceAll(this.endDate, '/', '-'));	
        this.selectedDateRange.emit({ startDate: this.startDate, endDate: this.endDate });	        	   
    }   

    public onSelectedDate(startDate, endDate) {
    	this.startDate = startDate;
    	this.endDate = endDate;
    	this.onDateRange();
    }   

	public updateIsCollapsed(collapse: any) {		
		this.collapseAnimation = collapse == true ? 'in' : 'out';		
		this.isCollapsed = collapse;		
	}  
}
