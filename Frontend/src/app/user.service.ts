import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authenticated = false;
  constructor(private router: Router,private http: HttpClient) {   
   }
  register(userData:any) {
    return this.http.post<any>(`http://localhost:7000/api/user/register`,userData);
  }
  login(userData:any) {
    return this.http.post<any>(`http://localhost:7000/api/user/login`,userData)
    .pipe(map(data => {
     if(data.stat==true){
     this.authenticated=true;
     }
      // this.startRefreshTokenTimer();
      return data;
    }));
  }
  logout() {
    this.authenticated = false;
    this.router.navigate(['/login']);
  }
  
  isAuthenticated(): boolean {
    return this.authenticated;
  }
}
