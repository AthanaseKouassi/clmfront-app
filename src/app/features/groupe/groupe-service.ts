import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment/environment';
import {Group} from '../models/groupe';
import {catchError, Observable, throwError} from 'rxjs';


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



}
