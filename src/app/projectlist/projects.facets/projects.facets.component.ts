import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({  
	selector: 'projects-facets', 	
	templateUrl: './projects.facets.component.html',
	providers: [ ],
	animations: [    	
		trigger('facetFadeInOut', [
			state('load, in', style({ height: "0px", display: "none" })),
			state('out', style({ height: "*", display: "block" })),
			transition("in <=> out", animate(200)),
			transition("out <=> load", animate(200))
		])
	]
})

export class ProjectsFacetsComponent {				
	@Input() facetsIn: Object;	
	@Input() locale: string;	
	@Output() updatedFacets = new EventEmitter<string>();
	@Output() selectedFacetsOut = new EventEmitter<any>();

	allLocales: any = {}; 
	facets: any = [];
	collapseFacets: any[] = [];
	limitFacets: any[] = [];
	selectedFacets: any = {};
	seeMore: string;
	seeLess: string;
	
	constructor() {
		this.allLocales = {
			en : {                               
				seeMore: "See More +",
                seeLess: "See Less -"            
            },
            es : {
				seeMore: "Ver Más +",
                seeLess: "Ver Menos -"      
            },
            fr : {
                seeMore: "Voir plus +",
                seeLess: "Voir moins -"
            },
            pt : {
                seeMore: "Ver mais +",
                seeLess: "Ver menos -"
            },  
            ru : {
                seeMore: "Развернуть +",
                seeLess: "Скрыть -"
            },
            ar : {
                seeMore: "نتائج أكثر +",
                seeLess: "نتائج أقل -"
            },
            zh : {
                seeMore: "展开 +",
                seeLess: "收起 -"
            }
		}
	}

	ngOnChanges() {	
		this.seeMore = this.allLocales[this.locale].seeMore;
		this.seeLess = this.allLocales[this.locale].seeLess;
		debugger
        if(this.facetsIn !== undefined) {         	       
			this.facets = this.facetsIn;
		}						
    }

   	public onCollapse(index) {
		let i = this.collapseFacets.indexOf(index, 0);
		if (i > -1) {
		   this.collapseFacets.splice(i, 1);
		} else {
			this.collapseFacets.push(index);
		}				
    };

	public onSeeMore(index) {
		this.limitFacets.push(index);		
    };

	public onSeeLess(index) {
		let i = this.limitFacets.indexOf(index, 0);
		if (i > -1) {
		   this.limitFacets.splice(i, 1);
		}				
    };

    public onFacetItem(facet, itemName) {		
		let finalFacets = '';
		if (this.selectedFacets.hasOwnProperty(facet)) {
			let facetItems = this.selectedFacets[facet]; 
			let index = facetItems.indexOf(encodeURIComponent(itemName));
			
			if (index > -1) 								
				facetItems.splice (index, 1);
			else
				facetItems.push(encodeURIComponent(itemName));
			
			this.selectedFacets[facet] = facetItems;
		} else {
			this.selectedFacets[facet] = [encodeURIComponent(itemName)];
		}					
		
		Object.keys(this.selectedFacets).forEach((facetName) => {
			let facetItems = this.selectedFacets[facetName];			
			if (facetItems.length != 0) {
				finalFacets = finalFacets == '' ? facetName + '=' + facetItems.join('%5E') : finalFacets + '&' + facetName + '=' + facetItems.join('%5E');	
			}						
		});	
		this.selectedFacetsOut.emit(this.selectedFacets);
		this.updatedFacets.emit(finalFacets);
    };		
}
