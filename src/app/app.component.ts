import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'sshop';
  user: any;
  isLogged: boolean = false;
  subscription: Subscription;
  menuList: Array<MenuList> = [];

  constructor(
    private router: Router,
    private storage: LocalStorageService
    ) {
    }

  ngOnInit() {
    this.subscription = this.storage.getUserLogged()
    .subscribe(arg => this.isLogged = arg);
    this.subscription = this.storage.getMenuList()
    .subscribe(arg => this.menuList = arg);

    this.user = this.storage.get('LOCAL_USER_LOGGED');
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
    this.router.navigate(['/home']);
    this.user = this.storage.remove("LOCAL_USER_LOGGED");
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}
}
