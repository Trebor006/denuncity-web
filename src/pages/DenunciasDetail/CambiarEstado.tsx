import React, {useState} from 'react';
import {GrClose} from 'react-icons/gr';

interface CambiarEstadoProps {
    id: string | undefined;
    actualizarEstado: (estado: string, comentario: string) => void;
    closeModalEstadoModal: () => void;
}

const CambiarEstado: React.FC<CambiarEstadoProps> = ({id, actualizarEstado, closeModalEstadoModal}) => {
    const [estado, setEstado] = useState('');
    const [comentario, setComentario] = useState('');

    const handleGuardar = () => {
        actualizarEstado(estado, comentario);
        setEstado('');
        setComentario('');
    };

    return (
        <div className="container mx-auto py-4">
                <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 max-w-md w-full border">
                    <button onClick={closeModalEstadoModal} className="relative right-0 float-right">
                        <GrClose/>
                    </button>
                    <h2 className="text-lg font-bold mb-4">Cambiar Estado</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-800 font-bold mb-2" htmlFor="estado">
                                Estado:
                            </label>
                            <select
                                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                id="estado"
                                name="estado"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                            >
                                <option value="">-- Selecionar Estado --</option>
                                <option value="ACEPTADA">ACEPTADA</option>
                                <option value="RECHAZADA">RECHAZADA</option>
                                <option value="PROCESADA">PROCESADA</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-800 font-bold mb-2" htmlFor="comentario">
                                Comentario:
                            </label>
                            <textarea
                                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                id="comentario"
                                name="comentario"
                                style={{height: '250px'}}
                                value={comentario}
                                onChange={(e) => setComentario(e.target.value)}
                            />
                        </div>
                        <button
                            className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="button"
                            onClick={handleGuardar}
                        >
                            Guardar
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default CambiarEstado;
