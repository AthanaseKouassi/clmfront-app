import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MenuItem, Navbar} from './layout/navbar/navbar';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, CommonModule],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  menuItem: MenuItem[] = [
    {label: 'Accueil', path: '', icon: 'home'},
    {label: 'Inscription', path: '', icon: 'app_registration',
    children:[
      {label: 'Créer membre', path: '/membres', icon: 'person_add'}
    ]},
    {label: 'Activités', path: '', icon: 'volunteer_activism',
    children: [
      {label: 'Créer un groupe', path: '', icon: 'groups'},
      {label: 'Créer une Responsabilité', path: '', icon: 'attribution'},
      {label: 'Les Champs missionnaires', path: '', icon: 'diversity_3'}
    ]},
    {label: 'Finances', path: '', icon: 'account_balance',
    children:[
      {label: 'Depot', path: '', icon: 'money_bag'},
      {label: 'Depenses', path: '', icon: 'send_money'}
    ]},

    { label: 'Paramètres', path: '', icon: 'settings' ,
    children: [
      {label: 'Créer un utilisateur', path: '', icon: 'person_add'},
    ]
    }
  ];

  username: string = 'Athanase KOUASSI';
}
