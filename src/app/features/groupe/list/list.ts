import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {ColumnConfig, DataTable} from '../../../shared/ui/data-table/data-table';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatButton,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    MatIconButton,
    MatSuffix,
    DataTable
  ],
  standalone: true,
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List implements OnInit {

  protected sGroupForm: FormGroup ;

  totalItems = 0;
  pageIndex = 0;
  pageSize = 5;
  pageSizeOptions = [5, 10, 15];

  constructor(private fb: NonNullableFormBuilder) {
    this.sGroupForm = this.fb.group({
      searchInput: [''] });
  }


  ngOnInit(): void {

  }

  columns: ColumnConfig[] = [
    { key: 'name', header: 'Nom du groupe', type: 'text' },
    { key: 'createAt', header: 'Date création', type: 'date',format: 'dd/MM/yyyy' }

  ];

  onPageChange(event: PageEvent): void {

  }

  onEdit(): void { }

  onDetailClick(): void { }

  onDelete(): void { }

  onSubmit() {
    console.log('la haut...');
  }
}
