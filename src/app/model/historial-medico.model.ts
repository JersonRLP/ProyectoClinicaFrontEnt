
export interface HistorialMedico {
    id: number;
    
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
    fechaConsulta: Date;
    diagnostico: string;
    tratamiento:string
    notaAdicional: string;
    estado: number;
  }