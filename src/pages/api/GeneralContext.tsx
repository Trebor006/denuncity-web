import React, { createContext, ReactNode, useState } from 'react';

interface GeneralContextProps {
    filtroEstado: string;
    fechaInicio: string;
    fechaFin: string;
    tipoDenuncia: string;
    setFiltroEstado: (estado: string) => void;
    setFechaInicio: (fecha: string) => void;
    setFechaFin: (fecha: string) => void;
    setTipoDenuncia: (tipo: string) => void;

    correo: string;
    departamento: string;
    isLoggedIn: boolean;
    setCorreo: (correo: string) => void;
    setDepartamento: (departamento: string) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const GeneralContext = createContext<GeneralContextProps>({
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


    correo: '',
    departamento: '',
    isLoggedIn: false,
    setCorreo: () => {},
    setDepartamento: () => {},
    setIsLoggedIn: () => {},
});

interface GeneralProviderProps {
    children: ReactNode;
}

export const GeneralProvider = ({ children }: GeneralProviderProps) => {
    const [filtroEstado, setFiltroEstado] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [tipoDenuncia, setTipoDenuncia] = useState('');


    const [correo, setCorreo] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <GeneralContext.Provider
            value={{
                filtroEstado,
                fechaInicio,
                fechaFin,
                tipoDenuncia,
                setFiltroEstado,
                setFechaInicio,
                setFechaFin,
                setTipoDenuncia,

                correo,
                departamento,
                isLoggedIn,
                setCorreo,
                setDepartamento,
                setIsLoggedIn,
            }}
        >
            {children}
        </GeneralContext.Provider>
    );
};
