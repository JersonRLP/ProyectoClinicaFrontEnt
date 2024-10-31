import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistorialMedico } from '../model/historial-medico.model';
import { HistorialMedicoDTO } from 'src/app/model/HistorialMedicoDTO';


@Injectable({
  providedIn: 'root'
})
export class HistorialMedicoService {
  private baseUrl = 'http://localhost:8080/historial-medico';

  constructor(private http: HttpClient) { }

  listarHistorial(): Observable<HistorialMedico[]> {
    return this.http.get<HistorialMedico[]>(`${this.baseUrl}/listar`);
  }

  registrarHistorial(historialMedicoDTO: HistorialMedicoDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/registrar`, historialMedicoDTO, { responseType: 'text' });
  }
}
