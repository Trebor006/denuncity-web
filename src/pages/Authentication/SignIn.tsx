import React, { useContext, useState } from 'react';
import axios from 'axios';
import { GeneralContext } from '../api/GeneralContext';

const SignIn = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(GeneralContext);
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleCorreoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCorreo(event.target.value);
    };

    const handleContrasenaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContrasena(event.target.value);
    };

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://denuncity-backend-app-in7v2.ondigitalocean.app/funcionarios/login', {
                correo,
                contrasena,
            });

            if (response.data.success) {
                setIsLoggedIn(true);
                console.log('Inicio de sesión exitoso');

                // window.location.reload(); // Recargar la página actual
                console.log("isLoggedIn : " + isLoggedIn);

            } else {
                setIsLoggedIn(false);
                console.log('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                    <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                        Iniciar Sesión
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Correo Electrónico"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    value={correo}
                                    onChange={handleCorreoChange}
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="mb-2.5 block font-medium text-black dark:text-white">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    value={contrasena}
                                    onChange={handleContrasenaChange}
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <input
                                type="submit"
                                value="Iniciar Sesión"
                                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
