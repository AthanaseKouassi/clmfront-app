import {Routes} from '@angular/router';
import {Dashboard} from './layout/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: Dashboard },
  {
    path: 'membres',
    loadChildren: () => import('./features/membres/routes')
      .then(m => m.membresRoutes)
  },
  {
    path: 'groupe',
    loadChildren: () => import('./features/groupe/routes')
      .then(g => g.groupesRoutes)
  },
  {path: '**', redirectTo: '/layout/dashboard', pathMatch: 'full'},

];
