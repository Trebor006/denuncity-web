import React from 'react';
import {Denuncia} from "../structure/denuncia";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface DenunciaModalProps {
    denuncia: Denuncia,
    closeModal: () => void;
}

const DenunciaModal = ({denuncia, closeModal}: DenunciaModalProps) => {
    const {correo, titulo, descripcion, tipoDenuncia, estado, imagenesUrls} = denuncia;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">

            <div className="bg-white rounded-lg p-8 max-w-md w-full border ">
                <button onClick={closeModal} className="relative right-0 float-right " >X</button>
                <h2 className="text-xl font-semibold mb-4">Detalles de la denuncia</h2>
                <p><strong>Correo:</strong> {correo}</p>
                <p><strong>Título:</strong> {titulo}</p>
                <p><strong>Descripción:</strong> {descripcion}</p>
                <p><strong>Tipo de denuncia:</strong> {tipoDenuncia}</p>

                <p><strong>Estado:</strong> {estado}</p>
                <p><strong>Imágenes:</strong></p>
                {imagenesUrls && imagenesUrls.length > 0 ? (
                    <Slider>
                        {imagenesUrls.map((url, index) => (
                            <div key={index}>
                                <img src={url} alt={`Imagen ${index + 1}`} />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <p>No hay imágenes disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default DenunciaModal;
