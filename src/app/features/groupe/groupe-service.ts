import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environment/environment';
import {Group} from '../models/groupe';
import {catchError, Observable, throwError} from 'rxjs';
import {Page, PaginationRequest} from '../models/page';


@Injectable({
  providedIn: 'root'
})
export class GroupeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  constructor() { }

  createGroupe(group: Group): Observable<Group> {
    return this.http.post<Group>(`${this.apiUrl}/groups/create`,group ).pipe(
      catchError(err => {
        // ↳ point centralisé pour journaliser/enrichir l’erreur
        console.error('[GroupeService] createGroupe error', err);
        return throwError(() => err);
      })
    );
  }

  getGrouprById(id: number): Observable<Group>{
    return  this.http.get<Group>(`${this.apiUrl}/groups/${id}`);
  }

  getGroupByPage(pagination: PaginationRequest): Observable<Page<Group>> {
    let params = new HttpParams()
      .set('page', pagination.page)
      .set('size', pagination.size);

    if (pagination.sort) {
      params = params.set('sort', pagination.sort);
    }

    return this.http.get<Page<Group>>(`${this.apiUrl}/groups`,{params});
  }


  editGroup(id: number, group: Group): Observable<Group> {
    return this.http.put<Group>(`${this.apiUrl}/groups/${id}`,group).pipe(
        catchError (err => {
          console.error('[GroupeService] ::: editGroup error: ', err);
          return throwError(() => err);
        })
    );
  }


}
