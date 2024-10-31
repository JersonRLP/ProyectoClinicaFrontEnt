// cita-medica.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CitaMedica } from 'src/app/model/cita-medica.model';
import { CitaMedicaService } from 'src/app/services/cita-medica.service';
import { DatePipe } from '@angular/common';
import { CitaMedicaDTO } from 'src/app/model/CitaMedicaDTO';



@Component({
  selector: 'app-cita-medica',
  templateUrl: './cita-medica.component.html',
  styleUrls: ['./cita-medica.component.css'],
  providers: [DatePipe]
})
export class CitaMedicaComponent implements OnInit {


  displayedColumns: string[] = ['id', 'paciente', 'medico', 'fechaCita', 'motivoCita'];
  dataSource: MatTableDataSource<CitaMedica>=new MatTableDataSource();; 

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  citasMedicas: CitaMedica[] = [];

  nuevaCitaMedica: CitaMedicaDTO = {
    id: 0,
    fechaCita: new Date(),
    paciente: {id: 0},
    medico: {id:0},
    estado: 0,
    motivoCita: ''
  };

  modalRegistroAbierto: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  estados = [
    { valor: 1, nombre: 'Activo' },
    { valor: 0, nombre: 'No Activo' }
  ];
  

  constructor(
    private citaMedicaService: CitaMedicaService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.listarCitasMedicas();
    this.dataSource.paginator = this.paginator; 
  }

  listarCitasMedicas(): void {
    this.citaMedicaService.listarCitas().subscribe(
      (data: CitaMedica[]) => {
        this.citasMedicas = data;
        this.dataSource.data = this.citasMedicas; // Asigna los datos al dataSource
      },
      error => {
        console.error('Error al listar citas médicas:', error);
        this.mostrarSnackBar('Error al listar citas médicas');
      }
    );
  }

  registrarCitaMedica(): void {
    this.citaMedicaService.registrarCita(this.nuevaCitaMedica).subscribe(
      response => {
        console.log('Cita médica registrada correctamente:', response);
        this.mostrarSnackBar(response);
        this.listarCitasMedicas();
        this.nuevaCitaMedica = {
          id: 0,
          fechaCita: new Date(),
          paciente: {id:0},
          medico: {id:0},
          estado: 0,
          motivoCita: ''
        };
        this.cerrarModalRegistro();
      },
      error => {
        console.error('Error al registrar cita médica:', error);
        let errorMessage = 'Error al registrar cita médica';
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;
        }
        this.mostrarSnackBar(errorMessage);
      }
    );
  }

  
  abrirModalRegistro(): void {
    this.modalRegistroAbierto = true;
  }

  cerrarModalRegistro(): void {
    this.modalRegistroAbierto = false;
  }

  private mostrarSnackBar(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 4000, 
      horizontalPosition: this.horizontalPosition, 
      verticalPosition: this.verticalPosition, 
    });
  }
}
