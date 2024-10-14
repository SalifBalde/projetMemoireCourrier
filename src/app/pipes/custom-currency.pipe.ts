// src/app/pipes/custom-currency.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  constructor(private currencyPipe: CurrencyPipe) {}

  transform(value: number, currencyCode: string = 'XOF', display: 'code' | 'symbol' | 'symbol-narrow' | boolean = 'symbol', digitsInfo?: string, locale?: string): string | null {
    return this.currencyPipe.transform(value, currencyCode, display, digitsInfo, locale);
  }
}
