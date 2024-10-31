// cita-medica-dto.model.ts
export interface CitaMedicaDTO {
    id: number;
    fechaCita: Date;
    paciente: { id:number};
    medico: {id:number};
    estado: number;
    motivoCita: string;
  }
  