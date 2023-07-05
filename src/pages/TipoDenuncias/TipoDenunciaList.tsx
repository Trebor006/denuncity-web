import DefaultLayout from '../../layout/DefaultLayout';
import TipoDenuncias from "./TipoDenuncias";
import Breadcrumb from "../../components/Breadcrumb";

const TipoDenunciaForm = () => {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tipo de Denuncias" />
            <TipoDenuncias/>
        </DefaultLayout>
    );
};

export default TipoDenunciaForm;
