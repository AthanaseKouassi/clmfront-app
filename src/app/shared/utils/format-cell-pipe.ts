import {Pipe, PipeTransform} from '@angular/core';
import {ColumnConfig} from '../ui/data-table/data-table';

@Pipe({
  standalone: true,
  name: 'formatCell'
})
export class FormatCellPipe implements PipeTransform {

  transform(value: any, column: ColumnConfig): string {
    if (!value)
      return '';

    switch (column.type) {
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'boolean':
        return value ? 'Oui' : 'Non';
      case 'number':
        return column.format
          ? new Intl.NumberFormat('fr-FR', JSON.parse(column.format)).format(value)
          : value.toString();
      default:
        return value.toString();
    }
  }

}
