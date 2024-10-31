import { CitaMedicaDTO } from 'src/app/model/CitaMedicaDTO';
// cita-medica.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CitaMedica } from '../model/cita-medica.model';


@Injectable({
  providedIn: 'root'
})


export class CitaMedicaService {
  private baseUrl = 'http://localhost:8080/cita-medica';

  constructor(private http: HttpClient) { }


  
  listarCitas(): Observable<CitaMedica[]> {
    return this.http.get<CitaMedica[]>(`${this.baseUrl}/listar`);
  }

  registrarCita(CitaMedicaDTO: CitaMedicaDTO): Observable<any> {
    
    return this.http.post(`${this.baseUrl}/registrar`, CitaMedicaDTO, { responseType: 'text' });
  }
  

}
