// cita-medica.model.ts
export interface CitaMedica {
    id: number;
    fechaCita: Date;
    
    paciente: {
      id : number;  
      nombre: string;
      apellido: string;
    };
    medico: {
      id : number;  
      nombre: string;
      apellido: string;
    };
    estado: number;
    motivoCita: string
  }
  