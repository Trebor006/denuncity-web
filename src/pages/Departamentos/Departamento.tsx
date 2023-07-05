import React, {useState} from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Departamento = () => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(event.target.value);
    };

    const handleDescripcionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescripcion(event.target.value);
    };

    const handleGuardarClick = async () => {
        if (nombre === "" || descripcion === "") {
            toast.error("Por favor, complete todos los campos");
            return;
        }

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

            toast.success("Área de trabajo registrado exitosamente");
            console.log("Respuesta del servidor:", response.data);

            // Restablecer los valores del formulario
            setNombre("");
            setDescripcion("");
        } catch (error) {
            toast.error("Error al guardar el área de trabajo");
            console.error("Error al guardar el área de trabajo:", error);
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
