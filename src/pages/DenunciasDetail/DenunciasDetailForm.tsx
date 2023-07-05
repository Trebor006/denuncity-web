import DefaultLayout from '../../layout/DefaultLayout';
import DenunciasDetail from "./DenunciasDetail";
import Breadcrumb from "../../components/Breadcrumb";

const DenunciasDetailForm = () => {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Detalle de Denuncias" />
            <DenunciasDetail/>
        </DefaultLayout>
    );
};

export default DenunciasDetailForm;
