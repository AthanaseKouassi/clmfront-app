import {Routes} from '@angular/router';
import {List} from './list/list';
import {MemberForm} from './member-form/member-form';

export const membresRoutes: Routes = [
  { path: '', component: List },
  { path: 'new', component: MemberForm },
  { path: ':id/edit', component: MemberForm }
];
