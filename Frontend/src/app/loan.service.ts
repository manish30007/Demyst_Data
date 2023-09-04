import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  submitLoanApplication(businessData:any) {
    return this.http.post<any>(`http://localhost:7000/api/decision/engine`,businessData,{withCredentials:true});
  }

}
