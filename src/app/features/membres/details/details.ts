import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {Member} from '../../models/members';
import {AsyncPipe, DatePipe} from '@angular/common';
import {MemberService} from '../member-service';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, EMPTY, Observable, tap} from 'rxjs';

@Component({
  selector: 'app-details',
  imports: [
    MatCardContent,
    MatCardTitle,
    MatCard,
    DatePipe,
    MatCardHeader,
    MatCardActions,
    MatButton,
    MatIcon,
    AsyncPipe
  ],
  standalone:true,
  templateUrl: './details.html',
  styleUrl: './details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Details implements OnInit{

  private readonly memberService = inject(MemberService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  member$?: Observable<Member>;
  error = false;


  ngOnInit(): void {
    this.getDetailMember();
  }

  getDetailMember(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const memberId = Number(idParam); // équivalent à +idParam

    if (!idParam || isNaN(memberId)) {
      this.exitDetail();
      return;
    }

    this.member$ = this.memberService.getMemberById(memberId).pipe(
      tap(member => console.log('Le membre :...', member)),
      catchError(error => {
        console.error('Erreur de chargement du membre', error);
        this.error = true;
        return EMPTY; // évite une erreur de souscription
      })
    );
  }


  exitDetail(){
    console.log('Quitter la page détail...')
    this.router.navigate(['/membres']);
 }

}
