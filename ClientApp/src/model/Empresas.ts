export class empresas {
    id_Grupo: number;
    id_Empresa: number;
    codigo: string;
    decripcion: string;
    id_Tipo_Empresa: number;
    id_Organismo: number;
    id_Provincia: number;
    fecha: string;
    direccion: string;
    altura: number;
    contacto: string;
    telefono: string;
    email: string;
    referencia: string;
    observaciones: string;
    id_Pais: number;
}

export class tipoEmpresa {
    id_Tipo_Empresa: number;
    descripciopn: string;
}

export class organismo {
    id_Organismo: number;
    descripcion: string;
}

export class contactosEmpresas {
    id_Contacto: number;
    contacto: string;
    cargo: string;
    tipo_Contacto: string;
    valor: string;
}