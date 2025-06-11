import {Component, inject, Input, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {filter} from 'rxjs';


export interface MenuItem {
  label: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
}


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MatToolbarModule, MatIcon, MatIconButton,
    MatButton, RouterLink, RouterLinkActive, MatMenuTrigger, MatMenu, MatMenuItem],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnDestroy, OnInit {
  private router = inject(Router);
  sidenav: any;
  @Input() menuItems: MenuItem[] = [ ];
  @Input() appName: string = 'Communauté';
  @Input() currentUser: string = 'Invité';
  @Input() showUserInfo: boolean = true;

  @Input() brandName: string = '';
  @Input() showBrand: boolean = true;
  @Input() fixed: boolean = true;

  currentDateTime: Date = new Date();
  private readonly timer: any;
  menuRefList: MatMenu[] = [];

  isContentPage: boolean = false;

  @ViewChildren(MatMenu) set collectMenus(menus: QueryList<MatMenu>) {
    this.menuRefList = menus.toArray();
  }

  constructor() {
    this.updateDateTime();
    this.timer = setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private updateDateTime(): void {
    this.currentDateTime = new Date();
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Vérifiez si la route actuelle est une page de contenu
      this.isContentPage = this.router.url.includes('/content'); // Ajustez la condition selon vos routes
    });
  }


}
