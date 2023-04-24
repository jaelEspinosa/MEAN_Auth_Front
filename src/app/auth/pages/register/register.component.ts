import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  constructor( private fb: FormBuilder,
               private router: Router,
               private authservice: AuthService) {}

  miFormulario: FormGroup = this.fb.group({
    name:['', [Validators.required, Validators.minLength(4)]],
    email:['', [Validators.required, Validators.pattern(/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password:['', [Validators.required, Validators.minLength(6)]]
  })


  register() {
    console.log(this.miFormulario.value);
    const {name, email, password} = this.miFormulario.value
    this.authservice.register(name, email, password)
      .subscribe(ok =>{
        if(ok === true){
          this.router.navigate(['/dashboard'])
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Fallo en el registro',
            text: ok
          })
        }
      })
  }
}
