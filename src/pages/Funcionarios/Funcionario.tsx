import React, {useEffect, useState} from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Departamento {
    id: number;
    nombre: string;
}

const Funcionario = () => {
    const [isEditing, setIsEditing] = useState(true);

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [ci, setCI] = useState("");
    const [celular, setCelular] = useState("");
    const [correo, setCorreo] = useState("");

    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
    const [departamento, setDepartamento] = useState("");

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

    const handleApellidoChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setApellido(event.target.value);
    };

    const handleCIChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCI(event.target.value);
    };

    const handleCelularChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCelular(event.target.value);
    };

    const handleCorreoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCorreo(event.target.value);
    };

    const handleDepartamentoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDepartamento(event.target.value);
    };

    const handleGuardarClick = async () => {
        if (
            nombre === "" ||
            apellido === "" ||
            ci === "" ||
            celular === "" ||
            correo === "" ||
            departamento === ""
        ) {
            toast.error("Por favor, complete todos los campos");
            return;
        }

        try {
            const funcionarioData = {
                nombre,
                apellido,
                ci,
                celular,
                correo,
                departamento,
            };

            // Enviar los datos al servidor
            const response = await axios.post(
                "http://localhost:3001/funcionarios/registrar",
                funcionarioData
            );

            toast.success("Funcionario registrado exitosamente");
            console.log("Respuesta del servidor:", response.data);

            // Restablecer los valores del formulario
            setNombre("");
            setApellido("");
            setCI("");
            setCelular("");
            setCorreo("");
            setDepartamento("");
        } catch (error) {
            toast.error("Error al guardar el funcionario");
            console.error("Error al guardar el funcionario:", error);
        }
    };

    return (
        <div className="mx-auto max-w-270">
            <div className="grid grid-cols-5 gap-8">
                <div className="col-span-5 xl:col-span-3">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="p-7">
                            <form>
                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                    <div className="w-full sm:w-1/2">
                                        <label
                                            htmlFor="name"
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        >
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={nombre}
                                            onChange={handleNombreChange}
                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            placeholder="Nombre"
                                        />
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <label
                                            htmlFor="lastname"
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        >
                                            Apellido
                                        </label>
                                        <input
                                            type="text"
                                            id="lastname"
                                            value={apellido}
                                            onChange={handleApellidoChange}
                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            placeholder="Apellido"
                                        />
                                    </div>
                                </div>
                                <div className="mb-5.5">
                                    <label
                                        htmlFor="ci"
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    >
                                        CI:
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="ci"
                                            value={ci}
                                            onChange={handleCIChange}
                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            placeholder="# de Carnet"
                                        />
                                    </div>
                                </div>
                                <div className="mb-5.5">
                                    <label
                                        htmlFor="celular"
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    >
                                        Celular:
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="celular"
                                            value={celular}
                                            onChange={handleCelularChange}
                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            placeholder="# de Celular"
                                        />
                                    </div>
                                </div>
                                <div className="mb-5.5">
                                    <label
                                        htmlFor="correo"
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    >
                                        Correo
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="correo"
                                            value={correo}
                                            onChange={handleCorreoChange}
                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            placeholder="Correo"
                                        />
                                    </div>
                                </div>

                                <div className="mb-5.5">
                                    <label
                                        htmlFor="correo"
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    >
                                        Departamento:
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="departamento"
                                            value={departamento}
                                            disabled={!isEditing}
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
                                </div>
                                <div className="flex justify-end gap-4.5">
                                    <a href="/funcionarios"
                                       className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                    >
                                        Cancelar
                                    </a>
                                    <button
                                        onClick={handleGuardarClick}
                                        className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                                        type="button"
                                    >
                                        Registrar Funcionario
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/*<div className="col-span-5 xl:col-span-2">*/}
                {/*    <div*/}
                {/*        className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">*/}
                {/*         */}
                {/*        <div className="p-7">*/}
                {/*            <form action="#">*/}
                {/*                <div className="mb-4 flex items-center gap-3">*/}
                {/*                    <div className="h-14 w-14 rounded-full">*/}
                {/*                        /!*<img src={userThree} alt="User"/>*!/*/}
                {/*                    </div>*/}
                {/*                    <div>*/}
                {/*      <span className="mb-1.5 text-black dark:text-white">*/}
                {/*        Edit your photo*/}
                {/*      </span>*/}
                {/*                        <span className="flex gap-2.5">*/}
                {/*        <button className="text-sm hover:text-primary">*/}
                {/*          Delete*/}
                {/*        </button>*/}
                {/*        <button className="text-sm hover:text-primary">*/}
                {/*          Update*/}
                {/*        </button>*/}
                {/*      </span>*/}
                {/*                    </div>*/}
                {/*                </div>*/}

                {/*                <div*/}
                {/*                    id="FileUpload"*/}
                {/*                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"*/}
                {/*                >*/}
                {/*                    <input*/}
                {/*                        type="file"*/}
                {/*                        accept="image/*"*/}
                {/*                        className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"*/}
                {/*                    />*/}
                {/*                    <div className="flex flex-col items-center justify-center space-y-3">*/}
                {/*       */}
                {/*                        <p>*/}
                {/*                            <span className="text-primary">Click to upload</span> or*/}
                {/*                            drag and drop*/}
                {/*                        </p>*/}
                {/*                        <p className="mt-1.5">SVG, PNG, JPG or GIF</p>*/}
                {/*                        <p>(max, 800 X 800px)</p>*/}
                {/*                    </div>*/}
                {/*                </div>*/}

                {/*                <div className="flex justify-end gap-4.5">*/}
                {/*                    <button*/}
                {/*                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"*/}
                {/*                        type="submit"*/}
                {/*                    >*/}
                {/*                        Cancel*/}
                {/*                    </button>*/}
                {/*                    <button*/}
                {/*                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"*/}
                {/*                        type="submit"*/}
                {/*                    >*/}
                {/*                        Save*/}
                {/*                    </button>*/}
                {/*                </div>*/}
                {/*            </form>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

            </div>
            <ToastContainer />
        </div>
    );
};

export default Funcionario;
