import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import AuthUser from 'AuthUser';
import ubicaciones from './ubicacion';
import "../Styles/Login/Login.css";

const Empleados = () => {
  const { http } = AuthUser();
  const [ubicaciones, setUbicaciones] = useState([]);
  const [empleadoDialog, setEmpleadoDialog] = useState(false);
  const [deleteEmpleadoDialog, setDeleteEmpleadoDialog] = useState(false);
  const [empleado, setEmpleado] = useState({
    id: null,
    nombres: '',
    apellido_materno: "",
    apellido_paterno: "",
    direccion: '',
    sexo: '',
    tipo_documento_id: '',
    numero_documento: '',
    celular: '',
    correo: '',
    cargo: '',
    departamento: null,
    provincia: null,
    distrito_id: null,
    estado: "a",
    fecha_nacimiento: "",
    fecha_ingreso: "",


  });
  const [empleados, setEmpleados] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [showProvincia, setShowProvincia] = useState(false); // Nuevo estado para controlar la visibilidad de provincia
  const [provinciasOptions, setProvinciasOptions] = useState([]); // Nuevo estado para almacenar las opciones de provincia filtradas
  const toast = useRef(null);
  const handlegetEmpleado = () => {
    http
      .get('/trabajador')
      .then((response) => {
        setEmpleados(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error fetching data', life: 3000 });
      });
  }
  useEffect(() => {
    handlegetEmpleado()

  }, []);
  const handleSubmit = () => {
    http.post('/trabajador', empleado)
      .then((response) => {
        console.log('Datos enviados con éxito:', response.data);
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Datos enviados con éxito', life: 3000 });
        setEmpleadoDialog(false)
        handlegetEmpleado();
        // Aquí puedes hacer algo con la respuesta, como redirigir al usuario o actualizar el estado
      })
      .catch((error) => {
        console.error('Error enviando datos: ', error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error enviando datos', life: 3000 });
      });

  }
  const handleUpdate = () => {
    http.put(`/trabajador/${empleado?.id}`, empleado)
      .then((response) => {
        console.log('Datos enviados con éxito:', response.data);
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Datos enviados con éxito', life: 3000 });
        setEmpleadoDialog(false)
        handlegetEmpleado();
        // Aquí puedes hacer algo con la respuesta, como redirigir al usuario o actualizar el estado
      })
      .catch((error) => {
        console.error('Error enviando datos: ', error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error enviando datos', life: 3000 });
      });

  }
  const handleDelete = () => {
    http.delete(`/trabajador/${empleado?.id}`, empleado)
      .then((response) => {
        console.log('Datos enviados con éxito:', response.data);
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Datos enviados con éxito', life: 3000 });
        setEmpleadoDialog(false)
        handlegetEmpleado();
        setDeleteEmpleadoDialog(false)
        // Aquí puedes hacer algo con la respuesta, como redirigir al usuario o actualizar el estado
      })
      .catch((error) => {
        console.error('Error enviando datos: ', error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error enviando datos', life: 3000 });
      });

  }


  useEffect(() => {
    http
      .get("/ubicacion")
      .then((response) => {
        setUbicaciones(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const openNew = () => {
    setEmpleado({
      id: null,
      nombres: '',
      apellido_materno: "",
      apellido_paterno: "",
      direccion: '',
      sexo: '',
      tipo_documento_id: '',
      numero_documento: '',
      celular: '',
      correo: '',
      cargo: '',
      departamento: null,
      provincia: null,
      distrito_id: null,
      estado: "a",
      fecha_nacimiento: "",
      fecha_ingreso: "",
    });
    setSubmitted(false);
    setEmpleadoDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setEmpleadoDialog(false);
  };

  const hideDeleteEmpleadoDialog = () => {
    setDeleteEmpleadoDialog(false);
  };

  const saveEmpleado = () => {
    setSubmitted(true);
    if (empleado.id) {
      handleUpdate()
  
    } else {
      handleSubmit()
    }

  };

  const editEmpleado = (empleados) => {
   

    console.log("row",empleados)
    
    const departamentoSeleccionado = ubicaciones.find(ubicacion => ubicacion.id === empleados?.departamento);
    if (departamentoSeleccionado) {
      const provinciasDepartamento = departamentoSeleccionado.provincia.map(provincia => ({
        label: provincia.provincia_nombre,
        value: provincia.id
      }));
      setProvinciasOptions(provinciasDepartamento);
    } else {
      setProvinciasOptions([]); // Reset provinciasOptions if departamento is not found
    }
    const provinciaSeleccionada = ubicaciones.flatMap(departamento => departamento.provincia).find(provincia => provincia.id === empleados.provincia);
    console.log("pros",provinciaSeleccionada)
    if (provinciaSeleccionada) {
      const distritosProvincia = provinciaSeleccionada.distrito.map(distrito => ({
        label: distrito.distrito_nombre,
        value: distrito.id
      }));
      console.log("datos",distritosOptions)
      setDistritosOptions(distritosProvincia);
      setShowDistrito(true); // Show the distrito field once the provincia is selected
    } else {
      setDistritosOptions([]);
      setShowDistrito(false);
    }
    setEmpleado({ ...empleados});
    console.log("row2",empleado)
    setShowDistrito(true)
    
    setEmpleadoDialog(true);
    setShowProvincia(true)
  };

  const confirmDeleteEmpleado = (empleado) => {
    setEmpleado(empleado);
    setDeleteEmpleadoDialog(true);

  };

  const deleteEmpleado = () => {
    handleDelete()
  };
  const handleProvinciaChange = (e) => {
    const value = e.value;
    console.log("data", value)
    setEmpleado(prevEmpleado => ({
      ...prevEmpleado,
      provincia: value,
      distrito_id: null, // Reset distrito when provincia changes
    }));

    // Filter distritos based on the selected provincia
    const provinciaSeleccionada = ubicaciones.flatMap(departamento => departamento.provincia).find(provincia => provincia.id === value);
    if (provinciaSeleccionada) {
      const distritosProvincia = provinciaSeleccionada.distrito.map(distrito => ({
        label: distrito.distrito_nombre,
        value: distrito.id
      }));
      setDistritosOptions(distritosProvincia);
      setShowDistrito(true); // Show the distrito field once the provincia is selected
    } else {
      setDistritosOptions([]);
      setShowDistrito(false);
    }
  };
  const handleDepartamentoChange = (e) => {

    const value = e.value;
    console.log("data", value)
    setEmpleado(prevEmpleado => ({
      ...prevEmpleado,
      departamento: value,
      provincia: null, // Reset provincia when departamento changes
      distrito_id: null, // Reset distrito when departamento changes
    }));

    setShowProvincia(true); // Show provincia after selecting departamento

    // Filter provincias based on the selected departamento
    const departamentoSeleccionado = ubicaciones.find(ubicacion => ubicacion.id === value);
    if (departamentoSeleccionado) {
      const provinciasDepartamento = departamentoSeleccionado.provincia.map(provincia => ({
        label: provincia.provincia_nombre,
        value: provincia.id
      }));
      setProvinciasOptions(provinciasDepartamento);
    } else {
      setProvinciasOptions([]); // Reset provinciasOptions if departamento is not found
    }
  };
  const handleDistritoChange = (e) => {
    const value = e.value;
    console.log("data", value)
    setEmpleado(prevEmpleado => ({
      ...prevEmpleado,
      distrito_id: value,
    }));
    console.log("empleado", empleado)
  };
  const onInputChange = (e, fieldName) => {
    const { value } = e.target;
    setEmpleado(prevEmpleado => ({
      ...prevEmpleado,
      [fieldName]: value,
    }));
  };
  const [distritosOptions, setDistritosOptions] = useState([]);
  const [showDistrito, setShowDistrito] = useState(false);


  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button label="Nuevo" icon="pi pi-plus" className="p-button-success" onClick={openNew} />
      </React.Fragment>
    );
  };

  const empleadoDialogFooter = (
    <React.Fragment>
      <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveEmpleado} />
    </React.Fragment>
  );

  const deleteEmpleadoDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteEmpleadoDialog} />
      <Button label="Sí" icon="pi pi-check" className="p-button-text" onClick={deleteEmpleado} />
    </React.Fragment>
  );

  const header = (
    <div className="table-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <h5 className="mx-0 my-1">Gestionar Empleados</h5>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span className="p-input-icon-left" style={{ marginRight: '12px' }}>
          <i className="pi pi-search" style={{ marginLeft: '12px', cursor: 'pointer' }} />
          <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
        </span>
        <Button label="Agregar" icon="pi pi-plus" className="p-button-success" onClick={openNew} />
      </div>
    </div>
  );

  return (
    <div className="layout">
      <div className="content">
        <Toast ref={toast} />
        <div className="card crud">
          <h1 className='fontGeneral'>GESTIONAR EMPLEADOS</h1>
          <DataTable
            value={empleados}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
            globalFilter={globalFilter}
            header={header}
            responsiveLayout="scroll"
            className="p-datatable-customers fontGeneral"
          >
            <Column field="id" header="ID" sortable style={{ minWidth: '4rem' }}></Column>
            <Column field="nombre_completo" header="Nombre Completo" sortable style={{ minWidth: '10rem' }}></Column>
            <Column field="documento" header="DNI" sortable style={{ minWidth: '10rem' }}></Column>
            <Column field="distrito" header="Distrito" sortable style={{ minWidth: '8rem' }}></Column>
            <Column field="direccion" header="Dirección" sortable style={{ minWidth: '10rem' }}></Column>
            <Column field="sexo" header="Sexo" sortable style={{ minWidth: '6rem' }}></Column>
            <Column field="celular" header="Celular" sortable style={{ minWidth: '8rem' }}></Column>
            <Column field="correo" header="Correo" sortable style={{ minWidth: '12rem' }}></Column>
            <Column field="cargo" header="Cargo" sortable style={{ minWidth: '8rem' }}></Column>
            <Column field="fecha_ingreso" header="Fecha de Ingreso" sortable style={{ minWidth: '10rem' }}></Column>
            <Column
              body={(rowData) => (
                <React.Fragment>
                  <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editEmpleado(rowData)} />
                  <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteEmpleado(rowData)} />
                </React.Fragment>
              )}
              style={{ minWidth: '8rem' }}
            ></Column>
          </DataTable>

        

        </div>
        <Dialog visible={empleadoDialog} style={{ width: '450px' }} header="Detalles del Empleado" modal className="p-fluid" footer={empleadoDialogFooter} onHide={hideDialog}>
          {/* Contenido del diálogo */}
          <div className="field">
            <label htmlFor="nombre">Nombres</label>
            <InputText id="nombre" value={empleado.nombres} onChange={(e) => onInputChange(e, 'nombres')} required autoFocus className={submitted && !empleado.nombres ? 'p-invalid' : ''} placeholder="Ingrese nombres" />
            {submitted && !empleado.nombres && <small className="p-error">Nombres es requerido.</small>}
          </div>


          <div className="field">
            <label htmlFor="apellido_paterno">Apellido Paterno</label>
            <InputText id="apellido" value={empleado.apellido_paterno} onChange={(e) => onInputChange(e, 'apellido_paterno')} required className={submitted && !empleado.apellido_paterno ? 'p-invalid' : ''} placeholder="Ingrese apellido paterno" />
            {submitted && !empleado.apellido_paterno && <small className="p-error">Apellidos es requerido.</small>}
          </div>
          <div className="field">
            <label htmlFor="apellido_materno">Apellido Materno</label>
            <InputText id="apellido" value={empleado.apellido_materno} onChange={(e) => onInputChange(e, 'apellido_materno')} required className={submitted && !empleado.apellido_materno ? 'p-invalid' : ''} placeholder="Ingrese apellido materno" />
            {submitted && !empleado.apellido_materno && <small className="p-error">Apellidos es requerido.</small>}
          </div>

          <div className="field">
            <label htmlFor="tipo_documento_id">Tipo de Documento</label>
            <Dropdown
              id="tipo_documento"
              value={empleado.tipo_documento_id}
              options={[
                { label: 'DNI', value: 1 },
                { label: 'Extranjería', value: 2 },
                { label: 'Pasaporte', value: 3 }
              ]}
              onChange={(e) => onInputChange({ target: { value: e.value } }, 'tipo_documento_id')}
              placeholder="Seleccione el tipo de documento"
              className={submitted && !empleado.tipo_documento_id ? 'p-invalid' : ''}
            />
            {submitted && !empleado.tipo_documento_id && <small className="p-error">Tipo de documento es requerido.</small>}
          </div>

          <div className="field">
            <label htmlFor="numero_documento">Numero de documento</label>
            <InputText id="numero_documento" value={empleado.numero_documento} onChange={(e) => onInputChange(e, 'numero_documento')} required className={submitted && !empleado.numero_documento ? 'p-invalid' : ''} placeholder="Ingrese documento" />
            {submitted && !empleado.numero_documento && <small className="p-error">Documento es requerido.</small>}
          </div>

          <div className="field">
            <label htmlFor="direccion">Dirección</label>
            <InputText id="direccion" value={empleado.direccion} onChange={(e) => onInputChange(e, 'direccion')} required className={submitted && !empleado.direccion ? 'p-invalid' : ''} placeholder="Ingrese dirección" />
            {submitted && !empleado.direccion && <small className="p-error">Dirección es requerido.</small>}
          </div>
          <div className="field">
            <label htmlFor="fecha_nacimiento">Fecha Nacimiento</label>
            <InputText id="fecha_nacimiento" value={empleado.fecha_nacimiento} onChange={(e) => onInputChange(e, 'fecha_nacimiento')} required className={submitted && !empleado?.fecha_nacimiento ? 'p-invalid' : ''} placeholder="Ingrese fecha nacimiento" />
            {submitted && !empleado.fecha_nacimiento && <small className="p-error">Fecha Nacimiento es requerido.</small>}
          </div>
          <div className="field">
            <label htmlFor="fecha_ingreso">Fecha Ingreso</label>
            <InputText id="fecha_ingreso" value={empleado.fecha_ingreso} onChange={(e) => onInputChange(e, 'fecha_ingreso')} required className={submitted && !empleado.fecha_ingreso ? 'p-invalid' : ''} placeholder="Ingrese fecha ingreso" />
            {submitted && !empleado.fecha_ingreso && <small className="p-error">Fecha Ingreso es requerido.</small>}
          </div>

          <div className="field">
            <label htmlFor="sexo">Sexo</label>
            <Dropdown
              id="sexo"
              value={empleado.sexo}
              options={[
                { label: 'Masculino', value: "m" },
                { label: 'Femenino', value: "f" },
                { label: 'Otro', value: "o" }
              ]}
              onChange={(e) => onInputChange({ target: { value: e.value } }, 'sexo')}
              placeholder="Seleccione el sexo"
              className={submitted && !empleado.sexo ? 'p-invalid' : ''}
            />
            {submitted && !empleado.sexo && <small className="p-error">Sexo es requerido.</small>}
          </div>

          <div className="field">
            <label htmlFor="celular">Celular</label>
            <InputText id="celular" value={empleado.celular} onChange={(e) => onInputChange(e, 'celular')} required className={submitted && !empleado.celular ? 'p-invalid' : ''} placeholder="Ingrese celular" />
            {submitted && !empleado.celular && <small className="p-error">Celular es requerido.</small>}
          </div>

          <div className="field">
            <label htmlFor="correo">Correo</label>
            <InputText id="correo" value={empleado.correo} onChange={(e) => onInputChange(e, 'correo')} required className={submitted && !empleado.correo ? 'p-invalid' : ''} placeholder="Ingrese correo" />
            {submitted && !empleado.correo && <small className="p-error">Correo es requerido.</small>}
          </div>

          <div className="field">
            <label htmlFor="cargo">Cargo</label>
            <InputText id="cargo" value={empleado.cargo} onChange={(e) => onInputChange(e, 'cargo')} required className={submitted && !empleado.cargo ? 'p-invalid' : ''} placeholder="Ingrese cargo" />
            {submitted && !empleado.cargo && <small className="p-error">Cargo es requerido.</small>}
          </div>

          {/* Select para Departamento */}
          <div className="field">
            <label htmlFor="departamento">Departamento</label>
            <Dropdown
              id="departamento"
              value={empleado.departamento}
              options={ubicaciones.map(ubicacion => ({
                label: ubicacion.departamento_nombre,
                value: ubicacion.id
              }))}
              onChange={handleDepartamentoChange}
              placeholder="Seleccione departamento"
              className={submitted && !empleado.departamento ? 'p-invalid' : ''}
            />
            {submitted && !empleado.departamento && <small className="p-error">Departamento es requerido.</small>}
          </div>

          {/* Select para Provincia */}
          {showProvincia && (
            <div className="field">
              <label htmlFor="provincia">Provincia</label>
              <Dropdown
                id="provincia"
                value={empleado.provincia}
                options={provinciasOptions}
                onChange={handleProvinciaChange}
                placeholder="Seleccione provincia"
                className={submitted && !empleado.provincia ? 'p-invalid' : ''}
              // Deshabilita el Dropdown si no se muestra el departamento
              />
              {submitted && !empleado.provincia && <small className="p-error">Provincia es requerida.</small>}
            </div>
          )}

          {/* Select para Distrito */}
          {showProvincia && (
            <div className="field">
              <label htmlFor="distrito">Distrito</label>
              <Dropdown
                id="distrito"
                value={empleado.distrito_id}
                options={distritosOptions}
                onChange={handleDistritoChange}
                placeholder="Seleccione distrito"
                className={submitted && !empleado.distrito ? 'p-invalid' : ''}
                disabled={!showDistrito} // Deshabilita el Dropdown si no se muestra la provincia
              />
              {submitted && !empleado.distrito_id&& <small className="p-error">Distrito es requerido.</small>}
            </div>
          )}

        </Dialog>










        <Dialog visible={deleteEmpleadoDialog} style={{ width: '450px' }} header="Confirmar Eliminación" modal footer={deleteEmpleadoDialogFooter} onHide={hideDeleteEmpleadoDialog}>
          <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
            {empleado && <span>¿Estás seguro de que quieres eliminar el empleado <b>{empleado.nombre_completo}</b>?</span>}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Empleados;
