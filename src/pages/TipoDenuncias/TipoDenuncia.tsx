import React, {useEffect, useState} from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {HexColorPicker} from "react-colorful";

interface Departamento {
    id: number;
    nombre: string;
}

const TipoDenuncia = () => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [color, setColor] = useState("#000000");
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
    const [selectedDepartamento, setSelectedDepartamento] = useState("");

    useEffect(() => {
        fetchDepartamentos();
    }, []);

    const fetchDepartamentos = async () => {
        try {
            const response = await axios.get<Departamento[]>(
                "http://localhost:3001/departamentos"
            );
            setDepartamentos(response.data);
        } catch (error) {
            console.error("Error al obtener los departamentos:", error);
        }
    };

    const handleNombreChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNombre(event.target.value);
    };

    const handleDescripcionChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setDescripcion(event.target.value);
    };

    const handleColorChange = (color: string) => {
        setColor(color);
    };

    const handleDepartamentoChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedDepartamento(event.target.value);
    };

    const handleGuardarClick = async () => {
        if (nombre === "" || descripcion === "" || selectedDepartamento === "") {
            toast.error("Por favor, complete todos los campos");
            return;
        }

        try {
            const tipoDenunciaData = {
                nombre,
                descripcion,
                color,
                departamento: selectedDepartamento,
            };

            // Enviar los datos al servidor
            const response = await axios.post(
                "http://localhost:3001/tipo-denuncias/registrar",
                tipoDenunciaData
            );

            toast.success("Tipo de denuncia registrado exitosamente");
            console.log("Respuesta del servidor:", response.data);

            // Restablecer los valores del formulario
            setNombre("");
            setDescripcion("");
            setColor("#000000");
            setSelectedDepartamento("");
        } catch (error) {
            toast.error("Error al guardar el tipo de denuncia");
            console.error("Error al guardar el tipo de denuncia:", error);
        }
    };

    return (
        <div className="w-1/2 p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Tipo de Denuncia</h2>
            <div className="mb-4">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                    Nombre del Tipo de Denuncia:
                </label>
                <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={handleNombreChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                    Color del Tipo de Denuncia:
                </label>
                <HexColorPicker color={color} onChange={handleColorChange}/>
            </div>
            <div className="mb-4">
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                    Descripción:
                </label>
                <textarea
                    id="descripcion"
                    value={descripcion}
                    onChange={handleDescripcionChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="departamento" className="block text-sm font-medium text-gray-700">
                    Departamento:
                </label>
                <select
                    id="departamento"
                    value={selectedDepartamento}
                    onChange={handleDepartamentoChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                >
                    <option value="">Seleccione un departamento</option>
                    {departamentos.map((departamento) => (
                        <option key={departamento.id} value={departamento.id}>
                            {departamento.nombre}
                        </option>
                    ))}
                </select>
            </div>
            <button
                onClick={handleGuardarClick}
                className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
                Registrar Tipo de Denuncia
            </button>
            <ToastContainer/>
        </div>
    );
};

export default TipoDenuncia;
