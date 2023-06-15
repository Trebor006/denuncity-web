import React, {useContext, useEffect, useState} from 'react';
import {Loader} from '@googlemaps/js-api-loader';
import {listarAllDenuncias} from "../pages/api/denuncias";
import {MapContext} from "../pages/api/MapContext";


interface DenunciaAllDTO {
    _id: string;
    correo: string;
    titulo: string;
    descripcion: string;
    tipoDenuncia: string;
    colorMarker: string;
    estado: string;
    imagenesUrls: string[];
    lon: string;
    lat: string;
    createdAt: string;
}

const Map = () => {

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [denuncias, setDenuncias] = useState<DenunciaAllDTO[]>([]);
    const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);

    const { filtroEstado, fechaInicio, fechaFin, tipoDenuncia } = useContext(MapContext);

    useEffect(() => {
        console.log(filtroEstado, fechaInicio, fechaFin, tipoDenuncia);
        console.log(" se disparo el cambio de estado en los filtros!!");

        const getDenuncias = async () => {
            const denunciasData = await listarAllDenuncias(
                filtroEstado,
                fechaInicio,
                fechaFin,
                tipoDenuncia
            );
            setDenuncias(denunciasData);
        };
        getDenuncias();
    }, [filtroEstado, fechaInicio, fechaFin, tipoDenuncia]);


    useEffect(() => {
        const initMap = () => {
            const loader = new Loader({
                apiKey: 'AIzaSyBgTxIfXuFWEByk3cL71ZYQlS4cpM8sgms&libraries=drawing,visualization',
                version: 'weekly',
            });
            loader.load().then(() => {
                const santacruz = {lat: -17.78629, lng: -63.18117};
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

                denuncias.forEach((denun) => {
                    const {lon, lat, tipoDenuncia, colorMarker, imagenesUrls, titulo, descripcion, createdAt} = denun;
                    const position = {lat: parseFloat(lat), lng: parseFloat(lon)};
                    const marker = new google.maps.Marker({
                        position: position,
                        map: map,  // Utilizar la variable `map` local en lugar del estado `map`.
                        title: titulo,
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            fillColor: colorMarker,
                            fillOpacity: 1,
                            strokeColor: colorMarker,
                            strokeOpacity: 1,
                            scale: 8,
                        }
                    });

                    const infoWindowContent = `
                    <div style=" font-family: Arial, sans-serif; background: #f9f9f9; padding: 15px; border-radius: 8px; width: 400px;">                    
                        <h2 style=" color: #333; font-weight: bold; margin-bottom: 10px; ">Título: ${titulo}</h2>        
                        <h2 style=" color: #333; font-weight: bold; margin-bottom: 10px; ">Tipo de Denuncia: ${tipoDenuncia}</h2>     
                        <h2 style=" color: #333; font-weight: bold; margin-bottom: 10px; ">Fecha: ${createdAt}</h2>     
                        <h2 style=" color: #333; font-weight: bold; margin-bottom: 10px; ">Descripción: ${descripcion}</h2>
                        <h2 style=" color: #333; font-weight: bold; margin-bottom: 10px; ">Denunciante: ********</h2>
                        <div style=" display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 10px; ">
                            ${imagenesUrls.map(imageUrl => `
                                <a href="${imageUrl}" target="_blank" rel="noopener noreferrer">
                                    <img src="${imageUrl}" width="80" style="border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);" />
                                </a>
                            `).join('')}
                        </div>
                    </div>
                    `;

                    const infoWindow = new google.maps.InfoWindow({
                        content: infoWindowContent,
                    });

                    marker.addListener('click', () => {
                        if (infoWindow) {
                            infoWindow.close();
                        }

                        infoWindow.open({
                            anchor: marker,
                            map: map,
                            shouldFocus: false,
                        });

                        setInfoWindow(infoWindow);
                    });

                    map.addListener('click', () => {
                        if (infoWindow) {
                            infoWindow.close();
                            setInfoWindow(null);
                        }
                    });
                })


                setMap(map);
            });
        };

        const loader = new Loader({
            apiKey: 'AIzaSyBgTxIfXuFWEByk3cL71ZYQlS4cpM8sgms&libraries=drawing,visualization',
            version: 'weekly',
        });

        loader
            .load()
            .then(() => {
                initMap();
            })
            .catch((error) => {
                console.error('Error al cargar el mapa:', error);
            });


    }, [denuncias]);


    return (
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
            <div id="map" style={{height: '800px'}}></div>
        </div>


    );
};

export default Map;
