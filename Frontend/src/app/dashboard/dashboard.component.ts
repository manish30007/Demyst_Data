import { Component } from '@angular/core';
import { AccountingService } from '../accounting.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LoanService } from '../loan.service';
import Swal from "sweetalert2";
import { UserService} from '../user.service';
import { User } from 'src/utils/User';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  currentUser: User | null=null;
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
  isSheetVerified:Boolean = false;
  loading:Boolean = false;
  
  constructor(private accountingService:AccountingService, private formBuilder:FormBuilder, private loanService:LoanService, private userService:UserService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user) => {
      this.currentUser = user;})
      console.log(this.currentUser);
      
    this.form = this.formBuilder.group(
      {
        businessName: ['', [Validators.required]],
        yearOfEstb: [''],
        totalProfitOrLossByYear: [null, [Validators.required]],
        loanAmount: [null, Validators.required],
        accountingProvider: ['Xero', [Validators.required]]
      }
    );
  }

  requestBalanceSheet(){
    this.accountingService.requestBalanceSheet(this.form.controls['accountingProvider'].value).subscribe({
      next:(data)=>{
      if(data.stat==true){
      this.balansheetData = data.data;
      this.openModal();
      console.log('Balance Sheet Data::', this.balansheetData);
      }
      else{
        Swal.fire("Error", "Unable to fetch balance sheet now", "error")
      }
      },
      error:(err)=>{
        console.log(err); 
      }
    })
    }

  onSubmit(){
      this.submitted = true;

      if (this.form.invalid||!this.isSheetVerified) {
        return;
      }

      this.loading = true;
      var businessData=this.form.value;
      businessData.balanceSheetData=this.balansheetData;
      businessData.applicationId = this.currentUser?.applicationId;
      this.loanService.submitLoanApplication(businessData).subscribe({
        next:(data)=>{
        if(data.stat==true){
          this.loanResult=data.data;
          Swal.fire('Result', this.loanResult, 'success');
          this.form.reset();
          this.isSheetVerified = false;
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
    checkVerify(){
      this.isSheetVerified=true;
      this.closeModal();
    }
    openModal() {
      const modalDialog = document.getElementById('modalDialog') as HTMLDialogElement;
      if (modalDialog) {
        modalDialog.showModal();
      }
    }
    closeModal() {
      const modalDialog = document.getElementById('modalDialog') as HTMLDialogElement;
      if (modalDialog) {
        modalDialog.close();
      }
    }
}
