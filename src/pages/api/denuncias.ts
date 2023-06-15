import axios from 'axios';


interface DenunciaPorTipoDTO {
    _id: string;
    total: string;
    aceptadas: string;

}

interface DenunciaAllDTO {
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


export async function listarDenunciasPorGruposTipoDenuncia(): Promise<DenunciaPorTipoDTO[]> {
    try {
        const response = await axios.get('https://denuncity-backend-app-in7v2.ondigitalocean.app/denuncias/listarportipo'); // Reemplaza la URL con la de tu API
        //console.log(response.data);
        return response.data;

    } catch (error) {
        console.error('Error al obtener las denuncias:', error);
        return [];
    }
}

export async function listarAllDenuncias(
    estado: string,
    fechaInicio: string,
    fechaFin: string,
    tipoDenuncia: string,
): Promise<DenunciaAllDTO[]> {
    try {
        const response = await axios.get('https://denuncity-backend-app-in7v2.ondigitalocean.app/denuncias/listarall', {
            params: {
                estado: estado,
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
                tipoDenuncia: tipoDenuncia
            }
        });

        return response.data;

    } catch (error) {
        console.error('Error al obtener las denuncias:', error);
        return [];
    }
}


