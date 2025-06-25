import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  constructor() { }

  // createGroupe(): Observable<any>
}
