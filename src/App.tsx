import {useContext, useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import MapLayout from "./pages/Maps/MapLayout";
import DepartmentForm from "./pages/Departamentos/DepartmentForm";
import TipoDenunciaForm from "./pages/TipoDenuncias/TipoDenunciaForm";
import DepartmentList from "./pages/Departamentos/DepartmentList";
import TipoDenunciaList from "./pages/TipoDenuncias/TipoDenunciaList";
import FuncionarioForm from "./pages/Funcionarios/FuncionarioForm";
import FuncionarioList from "./pages/Funcionarios/FuncionarioList";
import DenunciasDetails from "./pages/DenunciasDetail/DenunciasDetails";
import {GeneralContext, GeneralProvider} from "./pages/api/GeneralContext";
import DenunciaForm from "./pages/DenunciasDetail/DenunciaForm";


function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const {isLoggedIn} = useContext(GeneralContext);

    const preloader = document.getElementById('preloader');

    if (preloader) {
        setTimeout(() => {
            preloader.style.display = 'none';
            setLoading(false);
        }, 2000);
    }

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
        console.log("isLoggedIn: " + isLoggedIn);
    }, []);

    return loading ? (
        // <p className=" text-center text-danger">Failed to lead app</p>
        null
    ) : (
        <>
            <GeneralProvider>
                {!isLoggedIn ?
                    <Routes>
                        <Route path="/" element={<MapLayout/>}/>

                        <Route path="/login" element={<SignIn/>}/>

                        <Route path="/denuncias-detail" element={<DenunciasDetails/>}/>

                        <Route path="/calendar" element={<Calendar/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/forms/form-elements" element={<FormElements/>}/>
                        <Route path="/forms/form-layout" element={<FormLayout/>}/>
                        <Route path="/tables" element={<Tables/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/chart" element={<Chart/>}/>
                        <Route path="/ui/alerts" element={<Alerts/>}/>
                        <Route path="/ui/buttons" element={<Buttons/>}/>
                        <Route path="/auth/signup" element={<SignUp/>}/>
                    </Routes>
                    :
                    <Routes>
                        <Route path="/" element={<MapLayout/>}/>

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

                        <Route path="/calendar" element={<Calendar/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/forms/form-elements" element={<FormElements/>}/>
                        <Route path="/forms/form-layout" element={<FormLayout/>}/>
                        <Route path="/tables" element={<Tables/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/chart" element={<Chart/>}/>
                        <Route path="/ui/alerts" element={<Alerts/>}/>
                        <Route path="/ui/buttons" element={<Buttons/>}/>
                        <Route path="/auth/signup" element={<SignUp/>}/>
                    </Routes>
                }
            </GeneralProvider>
        </>
    );
}

export default App;
