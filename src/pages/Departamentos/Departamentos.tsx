import React, { useEffect, useState } from 'react';


// Interfaz para el departamento
interface Departamento {
    id: number;
    nombre: string;
    descripcion: string;
}

const Departamentos = () => {
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);

    useEffect(() => {
        obtenerDepartamentos();
    }, []);

    const obtenerDepartamentos = async () => {
        try {
            const response = await fetch('https://denuncity-backend-app-in7v2.ondigitalocean.app/departamentos');
            const data = await response.json();
            setDepartamentos(data);
        } catch (error) {
            console.error('Error al obtener los departamentos:', error);
        }
    };

    const verDepartamento = (id: number) => {
        // Lógica para ver el departamento con el ID especificado
    };

    const editarDepartamento = (id: number) => {
        // Lógica para editar el departamento con el ID especificado
    };

    const darDeBajaDepartamento = (id: number) => {
        // Lógica para dar de baja el departamento con el ID especificado
    };

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex justify-end mb-4">
                <a href="/departaments/registrar"
                   className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                    Agregar nuevo departamento
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
                        <th className="py-4 px-4 font-medium text-black dark:text-white">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>

                    {departamentos.map((departamento) => (
                        <tr key={departamento.id}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            <h5 className="font-medium text-black dark:text-white">
                                {departamento.nombre}
                            </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">{departamento.descripcion}</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <div className="flex items-center space-x-3.5">
                                <button
                                    onClick={() => verDepartamento(departamento.id)}
                                    // className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    Ver
                                </button>
                                <button
                                    onClick={() => editarDepartamento(departamento.id)}
                                    // className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => darDeBajaDepartamento(departamento.id)}
                                    // className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Baja
                                </button>
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

export default Departamentos;
