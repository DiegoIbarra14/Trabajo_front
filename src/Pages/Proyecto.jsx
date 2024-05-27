import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';

const Proyecto = () => {
  const emptyCliente = {
    id: null,
    nombres_completos: '',
    direccion: '',
    genero: '',
    celular: '',
    correo: '',
    pais: null,
    codigo_pais: ''
  };

  const [generoOptions] = useState([
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Femenino', value: 'Femenino' }
  ]);

  const [paisOptions] = useState([
    { label: 'Seleccionar país', value: null },
    { label: 'Argentina', value: 'Argentina', codigo: '+54' },
    { label: 'Brasil', value: 'Brasil', codigo: '+55' },
    { label: 'Chile', value: 'Chile', codigo: '+56' },
    // Agrega más países según tus necesidades
  ]);

  const [clientes, setClientes] = useState([]);
  const [clienteDialog, setClienteDialog] = useState(false);
  const [deleteClienteDialog, setDeleteClienteDialog] = useState(false);
  const [cliente, setCliente] = useState(emptyCliente);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [showPaisDropdown, setShowPaisDropdown] = useState(false); // Nuevo estado para controlar la visibilidad del Dropdown de país
  const toast = useRef(null);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/clientes')
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error fetching data', life: 3000 });
      });
  }, []);

  const openNew = () => {
    setCliente(emptyCliente);
    setSubmitted(false);
    setClienteDialog(true);
    setShowPaisDropdown(true); // Mostrar el Dropdown de país al abrir el diálogo
  };

  const hideDialog = () => {
    setSubmitted(false);
    setClienteDialog(false);
    setShowPaisDropdown(false); // Ocultar el Dropdown de país al cerrar el diálogo
  };

  const hideDeleteClienteDialog = () => {
    setDeleteClienteDialog(false);
  };

  const saveCliente = () => {
    setSubmitted(true);

    if (cliente.nombres_completos.trim()) {
      let _clientes = [...clientes];
      let _cliente = { ...cliente };

      if (cliente.id) {
        axios
          .put(`http://localhost:8000/api/clientes/${cliente.id}`, _cliente)
          .then((response) => {
            const index = findIndexById(cliente.id);
            _clientes[index] = response.data;
            setClientes(_clientes);
            setClienteDialog(false);
            setCliente(emptyCliente);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Cliente Updated', life: 3000 });
          })
          .catch((error) => {
            console.error('Error updating cliente: ', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error updating cliente', life: 3000 });
          });
      } else {
        axios
          .post('http://localhost:8000/api/clientes', _cliente)
          .then((response) => {
            _clientes.push(response.data);
            setClientes(_clientes);
            setClienteDialog(false);
            setCliente(emptyCliente);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Cliente Created', life: 3000 });
          })
          .catch((error) => {
            console.error('Error creating cliente: ', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error creating cliente', life: 3000 });
          });
      }
    }
  };

  const editCliente = (cliente) => {
    setCliente({ ...cliente });
    setClienteDialog(true);
    setShowPaisDropdown(false); // Ocultar el Dropdown de país al abrir el diálogo para editar
  };

  const confirmDeleteCliente = (cliente) => {
    setCliente(cliente);
    setDeleteClienteDialog(true);
  };

  const deleteCliente = () => {
    axios
      .delete(`http://localhost:8000/api/clientes/${cliente.id}`)
      .then(() => {
        let _clientes = clientes.filter((val) => val.id !== cliente.id);
        setClientes(_clientes);
        setDeleteClienteDialog(false);
        setCliente(emptyCliente);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Cliente Deleted', life: 3000 });
      })
      .catch((error) => {
        console.error('Error deleting cliente: ', error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error deleting cliente', life: 3000 });
      });
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < clientes.length; i++) {
      if (clientes[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _cliente = { ...cliente };
    _cliente[`${name}`] = val;
    setCliente(_cliente);
  };

  const onPaisChange = (e) => {
    const selectedPais = e.value;
    const selectedPaisData = paisOptions.find((pais) => pais.value === selectedPais);
    if (selectedPaisData) {
      const codigoPais = selectedPaisData.codigo;
      setCliente((prevState) => ({
        ...prevState,
        pais: selectedPais,
        codigo_pais: codigoPais
      }));
    } else {
      setCliente((prevState) => ({
        ...prevState,
        pais: null,
        codigo_pais: ''
      }));
    }
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        {showPaisDropdown && (
          <Dropdown
            value={cliente.pais}
            options={paisOptions}
            onChange={onPaisChange}
            placeholder="Seleccionar país"
            className="mr-2"
          />
        )}
        <Button label="Nuevo" icon="pi pi-plus" className="p-button-success" onClick={openNew} />
      </React.Fragment>
    );
  };

  const clienteDialogFooter = (
    <React.Fragment>
      <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveCliente} />
    </React.Fragment>
  );

  const deleteClienteDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteClienteDialog} />
      <Button label="Sí" icon="pi pi-check" className="p-button-text" onClick={deleteCliente} />
    </React.Fragment>
  );

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Gestionar Proyecto</h5>
      <span className="p-input-icon-left" >
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
      </span>
    </div>
  );

  return (
    <div className="layout ">
      <div className="content">
        <Toast ref={toast} />
        <div className="card crud">
          <h1>GESTIONAR PROYECTO</h1>
          <DataTable
            value={clientes}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
            globalFilter={globalFilter}
            header={header}
            responsiveLayout="scroll"
          >
            <Column field="id" header="ID" sortable style={{ minWidth: '4rem' }}></Column>
            <Column field="nombres_completos" header="Nombres Completos" sortable style={{ minWidth: '12rem' }}></Column>
            <Column field="DNI" header="DNI" sortable style={{ minWidth: '12rem' }}></Column>
            <Column field="direccion" header="Dirección" sortable style={{ minWidth: '12rem' }}></Column>
            <Column field="genero" header="Género" sortable style={{ minWidth: '8rem' }}></Column>
            <Column field="celular" header="Celular" sortable style={{ minWidth: '10rem' }}></Column>
            <Column field="correo" header="Correo" sortable style={{ minWidth: '12rem' }}></Column>
            <Column
              body={(rowData) => (
                <React.Fragment>
                  <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editCliente(rowData)} />
                  <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteCliente(rowData)} />
                </React.Fragment>
              )}
              style={{ minWidth: '8rem' }}
            ></Column>
          </DataTable>
        </div>

        <Dialog visible={clienteDialog} style={{ width: '450px' }} header="Detalles del Cliente" modal className="p-fluid" footer={clienteDialogFooter} onHide={hideDialog}>
          <div className="field">
            <label htmlFor="nombres_completos">Nombres Completos</label>
            <InputText id="nombres_completos" value={cliente.nombres_completos} onChange={(e) => onInputChange(e, 'nombres_completos')} required autoFocus className={submitted && !cliente.nombres_completos ? 'p-invalid' : ''} />
            {submitted && !cliente.nombres_completos && <small className="p-error">Nombres completos es requerido.</small>}
          </div>

          <div className="field">
            <label htmlFor="direccion">Dirección</label>
            <InputText id="direccion" value={cliente.direccion} onChange={(e) => onInputChange(e, 'direccion')} required className={submitted && !cliente.direccion ? 'p-invalid' : ''} />
            {submitted && !cliente.direccion && <small className="p-error">Dirección es requerida.</small>}
          </div>

          <div className="field">
            <label htmlFor="genero">Género</label>
            <Dropdown
              id="genero"
              value={cliente.genero}
              options={generoOptions}
              onChange={(e) => onInputChange({ target: { value: e.value } }, 'genero')}
              placeholder="Seleccione el género"
              required
              className={submitted && !cliente.genero ? 'p-invalid' : ''}
            />
            {submitted && !cliente.genero && <small className="p-error">Género es requerido.</small>}
          </div>

          <div className="field">
            <label htmlFor="pais">País</label>
            <Dropdown
              id="pais"
              value={cliente.pais}
              options={paisOptions}
              onChange={onPaisChange}
              placeholder="Seleccionar país"
              required
              className={submitted && !cliente.pais ? 'p-invalid' : ''}
            />
            {submitted && !cliente.pais && <small className="p-error">País es requerido.</small>}
          </div>

          <div className="field">
            <label htmlFor="celular">Celular</label>
            <InputText id="celular" value={cliente.celular} onChange={(e) => onInputChange(e, 'celular')} required className={submitted && !cliente.celular ? 'p-invalid' : ''} />
            {submitted && !cliente.celular && <small className="p-error">Celular es requerido.</small>}
          </div>

          <div className="field">
            <label htmlFor="codigo_pais">Código País</label>
            <InputText id="codigo_pais" value={cliente.codigo_pais} readOnly />
          </div>

          <div className="field">
            <label htmlFor="correo">Correo</label>
            <InputText id="correo" value={cliente.correo} onChange={(e) => onInputChange(e, 'correo')} required className={submitted && !cliente.correo ? 'p-invalid' : ''} />
            {submitted && !cliente.correo && <small className="p-error">Correo es requerido.</small>}
          </div>
        </Dialog>

        <Dialog visible={deleteClienteDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteClienteDialogFooter} onHide={hideDeleteClienteDialog}>
          <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
            {cliente && (
              <span>
                ¿Estás seguro de que quieres eliminar <b>{cliente.nombres_completos}</b>?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Proyecto;
