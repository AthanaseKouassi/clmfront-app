import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Member} from '../models/members';


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private http = inject(HttpClient);

  getAll() {
    return this.http.get<Member[]>('/api/members');
  }



}
