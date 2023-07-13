import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useLocation, useParams} from 'react-router-dom';
import {Loader} from "@googlemaps/js-api-loader";
import {Denuncia} from "../../structure/denuncia";
import Slider from "react-slick";
import {ComentarioDto} from "../../structure/comentario-dto";
import ComentarioComponent from "./ComentarioComponent";

const DenunciaComponent = () => {
    const {id} = useParams<{ id: string }>();
    const location = useLocation();
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipoDenuncia, setTipoDenuncia] = useState('');
    const [estado, setEstado] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [photos, setPhotos] = useState<string[]>([]);
    const [comentarios, setComentarios] = useState<ComentarioDto[]|undefined>([]);

    const [map, setMap] = useState<google.maps.Map | null>(null);

    const cargarDenuncia = async () => {
        if (id) {
            try {
                const response = await axios.get(`https://denuncity-backend-app-in7v2.ondigitalocean.app/denuncias/buscar?id=${id}`);
                const denuncia: Denuncia = response.data;

                console.log('Denuncia: ' + JSON.stringify(denuncia));

                setTitulo(denuncia.titulo);
                setDescripcion(denuncia.descripcion);
                setTipoDenuncia(denuncia.tipoDenuncia);
                setEstado(denuncia.estado);
                setPhotos(denuncia.imagenesUrls);
                setComentarios(denuncia.comentarios);
                console.log("latitud: " + denuncia.lat);
                console.log("longitud: " + denuncia.lon);

                mapInitial(denuncia.lon, denuncia.lat);

            } catch (error) {
                console.error('Error al cargar la denuncia:', error);
            }
        }
    };

    useEffect(() => {
        setIsEditing(location.pathname.includes('editar') || location.pathname.includes('registrar'));
        cargarDenuncia();

        // return () => {
        //     isMounted = false; // Actualizar la variable de referencia cuando el componente se desmonte
        // };

    }, [id, location.pathname]);

    const actualizarComentarios = () => {
        cargarDenuncia()
    };

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
                titulo: '',
                createdAt: '',
                descripcion: '',
                tipoDenuncia: '',
                estado: '',

                lon: '',
                lat: '',
                colorMarker: '',
                imagenesUrls: [],
                comentarios: [],
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

    const initMap = (longitud: string, latitud: string) => {
        const loader = new Loader({
            apiKey: 'AIzaSyBgTxIfXuFWEByk3cL71ZYQlS4cpM8sgms&libraries=drawing,visualization',
            version: 'weekly',
        });
        loader.load().then(() => {
            console.log("initMap Lon: " + longitud);
            console.log("initMap Lat: " + latitud);

            const santacruz = {lat: parseFloat(latitud), lng: parseFloat(longitud)};

            const mapElement = document.getElementById('map');
            // @ts-ignore
            const map = new google.maps.Map(mapElement, {
                center: santacruz,
                zoom: 18,
                styles: [
                    {
                        featureType: 'poi',
                        stylers: [{visibility: 'off'}],
                    },
                ],
            });

            const marker = new google.maps.Marker({
                position: santacruz,
                map: map,  // Utilizar la variable `map` local en lugar del estado `map`.
                title: titulo,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: 'red',
                    fillOpacity: 1,
                    strokeColor: 'red',
                    strokeOpacity: 1,
                    scale: 8,
                }
            });

            setMap(map);
        });
    };


    const mapInitial = (longitud: string, latitud: string) => {
        const loader = new Loader({
            apiKey: 'AIzaSyBgTxIfXuFWEByk3cL71ZYQlS4cpM8sgms&libraries=drawing,visualization',
            version: 'weekly',
        });

        loader
            .load()
            .then(() => {
                initMap(longitud, latitud);
            })
            .catch((error) => {
                console.error('Error al cargar el mapa:', error);
            });
    }

    return (
        <div className="">
            <div className="w-full bg-gray-100 rounded p-8 flex">
                <div className="w-1/3 pr-4">
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

                    <div className="mb-4">
                        <Slider>
                            {photos && photos.map((url, index) => (
                                <div key={index}>
                                    <img src={url} alt={`Imagen ${index + 1}`}/>
                                </div>
                            ))}
                        </Slider>
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
                <div className="w-1/3 pl-4">
                    <div id="map" style={{height: '500px'}}></div>
                </div>
                <div className="w-1/3 pl-4">
                    <ComentarioComponent comentarios={comentarios} id={id} estadoDenuncia={estado} actualizarComentarios={actualizarComentarios}/>
                </div>
            </div>
        </div>
    );
};

export default DenunciaComponent;
