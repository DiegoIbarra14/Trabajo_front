import React, { createContext, useContext, useState } from 'react';

export const clienteContext = createContext(null);

export const ClienteProvider = ({ children }) => {
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState({
        cliente_nombre: "",
        cliente_apellido_paterno: "",
        cliente_apellido_materno: "",
        cliente_direccion: "",
        cliente_genero: "",
        cliente_telefono: "",
        cliente_correo: "",
        distrito_nombre: null
    });

    return (
        <clienteContext.Provider value={{ clientes, setClientes, cliente, setCliente }}>
            {children}
        </clienteContext.Provider>
    );
};