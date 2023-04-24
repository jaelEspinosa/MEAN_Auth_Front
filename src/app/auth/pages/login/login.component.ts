import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    email:['', [Validators.required, Validators.pattern(/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password:['', [Validators.required, Validators.minLength(6)]]
  })

  constructor( private fb: FormBuilder,
               private router: Router,
               private authservice: AuthService) {}

  login(){

   const {email, password} = this.miFormulario.value

   this.authservice.login(email, password)
    .subscribe(ok =>{
      if(ok === true){
        this.router.navigate(['/dashboard'])
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ok,
        })
      }
    })


  }
}
