import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MenuItem, Navbar} from './layout/navbar/navbar';
import {DASH} from '@angular/cdk/keycodes';
import {Dashboard} from './layout/dashboard/dashboard';
import {CommonModule} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, CommonModule, MatIcon],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'clmfront-app';

  menuItem: MenuItem[] = [
    {label: 'Accueil', path: '/dashboard', icon: 'dashboard'},
    { label: 'Inscription', path: '', icon: '',
    children:[
      {label: 'Créer nouveau membre', path: '', icon: ''}
    ]},
    {label: 'Activités', path: '', icon: '',
    children: [
      {label: 'Créer un groupe', path: '', icon: ''},
      {label: 'Créer une Responsabilité', path: '', icon: ''}
    ]},

    { label: 'Profile', path: '', icon: '' }
  ];

  username: string = 'Athanase KOUASSI';
}
