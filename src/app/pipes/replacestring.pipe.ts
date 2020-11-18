import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replacestring'
})
export class ReplaceStringPipe implements PipeTransform {

  transform(value: string, replace:string, replaceWith: string): string {
    if (value != undefined) { 
      return value.replace(replace, replaceWith);   
    }      
}

}
