import React, {useState} from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Departamento = () => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const handleNombreChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setNombre(event.target.value);
    };

    const handleDescripcionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setDescripcion(event.target.value);
    };

    const handleGuardarClick = async () => {
        try {
            const departamentoData = {
                nombre,
                descripcion,
            };

            // Enviar los datos al servidor
            const response = await axios.post(
                "http://localhost:3001/departamentos/registrar",
                departamentoData
            );

            toast.success("TipoDenuncia registrado exitosamente");
            console.log("Respuesta del servidor:", response.data);
        } catch (error) {
            toast.error("Error al guardar el departamento");
            console.error("Error al guardar el departamento:", error);
        }
    };

    return (
        <div className="w-1/2 p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Áreas de Trabajo</h2>
            <div className="mb-4">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                    Nombre de Área:
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
            <button
                onClick={handleGuardarClick}
                className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
                Registrar Área
            </button>
            <ToastContainer/>
        </div>
    );
};

export default Departamento;
