import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountingService {

  constructor(private http: HttpClient) { }

  requestBalanceSheet(AccountingProvider:any) {
    return this.http.post<any>(`http://localhost:7000/api/accounting/balanceSheet`,{AccountingProvider:AccountingProvider,email:null})
  }
}
