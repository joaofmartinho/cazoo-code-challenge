import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullReplacerPipe',
})
export class NullReplacerPipe implements PipeTransform {
  transform(value: any, repleceText: string = 'n/a'): any {
    if (!value || value === '€' || value === '%') {
      return repleceText;
    }

    return value;
  }
}
