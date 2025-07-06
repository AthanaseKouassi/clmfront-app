import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {catchError, EMPTY, Observable, tap} from 'rxjs';
import {Group} from '../../models/groupe';
import {GroupeService} from '../groupe-service';

@Component({
  selector: 'app-details',
  imports: [CommonModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatIcon],
  standalone:true,
  templateUrl: './details.html',
  styleUrl: './details.scss'
})
export class Details implements OnInit{

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly groupeservice = inject(GroupeService);
  groupe$?: Observable<Group>;
  error = false;


  ngOnInit(): void {
    this.getDetailMGroupe();
  }

  exitDetail(){
    console.log('Quitter la page détail...');
    this.router.navigate(['/groupe']);
  }

  getDetailMGroupe(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const groupeId = Number(idParam); // équivalent à +idParam

    if (!idParam || isNaN(groupeId)) {
      this.exitDetail();
      return;
    }

    this.groupe$ = this.groupeservice.getGrouprById(groupeId).pipe(
      tap(grp => console.log('Le goupe :...', grp)),
      catchError(error => {
        console.error('Erreur de chargement du groupe', error);
        this.error = true;
        return EMPTY; // évite une erreur de souscription
      })
    );
  }

}
