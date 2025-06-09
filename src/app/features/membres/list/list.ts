import {Component} from '@angular/core';
import {ColumnConfig, DataTable} from '../../../shared/ui/data-table/data-table';
import {PageEvent} from '@angular/material/paginator';


interface TestItem {
  id: number;
  name: string;
  age: number;
  isActive: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-list',
  standalone:true,
  imports: [
    DataTable
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List {

  // Données fictives
  dataSource: TestItem[] = [
    { id: 1, name: 'Alice', age: 25, isActive: true, createdAt: new Date('2023-01-01') },
    { id: 2, name: 'Bob', age: 30, isActive: false, createdAt: new Date('2023-02-01') },
    { id: 3, name: 'Charlie', age: 35, isActive: true, createdAt: new Date('2023-03-01') },
    { id: 4, name: 'Emma', age: 24, isActive: true, createdAt: new Date('2024-04-09') },
    { id: 5, name: 'Joseph', age: 54, isActive: false, createdAt: new Date('2022-10-16') },
    { id: 6, name: 'Yao Jacques', age: 39, isActive: true, createdAt: new Date('2025-02-21') },
    { id: 7, name: 'Franck', age: 31, isActive: false, createdAt: new Date('2023-08-23') },
    { id: 8, name: 'Solange', age: 38, isActive: false, createdAt: new Date('2024-08-10') },
    { id: 9, name: 'René', age: 46, isActive: true, createdAt: new Date('2020-12-05') },
  ];

  currentPage = 1;
  pageSize = 5;
  pageSizeOptions = [5, 10, 15];
  totalItems = this.dataSource.length;



  // Configuration des colonnes
  columns: ColumnConfig[] = [
    { key: 'id', header: 'ID', type: 'number' },
    { key: 'name', header: 'Nom', type: 'text' },
    { key: 'age', header: 'Âge', type: 'number' },
    { key: 'isActive', header: 'Actif', type: 'boolean' },
    { key: 'createdAt', header: 'Date', type: 'date', format: 'dd/MM/yyyy' },
  ];

  get paginatedDataSource(): TestItem[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.dataSource.slice(startIndex, endIndex);
  }


  // Gestion des événements
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1; // pageIndex commence à 0
    this.pageSize = event.pageSize;

    console.log('Page changed:', event);
  }

  onRowClick(row: TestItem): void {
    console.log('Row clicked:', row);
    // Ex. navigation vers une page de détails
    // this.router.navigate(['/members', row.id]);
  }

  onEdit(row: TestItem): void {
    console.log('Edit clicked:', row);
    // Naviguer vers le formulaire d'édition
    // this.router.navigate(['/members/edit', row.id]);
  }

  onDelete(row: TestItem): void {
    const confirmed = confirm(`Voulez-vous vraiment supprimer ${row.name} ?`);
    if (confirmed) {
      // Ici tu peux appeler ton service de suppression
      // this.memberService.delete(row.id).subscribe(() => {
      //   this.dataSource = this.dataSource.filter(item => item.id !== row.id);
      //   this.totalItems = this.dataSource.length;
      // });

      console.log('Deleted:', row);
    }
  }

}
