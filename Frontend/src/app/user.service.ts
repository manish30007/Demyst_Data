import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {   
   }

  register(userData:any) {
    return this.http.post<any>(`http://localhost:7000/api/user/register`,userData);
  }
  login(userData:any) {
    return this.http.post<any>(`http://localhost:7000/api/user/login`,userData);
  }

}
