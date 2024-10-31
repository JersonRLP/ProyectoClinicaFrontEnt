// usuario.ts

export interface Usuario {
  id: number;
  usuario: string;
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: Date;
  genero: string;
  direccion: string;
  correo: string;
  telefono: string;
  password: string;
  estado: string;
  rol: {
    id: number;
  }
}
