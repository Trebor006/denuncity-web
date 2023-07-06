import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useLocation, useParams} from 'react-router-dom';

interface Denuncia {
    _id: string;
    correo: string;
    titulo: string;
    createdAt: string;
    descripcion: string;
    tipoDenuncia: string;
    estado: string;
}

const Denuncia = () => {
    const {id} = useParams<{ id: string }>();
    const location = useLocation();
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipoDenuncia, setTipoDenuncia] = useState('');
    const [estado, setEstado] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const cargarDenuncia = async () => {
            if (id) {
                try {
                    const response = await axios.get(`https://denuncity-backend-app-in7v2.ondigitalocean.app/denuncias/buscar?id=${id}`);
                    const denuncia = response.data;
                    setTitulo(denuncia.titulo);
                    setDescripcion(denuncia.descripcion);
                    setTipoDenuncia(denuncia.tipoDenuncia);
                    setEstado(denuncia.estado);
                } catch (error) {
                    console.error('Error al cargar la denuncia:', error);
                }
            }
        };

        setIsEditing(location.pathname.includes('editar') || location.pathname.includes('registrar'));

        cargarDenuncia();
    }, [id, location.pathname]);

    const handleTituloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitulo(event.target.value);
    };

    const handleDescripcionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescripcion(event.target.value);
    };

    const handleTipoDenunciaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTipoDenuncia(event.target.value);
    };

    const handleEstadoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEstado(event.target.value);
    };

    const handleGuardarClick = async () => {
        if (titulo === '' || descripcion === '' || tipoDenuncia === '' || estado === '') {
            toast.error('Por favor, complete todos los campos');
            return;
        }

        try {
            const denunciaData: Denuncia = {
                _id: "",
                correo: '',
                titulo,
                createdAt: '',
                descripcion,
                tipoDenuncia,
                estado,
            };

            if (isEditing && id) {
                const response = await axios.put(`https://denuncity-backend-app-in7v2.ondigitalocean.app/denuncias/${id}`, denunciaData);
                toast.success('Denuncia actualizada exitosamente');
                console.log('Respuesta del servidor:', response.data);
            } else {
                const response = await axios.post('https://denuncity-backend-app-in7v2.ondigitalocean.app/denuncias/registrar', denunciaData);
                toast.success('Denuncia registrada exitosamente');
                console.log('Respuesta del servidor:', response.data);
            }

            setTitulo('');
            setDescripcion('');
            setTipoDenuncia('');
            setEstado('');
        } catch (error) {
            toast.error('Error al guardar la denuncia');
            console.error('Error al guardar la denuncia:', error);
        }
    };

    return (
        <div className="w-1/2 p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Denuncia</h2>
            <div className="mb-4">
                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                    Título:
                </label>
                <input
                    type="text"
                    id="titulo"
                    value={titulo}
                    onChange={handleTituloChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    disabled={!isEditing}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                    Descripción:
                </label>
                <textarea
                    id="descripcion"
                    value={descripcion}
                    onChange={handleDescripcionChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 "
                    disabled={!isEditing}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="tipoDenuncia" className="block text-sm font-medium text-gray-700">
                    Tipo de Denuncia:
                </label>
                <input
                    type="text"
                    id="tipoDenuncia"
                    value={tipoDenuncia}
                    onChange={handleTipoDenunciaChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    disabled={!isEditing}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
                    Estado:
                </label>
                <input
                    type="text"
                    id="estado"
                    value={estado}
                    onChange={handleEstadoChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    disabled={!isEditing}
                />
            </div>
            <div className="flex justify-end gap-4.5">
                <a
                    href="/denuncias-detail"
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                >
                    Cancelar
                </a>
                {isEditing && (
                    <button
                        onClick={handleGuardarClick}
                        className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                        Guardar
                    </button>
                )}
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Denuncia;
