import React, {createContext, ReactNode, useState} from 'react';

interface MapContextProps {
    filtroEstado: string;
    fechaInicio: string;
    fechaFin: string;
    tipoDenuncia: string;
    setFiltroEstado: (estado: string) => void;
    setFechaInicio: (fecha: string) => void;
    setFechaFin: (fecha: string) => void;
    setTipoDenuncia: (tipo: string) => void;
}

export const MapContext = createContext<MapContextProps>({
    filtroEstado: '',
    fechaInicio: '',
    fechaFin: '',
    tipoDenuncia: '',
    setFiltroEstado: () => {
    },
    setFechaInicio: () => {
    },
    setFechaFin: () => {
    },
    setTipoDenuncia: () => {
    },
});

interface MapProviderProps {
    children: ReactNode;
}

export const MapProvider = ({children}: MapProviderProps) => {
    const [filtroEstado, setFiltroEstado] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [tipoDenuncia, setTipoDenuncia] = useState('');

    return (
        <MapContext.Provider
            value={{
                filtroEstado,
                fechaInicio,
                fechaFin,
                tipoDenuncia,
                setFiltroEstado,
                setFechaInicio,
                setFechaFin,
                setTipoDenuncia,
            }}
        >
            {children}
        </MapContext.Provider>
    );
};
