import DefaultLayout from '../../layout/DefaultLayout';
import Departamentos from "./Departamentos";
import Breadcrumb from "../../components/Breadcrumb";

const DepartmentForm = () => {

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Funcionarios" />

            <Departamentos/>
        </DefaultLayout>
    );
};

export default DepartmentForm;