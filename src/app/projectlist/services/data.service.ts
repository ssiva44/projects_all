import { Injectable } from '@angular/core';  
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout'

@Injectable()
export class DataService {  	
	constructor(public http: HttpClient) { }
	
	getResponse(url: string) {	
		return this.http.post(url,'').map((response: Response) => {		
			if(response){
				if (response.status === 200) {
					return response.json();
				}
			}				
		});	
		//return this.http.post(url, '').map((response: Response) => response.json());				
	}	
} 	