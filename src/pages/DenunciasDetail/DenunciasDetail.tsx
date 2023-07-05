import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Denuncia {
    correo: string;
    titulo: string;
    descripcion: string;
    tipoDenuncia: string;
    estado: string;
}

const DenunciasDetail = () => {
    const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
    const [filtros, setFiltros] = useState({
        fechaInicio: '',
        fechaFin: '',
        estado: '',
        tipoDenuncia: ''
    });
    const [paginacion, setPaginacion] = useState({
        page: 1,
        pageSize: 10,
        total: 0
    });

    useEffect(() => {
        obtenerDenuncias();
    }, []);

    const obtenerDenuncias = async () => {
        try {
            const response = await axios.get<Denuncia[]>('http://localhost:3001/denuncias/listarall');
            setDenuncias(response.data);
            // Actualizar la paginación con los nuevos datos
            setPaginacion(prevState => ({ ...prevState, total: response.data.length }));
        } catch (error) {
            console.error('Error al obtener las denuncias:', error);
        }
    };

    const filtrarDenuncias = async () => {
        try {
            const response = await axios.get<Denuncia[]>('http://localhost:3001/denuncias/listarall', { params: filtros });
            setDenuncias(response.data);
            // Actualizar la paginación con los nuevos datos
            setPaginacion(prevState => ({ ...prevState, total: response.data.length, page: 1 }));
        } catch (error) {
            console.error('Error al filtrar las denuncias:', error);
        }
    };

    const cambiarPagina = (page: number) => {
        // Actualizar la página actual en la paginación
        setPaginacion(prevState => ({ ...prevState, page }));
    };

    const verDenuncia = (titulo: string) => {
        // Lógica para ver la denuncia con el título especificado
    };

    const editarDenuncia = (titulo: string) => {
        // Lógica para editar la denuncia con el título especificado
    };

    const marcarComoResuelta = (titulo: string) => {
        // Lógica para marcar la denuncia como resuelta con el título especificado
    };

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4">
                    <input
                        type="date"
                        value={filtros.fechaInicio}
                        onChange={(e) => setFiltros(prevState => ({ ...prevState, fechaInicio: e.target.value }))}
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary dark:bg-boxdark dark:text-white"
                    />
                    <input
                        type="date"
                        value={filtros.fechaFin}
                        onChange={(e) => setFiltros(prevState => ({ ...prevState, fechaFin: e.target.value }))}
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary dark:bg-boxdark dark:text-white"
                    />
                    <input
                        type="text"
                        value={filtros.estado}
                        onChange={(e) => setFiltros(prevState => ({ ...prevState, estado: e.target.value }))}
                        placeholder="Estado"
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary dark:bg-boxdark dark:text-white"
                    />
                    <input
                        type="text"
                        value={filtros.tipoDenuncia}
                        onChange={(e) => setFiltros(prevState => ({ ...prevState, tipoDenuncia: e.target.value }))}
                        placeholder="Tipo de Denuncia"
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary dark:bg-boxdark dark:text-white"
                    />
                    <button
                        onClick={filtrarDenuncias}
                        className="bg-primary text-white rounded px-4 py-2 font-medium"
                    >
                        Filtrar
                    </button>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => cambiarPagina(paginacion.page - 1)}
                        disabled={paginacion.page === 1}
                        className="bg-primary text-white rounded px-4 py-2 font-medium"
                    >
                        Anterior
                    </button>
                    <button
                        onClick={() => cambiarPagina(paginacion.page + 1)}
                        disabled={paginacion.page * paginacion.pageSize >= paginacion.total}
                        className="bg-primary text-white rounded px-4 py-2 font-medium"
                    >
                        Siguiente
                    </button>
                </div>
            </div>

            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                        <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                            Título
                        </th>
                        <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                            Descripción
                        </th>
                        <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                            Tipo de Denuncia
                        </th>
                        <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                            Estado
                        </th>
                        <th className="py-4 px-4 font-medium text-black dark:text-white">
                            Acciones
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {denuncias
                        .slice(
                            (paginacion.page - 1) * paginacion.pageSize,
                            paginacion.page * paginacion.pageSize
                        )
                        .map((denuncia) => (
                            <tr key={denuncia.titulo}>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white">
                                        {denuncia.titulo}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {denuncia.descripcion}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {denuncia.tipoDenuncia}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">{denuncia.estado}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button
                                            onClick={() => verDenuncia(denuncia.titulo)}
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        >
                                            Ver
                                        </button>
                                        <button
                                            onClick={() => editarDenuncia(denuncia.titulo)}
                                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => marcarComoResuelta(denuncia.titulo)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Marcar como Resuelta
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

export default DenunciasDetail;
