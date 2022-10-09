import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'laguage'
})
export class LaguagePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (args[0]!=undefined) {
        return args[0];
    }
    return args[1];
  }

}
