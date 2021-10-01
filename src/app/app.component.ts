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
export class AppComponent implements OnInit{
  title = 'sshop';
  user: any;
  menuList: Array<MenuList> = [];
  menuStore: Array<MenuList> = [
    {
      title: 'Home',
      route: '/home'
    },
    {
      title: 'Cesta',
      route: '/cart'
    },
  ]
  menuUser: Array<MenuList> = [
    {
      title: 'Produtos',
      route: '/admin/produtos'
    },
    {
      title: 'Compras',
      route: '/admin/compras'
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user_logged'));
    console.log(this.user)
    this.menuList = this.user ? this.menuUser : this.menuStore;
  }

  getClass(param?: string) {
    if (param && param == this.router.url) {
      return 'font-weight-bold';
    }
    if (this.router.url == '/admin/login') {
      return 'd-none';
    }
  }

  logout() {
    this.user = localStorage.removeItem("user_logged");
    location.reload();
    this.router.navigate(['/home']);
  }
}
