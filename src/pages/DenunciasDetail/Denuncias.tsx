import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import DenunciaModal from "../../components/DenunciaModal";
import {Denuncia} from "../../structure/denuncia";
import {IoChevronBackOutline, IoChevronForwardOutline, IoEyeSharp} from "react-icons/io5";
import {BiDetail} from "react-icons/bi";

interface TipoDenuncia {
    id: number;
    nombre: string;
    descripcion: string;
    color: string;
    departamento: string;
}

interface DenunciaResult {
    denuncias: Denuncia[];
    totalPaginas: number;
}

interface estados {
    id: string;
    nombre: string;
}

const dataEstados: estados[] = [
    {id: '', nombre: '-- Selecionar Estado --'},
    {id: 'ACEPTADA', nombre: 'ACEPTADA'},
    {id: 'RECHAZADA', nombre: 'RECHAZADA'},
    {id: 'PROCESADA', nombre: 'PROCESADA'},
];

const Denuncias = () => {
    const [tiposDenuncia, setTiposDenuncia] = useState<TipoDenuncia[]>([]);
    const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
    const [filtros, setFiltros] = useState({
        fechaInicio: '',
        fechaFin: '',
        estado: '',
        tipoDenuncia: ''
    });

    const [sortConfig, setSortConfig] = useState({key: 'createdAt', direction: 'desc'});
    const [page, setPage] = useState<number>(1);
    const [pageSize, sePageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);
    const [renderPagination, setRenderPagination] = useState<boolean>(false);
    const [selectedDenuncia, setSelectedDenuncia] = useState<Denuncia | undefined>();

    useEffect(() => {
        obtenerTiposDenuncia();
    }, []);

    const handleSort = (key: string) => {
        let direction = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({key, direction});
    };

    const obtenerTiposDenuncia = async () => {
        try {
            const response = await fetch('http://localhost:3001/tipo-denuncias');
            const data = await response.json();
            setTiposDenuncia(data);
        } catch (error) {
            console.error('Error al obtener los tipos de denuncia:', error);
        }
    };

    useEffect(() => {
        filtrarDenuncias();
    }, []);

    useEffect(() => {
        console.log(" se disparo el cambio de estado en los filtros!!");
        filtrarDenuncias();
        setPage(1);
    }, [filtros, sortConfig]);

    const [showModal, setShowModal] = useState(false);
    const openModal = (denuncia: Denuncia) => {
        setSelectedDenuncia(denuncia);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    const filtrarDenuncias = async () => {
        try {
            console.log("paginacion");
            console.log(page);

            const response = await axios.get<DenunciaResult>('http://localhost:3001/denuncias/busquedaPaginada', {
                params: {
                    ...filtros, pagina: page, porPagina: pageSize,
                    ordenadoPor: sortConfig.key, ordenadoDir: sortConfig.direction === 'asc' ? 1 : -1
                }
            });
            const denunciasResult = response.data;

            console.log(denunciasResult.totalPaginas);

            setDenuncias(denunciasResult.denuncias);
            // Actualizar la paginación con los nuevos datos
            setTotal(denunciasResult.totalPaginas);

            // setPaginacion(prevState => ({...prevState, total: denunciasResult.totalPaginas, page: 1}));
        } catch (error) {
            console.error('Error al filtrar las denuncias:', error);
        }

        setRenderPagination(true);
    };

    const cambiarPagina = (pageNumber: number) => {
        console.log("new Page number:" + pageNumber);
        setPage(pageNumber);
        filtrarDenuncias();
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

    const handleTipoDenunciaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const nuevoTipo = event.target.value;
        setFiltros(prevState => ({...prevState, tipoDenuncia: event.target.value}))
        console.log("Actualizado tipo de denuncia!!!" + nuevoTipo);
    };

    const handleFiltroEstadoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const nuevoEstado = event.target.value;
        setFiltros(prevState => ({...prevState, estado: event.target.value}))
        console.log("Actualizado estado!!!" + nuevoEstado);
    };

    const renderizarBotonesPaginas = () => {
        const botones = [];
        for (let i = 1; i <= total; i++) {
            botones.push(
                <button
                    key={i}
                    onClick={() => cambiarPagina(i)}
                    className={`bg-primary text-white rounded px-4 py-2 font-medium ${
                        page === i ? 'bg-opacity-80' : ''
                    }`}
                >
                    {i}
                </button>
            );
        }

        setRenderPagination(false);
        return botones;
    };

    // @ts-ignore
    return (
        <div
            className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4">
                    <input
                        type="date"
                        value={filtros.fechaInicio}
                        onChange={(e) => setFiltros(prevState => ({...prevState, fechaInicio: e.target.value}))}
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary dark:bg-boxdark dark:text-white"
                    />
                    <input
                        type="date"
                        value={filtros.fechaFin}
                        onChange={(e) => setFiltros(prevState => ({...prevState, fechaFin: e.target.value}))}
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary dark:bg-boxdark dark:text-white"
                    />
                    <select id="estado"
                            onChange={handleFiltroEstadoChange}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary dark:bg-boxdark dark:text-white">
                        {dataEstados.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.nombre}
                            </option>
                        ))}
                    </select>

                    <select id="tipo_denuncia" onChange={handleTipoDenunciaChange}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-primary dark:bg-boxdark dark:text-white">
                        <option value="">Seleccione un Tipo de Denuncia</option>
                        {tiposDenuncia.map((option) => (
                            <option key={option.nombre} value={option.nombre}>
                                {option.nombre}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={filtrarDenuncias}
                        className="bg-primary text-white rounded px-4 py-2 font-medium">
                        Filtrar
                    </button>
                </div>
                <div className="flex space-x-2">

                    <button
                        onClick={() => cambiarPagina(page - 1)}
                        disabled={page === 1}
                        className="bg-primary text-white rounded px-4 py-2 font-medium"
                    >
                        <IoChevronBackOutline/>
                    </button>
                    {renderPagination && renderizarBotonesPaginas()}
                    <button
                        onClick={() => cambiarPagina(page + 1)}
                        disabled={page >= total}
                        className="bg-primary text-white rounded px-4 py-2 font-medium"
                    >
                        <IoChevronForwardOutline/>
                    </button>
                </div>
            </div>

            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                        <th className="min-w-[120px] py-1 px-4 font-medium text-black dark:text-white xl:pl-11">
                        </th>

                        <th onClick={() => handleSort('createdAt')}
                            className="min-w-[120px] py-1 px-4 font-medium text-black dark:text-white xl:pl-11">
                            {sortConfig && sortConfig.key === 'createdAt' && (
                                <span>{sortConfig.direction === 'asc' ? '🔼' : '🔽'}</span>
                            )}
                            {' '} Fecha
                        </th>
                        <th onClick={() => handleSort('titulo')}
                            className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                            {sortConfig && sortConfig.key === 'titulo' && (
                                <span>{sortConfig.direction === 'asc' ? '🔼' : '🔽'}</span>
                            )}
                            {' '} Título
                        </th>
                        <th onClick={() => handleSort('descripcion')}
                            className="min-w-[320px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                            {sortConfig && sortConfig.key === 'descripcion' && (
                                <span>{sortConfig.direction === 'asc' ? '🔼' : '🔽'}</span>
                            )}
                            {' '} Descripción
                        </th>
                        <th onClick={() => handleSort('tipoDenuncia')}
                            className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                            {sortConfig && sortConfig.key === 'tipoDenuncia' && (
                                <span>{sortConfig.direction === 'asc' ? '🔼' : '🔽'}</span>
                            )}
                            {' '} Tipo de Denuncia
                        </th>
                        <th onClick={() => handleSort('estado')}
                            className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                            {sortConfig && sortConfig.key === 'estado' && (
                                <span>{sortConfig.direction === 'asc' ? '🔼' : '🔽'}</span>
                            )}
                            {' '} Estado
                        </th>
                        <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                            Acciones
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {denuncias &&
                        denuncias
                            .map((denuncia) => (
                                <tr key={denuncia._id}>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            <img src={denuncia.imagenesUrls[0]}/>
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {denuncia.createdAt}
                                        </h5>
                                    </td>
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
                                            <button>
                                                <Link to={`/denuncias-detail/ver/${denuncia._id}`}>
                                                    <IoEyeSharp/>
                                                </Link>
                                            </button>

                                            <div>
                                                <button onClick={() => openModal(denuncia)}>
                                                    <BiDetail/>
                                                </button>
                                            </div>

                                            {/*<button*/}
                                            {/*    onClick={() => editarDenuncia(denuncia.titulo)}*/}
                                            {/*    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"*/}
                                            {/*>*/}
                                            {/*    Editar*/}
                                            {/*</button>*/}
                                            {/*<button*/}
                                            {/*    onClick={() => marcarComoResuelta(denuncia.titulo)}*/}
                                            {/*    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"*/}
                                            {/*>*/}
                                            {/*    Marcar como Resuelta*/}
                                            {/*</button>*/}
                                        </div>
                                    </td>
                                </tr>
                            ))}

                    </tbody>
                </table>
            </div>
            {showModal && selectedDenuncia && (
                <DenunciaModal denuncia={selectedDenuncia} closeModal={closeModal}/>
            )}
        </div>
    );
};

export default Denuncias;
