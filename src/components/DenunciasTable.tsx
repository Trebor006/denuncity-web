import React, { useEffect, useState } from 'react';
import {listarAllDenuncias, listarDenunciasPorGruposTipoDenuncia} from '../pages/api/denuncias';


interface DenunciaPorTipoDTO {
    _id: string;
    total: string;
    aceptadas: string;

}



const DenunciasTable: React.FC = () => {
    const [denuncias, setDenuncias] = useState<DenunciaPorTipoDTO[]>([]);
    useEffect(() => {
        const getDenuncias = async () => {
            const denunciasData = await listarDenunciasPorGruposTipoDenuncia();
            setDenuncias(denunciasData);
        };
        getDenuncias();


    }, []);

    return (
        <div
            className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">



        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
                Denuncias
            </h3>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                <tr>
                    <th style={{ border: '1px solid black', padding: '8px' }} >Tipo de Denuncia</th>
                    <th style={{ border: '1px solid black', padding: '8px' }} >Total</th>
                    <th style={{ border: '1px solid black', padding: '8px' }} >Aceptadas</th>
                </tr>
                </thead>
                <tbody>
                {denuncias.map((denuncia) => (
                    <tr key={denuncia._id}>
                        <td style={{ border: '1px solid black', padding: '8px' }} >{denuncia._id}</td>
                        <td style={{ border: '1px solid black', padding: '8px' }} >{denuncia.total}</td>
                        <td style={{ border: '1px solid black', padding: '8px' }} >{denuncia.aceptadas}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </div>

    );
};



export default DenunciasTable;