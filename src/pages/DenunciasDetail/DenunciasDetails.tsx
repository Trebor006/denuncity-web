import DefaultLayout from '../../layout/DefaultLayout';
import Denuncias from "./Denuncias";
import Breadcrumb from "../../components/Breadcrumb";

const DenunciasDetails = () => {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Detalle de Denuncias" />
            <Denuncias/>
        </DefaultLayout>
    );
};

export default DenunciasDetails;
