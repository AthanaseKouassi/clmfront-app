import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Member} from '../models/members';
import {environment} from '../../environment/environment';
import {Page} from '../models/page';
import {catchError, Observable, throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getMemberByPage(page: number, size: number ): Observable<Page<Member>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<Page<Member>>(`${this.apiUrl}/members`,{params});
  }

  getMemberById(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrl}/members/${id}`);
  }

  createMember(member: Member): Observable<Member> {
    console.log('LES Membres au niveau service...',member);
    return this.http.post<Member>(`${this.apiUrl}/members/create`, member).pipe(
      catchError(err => {
        // ↳ point centralisé pour journaliser/enrichir l’erreur
        console.error('[MemberService] createMember error', err);
        return throwError(() => err);
      })
    );



  }

  getMemberSearch(query: string, page: number, size: number ):Observable<Page<Member>> {
    let params = new HttpParams()
      .set('query',query)
      .set('page', page)
      .set('size', size);
    return this.http.get<Page<Member>>(`${this.apiUrl}/members/search`,{params});
  }


}
