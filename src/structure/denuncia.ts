export interface Denuncia {
    correo: string;
    titulo: string;
    descripcion: string;
    tipoDenuncia: string;
    colorMarker: string;
    estado: string;
    imagenesUrls: string[];

    _id: string;
    createdAt: string;
}