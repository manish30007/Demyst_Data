import { Component } from '@angular/core';
import { AccountingService } from '../accounting.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LoanService } from '../loan.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  balansheetData:[]=[];
  
  form: FormGroup = new FormGroup({
    businessName: new FormControl(''),
    yearOfEstb: new FormControl(''),
    totalProfitOrLossByYear: new FormControl(''),
    loanAmount: new FormControl(''),
    accountingProvider: new FormControl(''),
  });
  loanResult:any;
  submitted:Boolean = false;
  loading:Boolean = false;
  
  constructor(private accountingService:AccountingService, private formBuilder:FormBuilder, private loanService:LoanService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        businessName: ['', [Validators.required]],
        yearOfEstb: [''],
        totalProfitOrLossByYear: [0, [Validators.required]],
        loanAmount: [0, Validators.required],
        accountingProvider: ['Xero', [Validators.required]]
      }
    );
  }

  requestBalanceSheet(){
    this.accountingService.requestBalanceSheet('Xero').subscribe({
      next:(data)=>{
      this.balansheetData = data.data;
      console.log('Balance Sheet Data::', this.balansheetData);
      },
      error:(err)=>{
        console.log(err); 
      }
    })
    }

  onSubmit(){
      this.submitted = true;

      if (this.form.invalid) {
        return;
      }

      this.loading = true;
      var businessData=this.form.value;
      businessData.balanceSheetData=this.balansheetData;
      this.loanService.submitLoanApplication(businessData).subscribe({
        next:(data)=>{
        if(data.stat==true){
          this.loanResult=data.data;
          console.log(this.loanResult);      
        }else{
          // swal
          this.form.reset();
        }
        },
        error:(error)=>{{
          // swal
          console.log("Error in Submit::",error); 
          this.form.reset();
        }}
      })
  
    }
}
