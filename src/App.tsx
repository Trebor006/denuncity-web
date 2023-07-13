import {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import SignIn from './pages/Authentication/SignIn';
import MapLayout from "./pages/Maps/MapLayout";
import DepartmentForm from "./pages/Departamentos/DepartmentForm";
import TipoDenunciaForm from "./pages/TipoDenuncias/TipoDenunciaForm";
import DepartmentList from "./pages/Departamentos/DepartmentList";
import TipoDenunciaList from "./pages/TipoDenuncias/TipoDenunciaList";
import FuncionarioForm from "./pages/Funcionarios/FuncionarioForm";
import FuncionarioList from "./pages/Funcionarios/FuncionarioList";
import DenunciasDetails from "./pages/DenunciasDetail/DenunciasDetails";
import DenunciaForm from "./pages/DenunciasDetail/DenunciaForm";


function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const [logged, setLogged] = useState(localStorage.getItem('logged') === 'true' ? true : false);

    const preloader = document.getElementById('preloader');

    if (preloader) {
        setTimeout(() => {
            preloader.style.display = 'none';
            setLoading(false);
        }, 2000);
    }

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return loading ? (
        // <p className=" text-center text-danger">Failed to lead app</p>
        null
    ) : (
        <>
            {!logged ?
                <Routes>
                    <Route path="/" element={<MapLayout/>}/>
                    <Route path="/login" element={<SignIn/>}/>
                    <Route path="/denuncias-detail" element={<DenunciasDetails/>}/>
                </Routes>
                :
                <Routes>
                    <Route path="/" element={<DenunciasDetails/>}/>

                    <Route path="/departaments" element={<DepartmentList/>}/>
                    <Route path="/departaments/registrar" element={<DepartmentForm/>}/>
                    <Route path="/departaments/ver/:id" element={<DepartmentForm/>}/>
                    <Route path="/departaments/editar/:id" element={<DepartmentForm/>}/>

                    <Route path="/complaintstype" element={<TipoDenunciaList/>}/>
                    <Route path="/complaintstype/registrar" element={<TipoDenunciaForm/>}/>
                    <Route path="/complaintstype/ver/:id" element={<TipoDenunciaForm/>}/>
                    <Route path="/complaintstype/editar/:id" element={<TipoDenunciaForm/>}/>

                    <Route path="/funcionarios" element={<FuncionarioList/>}/>
                    <Route path="/funcionarios/registrar" element={<FuncionarioForm/>}/>
                    <Route path="/funcionarios/ver/:id" element={<FuncionarioForm/>}/>
                    <Route path="/funcionarios/editar/:id" element={<FuncionarioForm/>}/>


                    <Route path="/maps" element={<MapLayout/>}/>
                    <Route path="/denuncias-detail" element={<DenunciasDetails/>}/>
                    <Route path="/denuncias-detail/ver/:id" element={<DenunciaForm/>}/>
                    <Route path="/denuncias-detail/editar/:id" element={<DenunciaForm/>}/>

                </Routes>
            }
        </>
    );
}

export default App;
