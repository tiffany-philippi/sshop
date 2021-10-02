import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { MenuList } from './shared/models/menu-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sshop';
  isLogged: boolean = false;
  subscription: Subscription;

  private menuStore: Array<MenuList> = [
    {
      title: 'Home',
      route: '/home'
    },
    {
      title: 'Cesta',
      route: '/cart'
    },
  ]
  private menuUser: Array<MenuList> = [
    {
      title: 'Produtos',
      route: '/admin/produtos'
    },
    {
      title: 'Compras',
      route: '/admin/compras'
    },
  ];
  menuList: Array<MenuList> = this.menuStore;

  constructor(
    private router: Router,
    private storage: LocalStorageService,
  ) {
  }

  ngOnInit() {
    this.storage.userActive.subscribe(
      (active) => {
        this.isLogged = active;
        if (active) this.menuList = this.menuUser;
        else this.menuList = this.menuStore;
      }
    )
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
    this.storage.remove("LOCAL_USER_LOGGED");
    this.isLogged = false;
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
