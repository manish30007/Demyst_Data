import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import Validation from 'src/utils/validation';
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loading:Boolean=false;
  submitted:Boolean=false;
  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  constructor(private router: Router, private formBuilder: FormBuilder,private userService:UserService ) {

  }
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {

        firstName: ['', [Validators.required, Validators.pattern('\\S+[\\s\\S]*'), this.atLeastOneLetter]],
        lastName: [''],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
     
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }
  atLeastOneLetter(control: AbstractControl): ValidationErrors | null {
    const regex = /[a-zA-Z]/; // validate at least one alphabet
    if (!regex.test(control.value)) {
      return { atLeastOneLetter: true };
    }
    return null;
  }

  onSubmit(){
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.form.value).subscribe({
      next:(data)=>{
      if(data.stat){
        Swal.fire('Success', 'Registration successful', 'success');
          this.userService.login(this.form.value)
            .subscribe({
              next: () => {
                this.router.navigateByUrl('/dashboard');
              },
              error: (error) => {
                Swal.fire("Error", error.message, "error")
                //console.log(error);
                this.loading = false;
              }
            });
      }else{
        Swal.fire("Error", data.message, "error")
      }
      },
      error:(error)=>{
        Swal.fire('Error', error.message, 'error')
        console.log(error);
      }
    })
  }
}
