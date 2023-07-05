import React, { useEffect, useState } from 'react';

// Interfaz para el tipo de denuncia
interface TipoDenuncia {
    id: number;
    nombre: string;
    descripcion: string;
    color: string;
    departamento: string;
}

const TipoDenuncias = () => {
    const [tiposDenuncia, setTiposDenuncia] = useState<TipoDenuncia[]>([]);

    useEffect(() => {
        obtenerTiposDenuncia();
    }, []);

    const obtenerTiposDenuncia = async () => {
        try {
            const response = await fetch('https://denuncity-backend-app-in7v2.ondigitalocean.app/tipo-denuncias');
            const data = await response.json();
            setTiposDenuncia(data);
        } catch (error) {
            console.error('Error al obtener los tipos de denuncia:', error);
        }
    };

    const verTipoDenuncia = (id: number) => {
        // Lógica para ver el tipo de denuncia con el ID especificado
    };

    const editarTipoDenuncia = (id: number) => {
        // Lógica para editar el tipo de denuncia con el ID especificado
    };

    const darDeBajaTipoDenuncia = (id: number) => {
        // Lógica para dar de baja el tipo de denuncia con el ID especificado
    };

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex justify-end mb-4">
                <a href="/complaintstype/registrar" className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                    Agregar nuevo Tipo de Denuncia
                </a>
            </div>

            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                        <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                            Nombre
                        </th>
                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                            Descripción
                        </th>
                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                            Color
                        </th>
                        <th className="py-4 px-4 font-medium text-black dark:text-white">
                            Departamento
                        </th>
                        <th className="py-4 px-4 font-medium text-black dark:text-white">
                            Acciones
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {tiposDenuncia.map((tipoDenuncia) => (
                        <tr key={tipoDenuncia.id}>
                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                <h5 className="font-medium text-black dark:text-white">
                                    {tipoDenuncia.nombre}
                                </h5>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">{tipoDenuncia.descripcion}</p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <div className="flex items-center justify-center h-8 w-8 rounded-full" style={{ backgroundColor: tipoDenuncia.color }}></div>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">{tipoDenuncia.departamento}</p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <div className="flex items-center space-x-3.5">
                                    <button onClick={() => verTipoDenuncia(tipoDenuncia.id)}>Ver</button>
                                    <button onClick={() => editarTipoDenuncia(tipoDenuncia.id)}>Editar</button>
                                    <button onClick={() => darDeBajaTipoDenuncia(tipoDenuncia.id)}>Baja</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TipoDenuncias;
