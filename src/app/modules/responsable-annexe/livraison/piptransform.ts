import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cfa'
})
export class CfaPipe implements PipeTransform {
    transform(value: number): string {
        if (value == null || isNaN(value)) {
            return '0 CFA';
        }
        return `${value.toLocaleString('fr-FR')} CFA`;
    }
}
