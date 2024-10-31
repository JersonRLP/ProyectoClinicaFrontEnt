// historial-medico-dto.model.ts
export interface HistorialMedicoDTO {
    id: number;
    paciente: { id: number };
    medico: { id: number };
    fechaConsulta: Date;
    diagnostico: string;
    tratamiento: string;
    notaAdicional: string;
    estado: number;
}
