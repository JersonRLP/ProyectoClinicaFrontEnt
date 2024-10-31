import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubjec = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  //generamos el token
  public generatejwt(loginData:any){
    return this.http.post(`${baserUrl}/login`,loginData);
  }

  public getCurrentUser(){
    return this.http.get(`${baserUrl}/login`);
  }

  //iniciamos sesión y establecemos el token en el localStorage
  public loginUser(jwt:any){
    localStorage.setItem('jwt',jwt);
    return true;
  }

  public isLoggedIn(){
    let jwtStr = localStorage.getItem('jwt');
    if(jwtStr == undefined || jwtStr == '' || jwtStr == null){
      return false;
    }else{
      return true;
    }
  }

  //cerranis sesion y eliminamos el token del localStorage
  public logout(){
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    return true;
  }

  //obtenemos el token
  public getjwt(){
    return localStorage.getItem('jwt');
  }

  public setUser(user:any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}
