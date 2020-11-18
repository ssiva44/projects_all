import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class APIService {
   
	constructor(private http:HttpClient) { }
    
        getJsonResponse(url: string) {		
            return this.http.post(url, '');				
        }
        
}