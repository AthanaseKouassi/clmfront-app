import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {ColumnConfig, DataTable} from '../../../shared/ui/data-table/data-table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Page, PaginationRequest} from '../../models/page';
import {GroupeService} from '../groupe-service';
import {Group} from '../../models/groupe';
import {MatDialog} from '@angular/material/dialog';
import {CreateGroupe} from '../create-groupe/create-groupe';
import {NotificationService} from "../../../core/notification/notification-service";
import {Router} from '@angular/router';


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

  private readonly groupService = inject(GroupeService);
  private readonly notificationService = inject(NotificationService);
  readonly dialog = inject(MatDialog);
  private router = inject(Router);
  protected sGroupForm: FormGroup ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  groups: Group[] = [];
  totalItems = 0;
  pageIndex = 0;
  pageSize = 5;
  pageSizeOptions = [5, 10, 15];
  sort = 'name,asc';
  query='';

  constructor(private fb: NonNullableFormBuilder) {
    this.sGroupForm = this.fb.group({
      searchInput: [''] });
  }


  ngOnInit(): void {
  this.loadGroups();
  }

  columns: ColumnConfig[] = [
    { key: 'name', header: 'Nom du groupe', type: 'text' },
    { key: 'atCreate', header: 'Date création', type: 'date',format: 'dd/MM/yyyy' }
  ];


  loadGroups(): void {
    const request: PaginationRequest = {
      page: this.pageIndex,
      size: this.pageSize,
      sort: this.sort,
    };

    this.groupService.getGroupByPage(request).subscribe({
      next: (data: Page<Group>) => {
        this.groups = data.content;
        this.totalItems = data.totalElements;
        this.pageIndex = data.number;
        console.log('Les groups ... ',this.groups);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des groupes :', err);
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateGroupe, {
      maxWidth: '750vw',
      maxHeight: '180vh',
      panelClass: 'custom-dialog-container',
      autoFocus: true,
      data: { titre: "Créer un nouveau groupe d'activité" }
    });

    dialogRef.afterClosed().subscribe((result: Group | undefined) => {
      if (result) {
        this.groupService.createGroupe(result).subscribe({
          next: (createGroupe) => {
            console.log('Groupe save ...',createGroupe);
            this.groups.push(createGroupe);
            this.notificationService.success('Création réussie','Groupe créé avec succès!',5000);
          },
          error: (err) => {
            console.error('Erreur lors de la création du groupe', err);
            this.notificationService.error('Erreur','Erreur de creation Groupe');
          }
        });
      }
    });
  }


  onPageChange(event: PageEvent): void {
    console.log('Page changed:', event);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    // const request: PaginationRequest = {
    //   page: this.pageIndex = event.pageIndex,
    //   size: this.pageSize = event.pageSize,
    //   sort: this.sort,
    // };

    if (this.query && this.query.trim() !== '') {
    //  this.applySearch(this.query, this.pageIndex, this.pageSize);
    } else {
      this.loadGroups();
    }
  }

  onEdit(group: Group): void {
    console.log('Edit clicked:', group);
    const dialogRef = this.dialog.open(CreateGroupe, {
      maxWidth: '750vw',
      maxHeight: '180vh',
      panelClass: 'custom-dialog-container',
      data: { titre: 'Editer Groupe' , group }
    });
    dialogRef.afterClosed().subscribe((result: Group | undefined) => {
      if (result) {
        this.groupService.editGroup(result.id,result).subscribe({
          next: (updated) => {
            console.log('Groupe mis à jour :::',updated)
            this.notificationService.success('Modification reussie','Groupe modifié avec succès!',5000);
            this.loadGroups();
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour du membre', err);
            this.notificationService.success('Echec','Modification groupe échec!',5000);
          },
        });
      }
    });
  }

  onDetailClick(group: Group): void {
    console.log('Groupe clicked:', group);
    this.router.navigate(['/groupe/details', group.id]);
  }

  onDelete(group: Group): void { }

  private resetPagination(): void {
    this.pageIndex = 0;
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  private hasValidSearchQuery(): boolean {
    return !!this.query && this.query.trim() !== '';
  }

  onSearch(): void {
    this.query = this.sGroupForm.get('searchInput')?.value?.trim() || '';
    console.log('Search elements :', this.query);
    // Réinitialiser la pagination dans tous les cas
    this.resetPagination();
    if (this.hasValidSearchQuery()) {
      this.applySearch(this.query, this.pageIndex, this.pageSize);
    } else {
      this. loadGroups();
    }
  }


  applySearch(searchTerm: string, page: number, size: number): void {

    // this.memberService.getMemberSearch(searchTerm,page,size).subscribe({
    //   next: (Data: Page<Member>) => {
    //     this.members = Data.content.map(m=>({
    //       ...m,
    //       entryDate:  m.entryDate ? new Date(m.entryDate) : null,
    //       baptismDate:  m.baptismDate ? new Date(m.baptismDate) : null,
    //       birthDate: m.birthDate ? new Date(m.birthDate): null,
    //     }));
    //     this.totalItems = Data.totalElements;
    //     this.pageIndex = Data.number;
    //   },
    //   error: (err) => console.error('Error searching members :', err)
    // });
  }

}
