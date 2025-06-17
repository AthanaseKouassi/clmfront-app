import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {FormatCellPipe} from '../../utils/format-cell-pipe';
import {MatTooltip} from '@angular/material/tooltip';

export interface ColumnConfig{
  key: string;
  header: string;
  type?: 'text' | 'number' | 'date' | 'boolean';
  format?: string;
}

@Component({
  selector: 'app-data-table',
  standalone:true,
  imports: [
    MatColumnDef,
    MatTable,
    MatSort,
    MatHeaderCell,
    MatCell,
    MatIconButton,
    MatHeaderRow,
    MatHeaderRowDef,
    MatHeaderCellDef,
    MatCellDef,
    MatIcon,
    MatRow,
    MatRowDef,
    MatPaginator,
    FormatCellPipe,
    MatTooltip,
  ],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss'
})
export class DataTable<T> {
  @Input() dataSource: T[] = [];
  @Input() columns: ColumnConfig[] = [];
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5,10,15,25];
  @Input() totalItems = 0;
  @Input() pageIndex = 0;

  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() rowClick = new EventEmitter<T>();
  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();
  @Output() detail = new EventEmitter<T>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  get displayedColumns(): string[] {
    return [...this.columns.map(c => c.key), 'actions'];
  }


}
