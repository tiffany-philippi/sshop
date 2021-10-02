import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage: Storage;
  private user: boolean = false;

  private isLogged: EventEmitter<boolean> = new EventEmitter<boolean>(this.user);
  userActive: Observable<boolean> = this.isLogged.asObservable();

  constructor() {
    this.storage = window.localStorage;
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
      const getKey = JSON.parse(this.storage.getItem(key))
      if (key == 'LOCAL_USER_LOGGED' && getKey != null) this.isLogged.emit(true);
      else if (key == 'LOCAL_USER_LOGGED' && getKey == null) this.isLogged.emit(false);
      console.log(this.isLogged)
      return getKey;
    }
    return null;
  }

  remove(key: string): boolean {
    if (this.storage) {
      console.log(key);
      this.storage.removeItem(key);
      if (key == 'LOCAL_USER_LOGGED') this.isLogged.emit(false);
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
