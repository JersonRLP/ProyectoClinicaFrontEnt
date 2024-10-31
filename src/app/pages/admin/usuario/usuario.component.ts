import { UsuarioService } from './../../../services/UsuarioService.service';
// usuario.component.ts
import { MatSnackBar,MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActualizarUsuarioModalComponent } from '../actualizar-usuario-modal/actualizar-usuario-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model'; // Asegúrate de importar el modelo Usuario
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'nombre', 'apellido', 'dni', 'fechaNacimiento', 'genero', 'direccion', 'correo', 'telefono', 'acciones'];
  dataSource: MatTableDataSource<Usuario>=new MatTableDataSource();; 

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  
  usuarios: Usuario[] = [];
  nuevoUsuario: Usuario = {
    id: 0,
    usuario: '',
    nombre: '',
    apellido: '',
    dni: '',
    fechaNacimiento: new Date(),
    genero: '',
    direccion: '',
    correo: '',
    telefono: '',
    password: '',
    estado: '',
    rol :{
      id: 0,
    }
  };

 // Define las posiciones horizontal y vertical para el MatSnackBar
 horizontalPosition: MatSnackBarHorizontalPosition = 'center';
 verticalPosition: MatSnackBarVerticalPosition = 'bottom';
// Variables para manejar la confirmación de eliminación
confirmacionEliminacionVisible: boolean = false;
usuarioAEliminar: Usuario | null = null;
  constructor(private usuarioService: UsuarioService,
                 private snackBar: MatSnackBar,
                 public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator; 
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe(
      (data: Usuario[]) => {
        this.usuarios = data;
        this.dataSource.data = this.usuarios; // Asigna los datos al dataSource
      },
      error => {
        console.log('Error al cargar usuarios:', error);
      }
    );
  }

  registrarUsuario(): void {
    this.usuarioService.registrarUsuario(this.nuevoUsuario).subscribe(
      data => {
        console.log('Usuario registrado correctamente:', data);
        this.cargarUsuarios();
        this.mostrarSnackBar(data);
        this.nuevoUsuario = {
          id: 0,
          usuario: '',
          nombre: '',
          apellido: '',
          dni: '',
          fechaNacimiento: new Date(),
          genero: '',
          direccion: '',
          correo: '',
          telefono: '',
          password: '',
          estado: '',
          rol :{
            id: 0,
          }
        };
      },
      error => {
        console.error('Error al registrar usuario:', error);
        let errorMessage = 'Error al registrar usuario';
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error; // Asigna el mensaje de error del servidor si está disponible
        }
        this.mostrarSnackBar(errorMessage); // Muestra el mensaje de error en el snackbar
      }
    );
  }

  actualizarUsuario(usuario: Usuario): void {
    const dialogRef = this.dialog.open(ActualizarUsuarioModalComponent, {
      width: '400px',
      data: { usuario }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuarioService.actualizarUsuario(result).subscribe(
          response => {
            console.log('Respuesta del servidor:', response);
            this.mostrarSnackBar(response); // Muestra el mensaje del servidor
            // Aquí puedes implementar lógica adicional si es necesario
          },
          error => {
            console.error('Error al actualizar usuario:', error);
            let errorMessage = 'Error al actualizar usuario';
            if (error.error && typeof error.error === 'string') {
              errorMessage = error.error; // Asigna el mensaje de error del servidor si está disponible
            }
            this.mostrarSnackBar(errorMessage); // Muestra el mensaje de error en el snackbar
          }
        );
      }
    });
  }



  eliminarUsuario(idUsuario: number | undefined): void {
    if (idUsuario !== undefined) {
      this.usuarioService.eliminarUsuario(idUsuario).subscribe(
        response => {
          console.log('Usuario eliminado correctamente:', response);
          this.mostrarSnackBar(response); // Muestra el mensaje del servidor
          this.cargarUsuarios(); // Actualiza la lista de usuarios después de eliminar
        },
        error => {
          console.error('Error al eliminar usuario:', error);
          let errorMessage = 'Error al eliminar usuario';
          if (error.error && typeof error.error === 'string') {
            errorMessage = error.error; // Asigna el mensaje de error del servidor si está disponible
          }
          this.mostrarSnackBar(errorMessage); // Muestra el mensaje de error en el snackbar
        }
      );
    } else {
      console.error('ID de usuario indefinido.');
      this.mostrarSnackBar('ID de usuario indefinido. No se puede eliminar.');
    }

    this.confirmacionEliminacionVisible = false; // Oculta el modal de confirmación después de eliminar
  }

  confirmarEliminar(usuario: Usuario): void {
    this.usuarioAEliminar = usuario;
    this.confirmacionEliminacionVisible = true;
  }
  cancelarEliminar(): void {
    this.confirmacionEliminacionVisible = false;
  }

  private mostrarSnackBar(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 4000, // Duración en milisegundos que mostrará el snackbar
      horizontalPosition: this.horizontalPosition, // Utiliza la posición horizontal definida
      verticalPosition: this.verticalPosition, // Utiliza la posición vertical definida
    });
  }
}