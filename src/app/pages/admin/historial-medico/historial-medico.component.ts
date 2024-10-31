import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { HistorialMedico } from 'src/app/model/historial-medico.model';
import { HistorialMedicoService } from 'src/app/services/historial-medico.service';
import { DatePipe } from '@angular/common';
import { HistorialMedicoDTO } from 'src/app/model/HistorialMedicoDTO';

@Component({
  selector: 'app-historial-medico',
  templateUrl: './historial-medico.component.html',
  styleUrls: ['./historial-medico.component.css'],
  providers: [DatePipe]
})
export class HistorialMedicoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'paciente', 'medico', 'fechaConsulta', 'diagnostico', 'tratamiento', 'notaAdicional'];
  dataSource: MatTableDataSource<HistorialMedico> = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  historialesMedicos: HistorialMedico[] = [];

  nuevoHistorialMedico: HistorialMedicoDTO = {
    id: 0,
    paciente: { id: 0 },
    medico: { id: 0 },
    fechaConsulta: new Date(),
    diagnostico: '',
    tratamiento: '',
    notaAdicional: '',
    estado: 0,
    
  };

  modalRegistroAbierto: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  estados = [
    { valor: 1, nombre: 'Activo' },
    { valor: 0, nombre: 'No Activo' }
  ];

  constructor(
    private historialMedicoService: HistorialMedicoService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.listarHistorialMedico();
    this.dataSource.paginator = this.paginator;
  }

  listarHistorialMedico(): void {
    this.historialMedicoService.listarHistorial().subscribe(
      (data: HistorialMedico[]) => {
        this.historialesMedicos = data;
        this.dataSource.data = this.historialesMedicos;
      },
      error => {
        console.error('Error al listar historial médico:', error);
        this.mostrarSnackBar('Error al listar historial médico');
      }
    );
  }

  registrarHistorialMedico(): void {
    this.historialMedicoService.registrarHistorial(this.nuevoHistorialMedico).subscribe(
      response => {
        console.log('Historial médico registrado correctamente:', response);
        this.mostrarSnackBar(response);
        this.listarHistorialMedico();
        this.nuevoHistorialMedico = {
          id: 0,
          paciente: { id: 0 },
          medico: { id: 0 },
          fechaConsulta: new Date(),
          diagnostico: '',
          tratamiento: '',
          notaAdicional: '',
          estado: 0,
        };
        this.cerrarModalRegistro();
      },
      error => {
        console.error('Error al registrar historial médico:', error);
        let errorMessage = 'Error al registrar historial médico';
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
