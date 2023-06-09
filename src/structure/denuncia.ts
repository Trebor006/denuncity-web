import {ComentarioDto} from "./comentario-dto";

export interface Denuncia {
    correo: string;
    titulo: string;
    descripcion: string;
    tipoDenuncia: string;
    colorMarker: string;
    estado: string;
    imagenesUrls: string[];

    _id: string;
    lon: string;
    lat: string;
    createdAt: string;
    comentarios: ComentarioDto[] | undefined;
}