import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    let primeraletra = value[0];
    primeraletra = primeraletra.toUpperCase();
    let textofinal = primeraletra;
    for (let i = 1; i < value.length; i++) {
      textofinal += value[i];
    }
    return textofinal;
  }
}
