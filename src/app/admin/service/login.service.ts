import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private _http: HttpClient) { }
  private url = 'http://localhost:3000/login';

  getUser():Observable<User[]> {
    return this._http.get<User[]>(this.url);
  }

}
