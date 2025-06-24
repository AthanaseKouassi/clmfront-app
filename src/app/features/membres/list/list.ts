import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ColumnConfig, DataTable} from '../../../shared/ui/data-table/data-table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';

import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Member} from '../../models/members';
import {MemberService} from '../member-service';
import {Page} from '../../models/page';
import {MatDialog} from '@angular/material/dialog';
import {CreateMember} from '../create-member/create-member';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {NotificationService} from '../../../core/notification/notification-service';


@Component({
  selector: 'app-list',
  standalone:true,
  imports: [
    DataTable,
    MatCard,
    MatIcon,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    MatIconButton,
    MatSuffix
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List implements OnInit{
  private memberService = inject(MemberService);
  private notificationService = inject(NotificationService);
  readonly dialog = inject(MatDialog);
  private router = inject(Router);

  protected searchForm: FormGroup ;

  sQuery='';
  members: Member[] = [];
  totalItems = 0;
  pageIndex = 0;
  pageSize = 5;
  pageSizeOptions = [5, 10, 15];
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private fb: FormBuilder,
              private readonly snackBar: MatSnackBar,) {
    this.searchForm = this.fb.group({ searchQuery: [''] });
  }

  ngOnInit(): void {
      this.searchForm = new FormGroup({
        searchQuery: new FormControl('', { nonNullable: true }),
      });

  this.loadMembers(this.pageIndex, this.pageSize);
  }

  columns: ColumnConfig[] = [
    { key: 'lastName', header: 'Nom', type: 'text' },
    { key: 'firstName', header: 'Prénom(s)', type: 'text' },
    { key: 'birthDate', header: 'Date de naissance', type: 'date',format: 'dd/MM/yyyy' },
    { key: 'maritalStatus', header: 'Statut matrimonial' , type: 'text' },
    { key: 'baptismDate', header: 'Date de baptême', type: 'date',format: 'dd/MM/yyyy' },
    { key: 'phone', header: 'Téléphone', type: 'text' },
    { key: 'profession', header: 'Profession' , type: 'text' }
  ];

  loadMembers(page: number, size: number): void {
    this.memberService.getMemberByPage(page, size).subscribe({
      next: (pageData: Page<Member>) => {
        this.members = pageData.content.map(m=>({
          ...m,
          entryDate:  m.entryDate ? new Date(m.entryDate) : null,
          baptismDate:  m.baptismDate ? new Date(m.baptismDate) : null,
          birthDate: m.birthDate ? new Date(m.birthDate): null,
        }));
        this.totalItems = pageData.totalElements;
        this.pageIndex = pageData.number;
        console.log('Les membres ... ',this.members);
      },
      error: (err) => console.error('Erreur chargement des membres :', err)
    });
  }

  // Gestion des événements
  onPageChange(event: PageEvent): void {
    console.log('Page changed:', event);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    if (this.sQuery && this.sQuery.trim() !== '') {
      this.applySearch(this.sQuery, this.pageIndex, this.pageSize);
    } else {
      this.loadMembers(this.pageIndex, this.pageSize);
    }

  }

  onDetailClick(membre: Member): void {
    console.log('Membre clicked:', membre);
    this.router.navigate(['/membres/details', membre.id]);
  }

  onEdit(membre: Member): void {
    console.log('Edit clicked:', membre);
    const dialogRef = this.dialog.open(CreateMember, {
      maxWidth: '750vw',
      maxHeight: '180vh',
      panelClass: 'custom-dialog-container',
      data: { titre: 'Editer Membre' , membre }
    });

    dialogRef.afterClosed().subscribe((result: Member | undefined) => {
      if (result) {
        this.memberService.createMember(result).subscribe({
          next: (updated) => {
            console.log('Membre mis à jour :::',updated)
            this.snackBar.open('Membre mis à jour avec succès !', 'Fermer', {
              duration: 3000,
            });
            this.loadMembers(this.pageIndex, this.pageSize);
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour du membre', err);
            this.snackBar.open('Échec de la mise à jour du membre', undefined, {
              duration: 4000,
            });
          },
        });
      }
    });
  }

  onDelete(membre: Member): void {
    const confirmed = confirm(`Voulez-vous vraiment supprimer ${membre.lastName+' '+membre.firstName} ?`);
    if (confirmed) {
      // Ici tu peux appeler ton service de suppression
      // this.memberService.delete(row.id).subscribe(() => {
      //   this.dataSource = this.dataSource.filter(item => item.id !== row.id);
      //   this.totalItems = this.dataSource.length;
      // });

      console.log('Deleted:', membre);
    }
  }

  onSearch(): void {
    this.sQuery = this.searchForm.get('searchQuery')?.value?.trim() || '';
    console.log('Search elements :', this.sQuery);

    this.notificationService.error('Erreur','Membre succès ',5000);
    // Réinitialiser la pagination dans tous les cas
    this.resetPagination();
    if (this.hasValidSearchQuery()) {
      this.applySearch(this.sQuery, this.pageIndex, this.pageSize);
    } else {
      this.loadMembers(this.pageIndex, this.pageSize);
    }
  }

  private resetPagination(): void {
    this.pageIndex = 0;
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  private hasValidSearchQuery(): boolean {
    return !!this.sQuery && this.sQuery.trim() !== '';
  }


  applySearch(searchTerm: string, page: number, size: number): void {

    this.memberService.getMemberSearch(searchTerm,page,size).subscribe({
      next: (Data: Page<Member>) => {
        this.members = Data.content.map(m=>({
          ...m,
          entryDate:  m.entryDate ? new Date(m.entryDate) : null,
          baptismDate:  m.baptismDate ? new Date(m.baptismDate) : null,
          birthDate: m.birthDate ? new Date(m.birthDate): null,
        }));
        this.totalItems = Data.totalElements;
        this.pageIndex = Data.number;
      },
      error: (err) => console.error('Error searching members :', err)
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateMember, {
      maxWidth: '750vw',
      maxHeight: '180vh',
      panelClass: 'custom-dialog-container',
      autoFocus: true,
      data: { titre: 'Créer un nouveau membre' }
    });

    dialogRef.afterClosed().subscribe((result: Member | undefined) => {
      if (result) {
        this.memberService.createMember(result).subscribe({
          next: (createdMember) => {
            console.log('Membre sauvegardé:', createdMember);
            this.notificationService.success('Success','Membre crée avec succès :(');
            // Mise à jour de la liste locale
            this.members.push(createdMember);

            // this.snackBar.open('Membre créé avec succès !', 'Fermer', {
            //   duration: 3000,
            // });

          },
          error: (err) => {
            console.error('Erreur lors de la création du membre', err);
            // this.snackBar.open('Échec de la création du membre', undefined, { duration: 4000 });
            this.notificationService.error('Erreur','Erreur de creation Membre');
          },
        });

      }
    });
  }

}
