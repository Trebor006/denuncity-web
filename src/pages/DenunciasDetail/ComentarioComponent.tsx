import {useState} from 'react';
import {ComentarioDto} from '../../structure/comentario-dto';

interface ComentarioComponentProps {
    id: string | undefined;
    comentarios: ComentarioDto[] | undefined;
    actualizarComentarios: () => void;

}

const ComentarioComponent = ({id, comentarios, actualizarComentarios}: ComentarioComponentProps) => {
    const [showModal, setShowModal] = useState(false);
    const [nuevoComentario, setNuevoComentario] = useState({
        funcionario: '',
        departamento: '',
        comentario: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNuevoComentario({
            ...nuevoComentario,
            [event.target.name]: event.target.value,
        });
    };

    const handleGuardar = () => {
        const url = `http://localhost:3001/denuncias/agregarComentario?id=${id}`;

        nuevoComentario.funcionario = localStorage.getItem('funcionario') || '';
        nuevoComentario.departamento = localStorage.getItem('departamento') || '';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoComentario),
        })
            .then((response) => {
                // Procesar la respuesta del backend
                // ...
                // Cerrar el modal si es necesario
                setShowModal(false);
                actualizarComentarios();
            })
            .catch((error) => {
                // Manejar errores
                console.error('Error al llamar al servicio en el backend:', error);
            });
    };

    return (
        <div className="container mx-auto py-4">
            <h1 className="text-2xl font-bold mb-4">Lista de Comentarios</h1>
            <button
                className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowModal(true)}
            >
                Agregar Comentario
            </button>


            <ul className="space-y-2">
                {comentarios && comentarios.map((comentario) => (
                    <li>
                        <div className="bg-gray-100 p-1 rounded-lg border-2">
                            <p className="text-gray-800 text-sm mb-2">{'Funcionario: ' + comentario.funcionario}</p>
                            <p className="text-gray-800 text-sm mb-2">{'Departamento: ' + comentario.departamento}</p>
                            <p className="text-gray-800 text-sm mb-2">{'Comentario: ' + comentario.comentario}</p>
                            <p className="text-gray-800 text-sm mb-2">{'Fecha de creación: ' + comentario.createdAt}</p>
                        </div>
                    </li>
                ))}
            </ul>

            {showModal && (
                <div
                    className="fixed border-2 top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-lg font-bold mb-4">Agregar Comentario</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-800 font-bold mb-2" htmlFor="comentario">
                                    Comentario:
                                </label>
                                <textarea
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                    id="comentario"
                                    name="comentario"
                                    value={nuevoComentario.comentario}
                                    onChange={handleInputChange}
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
            )}
        </div>
    );
};

export default ComentarioComponent;
