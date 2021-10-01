import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventEmitter } from 'stream';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage: Storage;
  private isLogged = new BehaviorSubject<boolean>(false);
  private menuList = new BehaviorSubject<MenuList[]>([]);
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
  constructor() {
    this.storage = window.localStorage;
  }

  getUserLogged() {
    return this.isLogged.asObservable();
  }
  getMenuList() {
    return this.menuList.asObservable();
  }

  set(key: string, value: any): boolean {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  get(key: string): any {
    if (this.storage) {
      if (key == 'LOCAL_USER_LOGGED') {
        this.isLogged.next(true)
        this.menuList.next(this.menuUser);
      };
      return JSON.parse(this.storage.getItem(key));
    }
    return null;
  }

  remove(key: string): boolean {
    if (this.storage) {
      if (key == 'LOCAL_USER_LOGGED') {
        this.isLogged.next(false)
        this.menuList.next(this.menuStore);
      };
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }

}
