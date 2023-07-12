import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from "../../components/Breadcrumb";
import DenunciaComponent from "./DenunciaComponent";

const FuncionarioForm = () => {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Revisar Denuncia"/>
            <DenunciaComponent/>
        </DefaultLayout>
    );
};

export default FuncionarioForm;
