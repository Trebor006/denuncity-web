export interface DenunciaAllDTO {
    _id: string;
    correo: string;
    titulo: string;
    descripcion: string;
    tipoDenuncia: string;
    colorMarker: string;
    imagenesUrls: string[];
    estado: string;
    lat: string;
    lon: string;
    createdAt: string;
}