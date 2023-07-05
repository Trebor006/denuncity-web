import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Funcionario {
    id: number;
    nombre: string;
    apellido: string;
    ci: string;
    celular: string;
    email: string;
}

const Funcionarios = () => {
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

    useEffect(() => {
        obtenerFuncionarios();
    }, []);

    const obtenerFuncionarios = async () => {
        try {
            const response = await axios.get<Funcionario[]>('http://localhost:3001/funcionarios');
            setFuncionarios(response.data);
        } catch (error) {
            console.error('Error al obtener los funcionarios:', error);
        }
    };

    const verFuncionario = (id: number) => {
        // Lógica para ver el funcionario con el ID especificado
    };

    const editarFuncionario = (id: number) => {
        // Lógica para editar el funcionario con el ID especificado
    };

    const darDeBajaFuncionario = (id: number) => {
        // Lógica para dar de baja el funcionario con el ID especificado
    };

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex justify-end mb-4">
                <a
                    href="/funcionarios/registrar"
                    className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                    Agregar nuevo Funcionario
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
                            Apellido
                        </th>
                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                            CI
                        </th>
                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                            Celular
                        </th>
                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                            Email
                        </th>
                        <th className="py-4 px-4 font-medium text-black dark:text-white">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {funcionarios.map((funcionario) => (
                        <tr key={funcionario.id}>
                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                <h5 className="font-medium text-black dark:text-white">
                                    {funcionario.nombre}
                                </h5>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">{funcionario.apellido}</p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">{funcionario.ci}</p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">{funcionario.celular}</p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">{funcionario.email}</p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <div className="flex items-center space-x-3.5">
                                    <button
                                        onClick={() => verFuncionario(funcionario.id)}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        Ver
                                    </button>
                                    <button
                                        onClick={() => editarFuncionario(funcionario.id)}
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => darDeBajaFuncionario(funcionario.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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

export default Funcionarios;
