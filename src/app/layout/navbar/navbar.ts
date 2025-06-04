import {Component, Input, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatMenu, MatMenuItem, MatMenuPanel, MatMenuTrigger} from '@angular/material/menu';


export interface MenuItem {
  label: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
}


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MatToolbarModule, MatIcon, MatIconButton, MatButton, RouterLink, RouterLinkActive, MatMenuTrigger, MatMenu, MatMenuItem],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnDestroy {
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


}
