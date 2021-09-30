import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface MenuList{
  title: string;
  route: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sshop';
  menuList: Array<MenuList> = [
    {
      title: 'Home',
      route: '/home'
    },
    {
      title: 'Cesta',
      route: '/cart'
    },
  ]

  constructor(private router: Router) {}

  getClass(param?: string) {
    if (param && param == this.router.url) {
      return 'font-weight-bold';
    }
    if (this.router.url == '/admin/login') {
      return 'd-none';
    }
  }
}
