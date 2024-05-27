import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { history } from 'Services/history';
import AdminLayout from 'layouts/Admin';
import AuthLayout from 'layouts/Auth';
import Clientes from 'Pages/Clientes';
import Container from 'Container/Container';
import Proyecto from 'Pages/Proyecto';
import Contrato from 'Pages/Contrato';
import Empleados from 'Pages/Empleados';
import { ClienteProvider } from 'Context/ClienteContext';



const App = () => {
    const { accesos } = useSelector((data) => data.data);
    history.navigate = useNavigate();
    history.location = useLocation();
    const accesosGeneral = {
        "Clientes": <ClienteProvider>
             <Clientes />

        </ClienteProvider>
       ,
        "Proyectos":<Proyecto></Proyecto> ,
        "Contratos": <Contrato />,
        "Empleados": <Empleados />,


    }
    function RouteWrapper({ Component, ...restProps }) {
        return <Component {...restProps} />;
     }


    return (
        <Routes>
                        <Route path="/login" element={<AuthLayout />} />
                        
                        
                        <Route path="/" element={<Container rutas={accesos} />}>
                            {accesos && accesos.map((acceso) => (
                                <Route
                                    key={acceso.url}
                                    path={acceso.url}
                                    element={accesosGeneral[acceso.label]}
                                />
                            ))}
                        </Route>
                        
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
    );
}
export default App;