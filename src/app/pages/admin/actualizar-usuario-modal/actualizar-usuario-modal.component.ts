import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/model/usuario.model'; // Asegúrate de importar el modelo Usuario
import { UsuarioService } from 'src/app/services/UsuarioService.service'; // Importa tu servicio de usuario

@Component({
  selector: 'app-actualizar-usuario-modal',
  templateUrl: './actualizar-usuario-modal.component.html',
  styleUrls: ['./actualizar-usuario-modal.component.css']
})
export class ActualizarUsuarioModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ActualizarUsuarioModalComponent>,
    private usuarioService: UsuarioService // Inyecta tu servicio de usuario aquí
  ) { }

  guardarCambios(): void {
    this.usuarioService.actualizarUsuario(this.data.usuario).subscribe(
      result => {
        console.log('Usuario actualizado correctamente:', result);
        // Aquí podrías realizar cualquier acción adicional después de actualizar
        this.dialogRef.close(this.data.usuario); // Cierra el modal y pasa el usuario actualizado de vuelta
      },
      error => {
        console.error('Error al actualizar usuario:', error);
        // Maneja el error de actualización aquí
        // Por ejemplo, muestra un mensaje de error
      }
    );
  }

}
