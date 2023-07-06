import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from "../../components/Breadcrumb";
import Denuncia from "./Denuncia";

const FuncionarioForm = () => {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Revisar Denuncia"/>
            <Denuncia/>
        </DefaultLayout>
    );
};

export default FuncionarioForm;
