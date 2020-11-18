import { Injectable,ErrorHandler } from '@angular/core';
import {Router} from '@angular/router'
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalerrorService implements ErrorHandler {

  constructor() { }

  handleError(error: any): void {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
 
     if (chunkFailedMessage.test(error.message)) {
     // this.routing.navigate[("/en/projects-operations/projectdetail-spa/P000755")];
     }
   }
}
