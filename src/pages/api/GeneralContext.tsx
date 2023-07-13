import React, {createContext, ReactNode, useState} from 'react';
import {DenunciaAllDTO} from "../../structure/denunciaAll-dto";

interface GeneralContextProps {
    filtroEstado: string;
    denunciasFiltradas: DenunciaAllDTO[];
    fechaInicio: string;
    fechaFin: string;
    tipoDenuncia: string;
    setDenunciasFiltradas: (denunciasFiltradas: DenunciaAllDTO[]) => void;
    setFiltroEstado: (estado: string) => void;
    setFechaInicio: (fecha: string) => void;
    setFechaFin: (fecha: string) => void;
    setTipoDenuncia: (tipo: string) => void;

    id: string | null;
    nombre: string | null;
    correo: string;
    departamento: string | null;
    nombreDepartamento: string | null;
    setId: (nombre: string) => void;
    setNombre: (nombre: string) => void;
    setCorreo: (correo: string) => void;
    setNombreDepartamento: (nombreDepartamento: string) => void;
    setDepartamento: (departamento: string) => void;
}

export const GeneralContext = createContext<GeneralContextProps>({
    filtroEstado: '',
    denunciasFiltradas: [],
    fechaInicio: '',
    fechaFin: '',
    tipoDenuncia: '',
    setDenunciasFiltradas: () => {
    },
    setFiltroEstado: () => {
    },
    setFechaInicio: () => {
    },
    setFechaFin: () => {
    },
    setTipoDenuncia: () => {
    },


    id: '',
    nombre: '',
    correo: '',
    departamento: '',
    nombreDepartamento: '',
    setId: () => {
    },
    setCorreo: () => {
    },
    setDepartamento: () => {
    },
    setNombreDepartamento: () => {
    },
    setNombre: () => {
    },
});

interface GeneralProviderProps {
    children: ReactNode;
}

export const GeneralProvider = ({children}: GeneralProviderProps) => {
    const [filtroEstado, setFiltroEstado] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [tipoDenuncia, setTipoDenuncia] = useState('');
    const [denunciasFiltradas, setDenunciasFiltradas] = useState<DenunciaAllDTO[]>([]);

    const [nombre, setNombre] = useState(!localStorage.getItem('nombre') ? '' : localStorage.getItem('nombre'));
    const [correo, setCorreo] = useState('');
    const [nombreDepartamento, setNombreDepartamento] = useState(!localStorage.getItem('nombreDepartamento') ? '' : localStorage.getItem('nombreDepartamento'));
    const [departamento, setDepartamento] = useState(!localStorage.getItem('departamento') ? '' : localStorage.getItem('departamento'));
    const [id, setId] = useState(!localStorage.getItem('id') ? '' : localStorage.getItem('id'));

    return (
        <GeneralContext.Provider
            value={{
                denunciasFiltradas,
                filtroEstado,
                fechaInicio,
                fechaFin,
                tipoDenuncia,
                setDenunciasFiltradas,
                setFiltroEstado,
                setFechaInicio,
                setFechaFin,
                setTipoDenuncia,

                id,
                nombre,
                correo,
                departamento,
                nombreDepartamento,
                setId,
                setCorreo,
                setDepartamento,
                setNombreDepartamento,
                setNombre,
            }}
        >
            {children}
        </GeneralContext.Provider>
    );
};
