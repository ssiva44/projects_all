import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toCurrencyPipe'
})
export class ToCurrencyPipe implements PipeTransform {

  transform(value: string): string {      
    if (value !== undefined) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
  }		
}

}
