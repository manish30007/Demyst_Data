import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from 'src/utils/User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private authenticated = false;

  constructor(private router: Router,private http: HttpClient) {  
        // Initialize the BehaviorSubject with null or a default user
        this.currentUserSubject = new BehaviorSubject<User|null>(null);
        this.currentUser = this.currentUserSubject.asObservable();
     
   }
   // A method to update the user data and notify subscribers
  public updateUser(user: User) {
    this.currentUserSubject.next(user);
  }

  // A method to get the current user value
  public getCurrentUser(): User|null {
    return this.currentUserSubject.value;
  }

  register(userData:any) {
    return this.http.post<any>(`http://localhost:7000/api/user/register`,userData);
  }
  login(userData:any) {
    return this.http.post<any>(`http://localhost:7000/api/user/login`,userData)
    .pipe(map(data => {
     
     if(data.stat==true){
      this.updateUser(data.data);
     this.authenticated=true;
     }
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
