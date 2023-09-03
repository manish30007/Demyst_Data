import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import Validation from 'src/utils/validation';
import Swal from "sweetalert2";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading:Boolean=false;
  submitted:Boolean=false;
  form: FormGroup = new FormGroup({
   
    email: new FormControl(''),
    password: new FormControl(''),
  
  });
  constructor(private router: Router, private formBuilder: FormBuilder,private userService:UserService ) {

  }
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {

      
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
          ]
        ],
       
     
      }
    );
  }


  onSubmit(){
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
          this.userService.login(this.form.value)
            .subscribe({
              next: (data) => {
                this.router.navigateByUrl('/dashboard');
              },
              error: (error) => {
                Swal.fire("Error", error.message, "error")
                //console.log(error);
                this.loading = false;
              }
            });
  }
}
