// usuario.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from 'src/app/model/usuario.model'; // Asegúrate de importar el modelo de Usuario

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = 'http://localhost:8080/usuario'; // URL base del backend

  constructor(private http: HttpClient) { }

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/listar`);
  }

  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.baseUrl}/registrar`, usuario,{ responseType: 'text' }).pipe(
        tap((response: any) => {

            console.log(response);
  }))

 
}
actualizarUsuario(usuario: Usuario): Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizar`, usuario, { responseType: 'text' });
  }

  eliminarUsuario(idUsuario: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/eliminar/${idUsuario}`, { responseType: 'text' });
  }

}