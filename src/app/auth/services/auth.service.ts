import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/authInterfaces';
import { catchError, map, of, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario(){
    return{...this._usuario}
  }

  constructor(private http: HttpClient) { }


login(email: string, password: string){

  const url= `${this.baseUrl}/auth`

  return this.http.post<AuthResponse>(url, {email, password})
     .pipe(
        tap(({ok, token}) => {
          if (ok){
            localStorage.setItem('token', token!)
           } else {
            localStorage.clear()
           }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
     )

}

register(name: string, email: string, password:string){
  const url= `${this.baseUrl}/auth/new`
  return this.http.post<AuthResponse>(url, {name, email, password})
      .pipe(
        tap(({ok, token})=>{
          if (ok){
            localStorage.setItem('token', token!)
            } else {
              localStorage.clear()
             }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
}


validateToken(){
  const url= `${this.baseUrl}/auth/renew`
  const headers = new HttpHeaders()
     .set('x-token', localStorage.getItem('token') || '')

  return this.http.get<AuthResponse>(url,{ headers })
  .pipe(
     map(resp => {

      localStorage.setItem('token',resp.token!)
      this._usuario={
        name: resp.name!,
        uid: resp.uid!,
        email: resp.email!
      }
      return resp.ok
     }),
     catchError( err => of( false ))
  )
  }

  logout(){
    localStorage.clear()
  }
}

