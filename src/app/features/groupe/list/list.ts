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
  protected sGroupForm: FormGroup ;
  readonly dialog = inject(MatDialog);
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
          },
          error: (err) => {
            console.error('Erreur lors de la création du groupe', err);
          }
        });
        // this.memberService.createMember(result).subscribe({
        //   next: (createdMember) => {
        //     console.log('Membre sauvegardé:', createdMember);
        //     this.notificationService.success('Creéation réussie','Membre crée avec succès!',5000);
        //     // Mise à jour de la liste locale
        //     this.members.push(createdMember);
        //   },
        //   error: (err) => {
        //     console.error('Erreur lors de la création du membre', err);
        //     this.notificationService.error('Erreur','Erreur de creation Membre');
        //   },
        // });

      }
    });
  }


  onPageChange(event: PageEvent): void {
    console.log('Page changed:', event);
  }

  onEdit(group: Group): void { }

  onDetailClick(group: Group): void { }

  onDelete(group: Group): void { }

}
