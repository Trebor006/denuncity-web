import DefaultLayout from '../../layout/DefaultLayout';
import TipoDenuncia from "./TipoDenuncia";
import Breadcrumb from "../../components/Breadcrumb";

const TipoDenunciaForm = () => {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Registrar Tipo Denuncia" />
            <TipoDenuncia/>
        </DefaultLayout>
    );
};

export default TipoDenunciaForm;
