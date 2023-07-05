import DefaultLayout from '../../layout/DefaultLayout';
import Funcionarios from "./Funcionarios";
import Breadcrumb from "../../components/Breadcrumb";

const DepartmentForm = () => {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Funcionarios" />

            <Funcionarios/>
        </DefaultLayout>
    );
};

export default DepartmentForm;
