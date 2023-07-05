import DefaultLayout from '../../layout/DefaultLayout';
import Funcionario from "./Funcionario";
import Breadcrumb from "../../components/Breadcrumb";

const FuncionarioForm = () => {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Registrar Funcionario" />
            <Funcionario/>
        </DefaultLayout>
    );
};

export default FuncionarioForm;
