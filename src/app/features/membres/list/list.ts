import {Component, inject, model, OnInit} from '@angular/core';
import {ColumnConfig, DataTable} from '../../../shared/ui/data-table/data-table';
import {PageEvent} from '@angular/material/paginator';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';

import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Member} from '../../models/members';
import {MemberService} from '../member-service';
import {Page} from '../../models/page';
import {MatDialog} from '@angular/material/dialog';
import {CreateMember} from '../create-member/create-member';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';


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
  readonly name = model('');
  private memberService = inject(MemberService);
  readonly dialog = inject(MatDialog);
  private router = inject(Router);
  protected readonly searchForm: FormGroup ;

  members: Member[] = [];
  totalItems = 0;
  pageIndex = 0;
  pageSize = 5;
  pageSizeOptions = [5, 10, 15];


  constructor(private fb: FormBuilder,
              private readonly snackBar: MatSnackBar,) {
    this.searchForm = this.fb.group({ searchQuery: [''] });
  }

  ngOnInit(): void {
  this.loadMembers(this.pageIndex, this.pageSize);
  }

  columns: ColumnConfig[] = [
    { key: 'lastName', header: 'Nom', type: 'text' },
    { key: 'firstName', header: 'Prénom(s)', type: 'text' },
    { key: 'birthDate', header: 'Date de naissance', type: 'date',format: 'dd/MM/yyyy' },
    { key: 'email', header: 'Email', type: 'text' },
    { key: 'phone', header: 'Téléphone', type: 'text' },
    { key: 'address', header: 'Lieu habitation' , type: 'text' },
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
        console.log('Les MEMBRES... ',this.members);
      },
      error: (err) => console.error('Erreur chargement des membres :', err)
    });
  }


  // Gestion des événements
  onPageChange(event: PageEvent): void {
    console.log('Page changed:', event);
    this.loadMembers(event.pageIndex, event.pageSize);

  }

  onDetailClick(membre: Member): void {
    console.log('Membre clicked:', membre);
    // Ex. navigation vers une page de détails
    this.router.navigate(['/membres/details', membre.id]);
  }

  onEdit(membre: Member): void {
    console.log('Edit clicked:', membre);
    // Naviguer vers le formulaire d'édition
    // this.router.navigate(['/members/edit', row.id]);
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

  // onRowClick(membre: Member): void {
  //   console.log('Membre clicked:', membre);
  //   // Ex. navigation vers une page de détails
  //   // this.router.navigate(['/members', row.id]);
  // }

  onSearch(): void {
    const searchTerm = this.searchForm.get('searchQuery')?.value;
    console.log('Recherche via bouton :', searchTerm);
    if(searchTerm){
      this.applySearch(searchTerm.trim(), this.pageIndex, this.pageSize);
    } else {
      this.loadMembers(this.pageIndex, this.pageSize);
    }
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
      data: { titre: 'Créer un nouveau membre' }
    });

    dialogRef.afterClosed().subscribe((result: Member | undefined) => {
      if (result) {
        console.log('Membre créé:', result);
        this.memberService.createMember(result).subscribe({
          next: (createdMember) => {
            console.log('Membre sauvegardé:', createdMember);
            // Mise à jour de la liste locale
            this.members.push(createdMember);

            this.snackBar.open('Membre créé avec succès !', 'Fermer', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.error('Erreur lors de la création du membre', err);
            this.snackBar.open('Échec de la création du membre', undefined, { duration: 4000 });
          },
        });

      }
    });
  }

}
