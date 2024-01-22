import BotonAgregarTipoUsuario from "@app/pages/tipoUsuario/AgregarTipoUsuario";
import BuscarTipoUsuario from "@app/pages/tipoUsuario/BuscarTipoUsuario";
import TablaTipoUsuario from "@app/pages/tipoUsuario/TablaTipoUsuario";
import {
  EditarTipoUsuario,
  datosTipoUsuario,
} from "@app/services/tipoUsuario/tipoUsuario";
import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import * as XLSX from 'xlsx';

function reload() {
  location.reload();
}

const TipoUsuario = () => {
  const [divListaT, setDivListaT] = useState(true);
  const [divAgregarT, setDivAgregarT] = useState(false);
  const [divActualizarT, setDivActualizarT] = useState(false);

  const [datosTipoUsuarioU, setDatosTipoUsuarioU] = useState({});
  const [checked, setChecked] = useState(false);
  const[dato, setDato]= useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const botonAtrasT = () => {
    setDivAgregarT(false);
    setDivActualizarT(false);
    setDivListaT(true);
  };
  const botonAgregarT = () => {
    setDivAgregarT(true);
    setDivActualizarT(false);
    setDivListaT(false);
  };
    const botonActualizarT = (tipousuario)=>{

      setDato(2);
      setDatosTipoUsuarioU({
        id: tipousuario.id,
        nombre:tipousuario.nombre,
        estado:tipousuario.estado
      });
      setDivAgregarT(false);
      setDivActualizarT(true);
      setDivListaT(false)
    }
  const [datosTipoU, setDatosTipoU] = useState([]);
  

  const [searchText, setSearchText] = useState('');
  const handleSearch = (e) => { setSearchText(e.target.value) };
  const filteredData = datosTipoU.filter((tipousuario) => {
    return (tipousuario.nombre).toLowerCase().includes(searchText.toLowerCase());
  });

  const obtenerTipoUsuario = async () => {
    //spinner on
    setIsLoading(true);
    const tipoUsuario = await datosTipoUsuario();
    const datosT = [];
    tipoUsuario.forEach((element) => {
      datosT.push({
        id: element.id,
        nombre: element.nombre,
        estado: element.estado,
      });
    });

    setDatosTipoU(datosT);

    //poner spinner off
    setIsLoading(false);
  };
  async function obtenerTipoUsuario2() {
    await obtenerTipoUsuario();
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosTipoUsuarioU({
      ...datosTipoUsuarioU,
      [name]: value,
    });
  };
  
  const handleEstadoChange = (e) => {
    const { name, checked } = e.target;
    
    setDatosTipoUsuarioU({
      ...datosTipoUsuarioU,
      [name]: checked,
      
    });
    
  };
  async function editarTipoUsuario(e) {
    e.preventDefault();
    const nombre = e.target.formNombre.value;
    const estado = e.target.formEstado.checked;

    await EditarTipoUsuario(datosTipoUsuarioU.id, nombre, estado);

    e.target.formNombre.value = "";

    reload();
    handleClose();
  }

  const exportarXLSX = () => {
    const dataExport = [["Tipo Usuario", "Estado"]];
    filteredData.forEach((fila) => {
      dataExport.push([fila.nombre, fila.estado]);
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(dataExport);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
    XLSX.writeFile(workbook, "tabla.xlsx");
  };
  useEffect(() => {
    obtenerTipoUsuario2();
  }, []);

  return( 
    <>
        <h1>Tipo Usuario</h1>
        <div style={{ margin: 30,  display:divListaT ? 'block' : 'none'}}>
        
        <Button
          variant= "outline-success" 
          style={{ float: "right", margin: 30}}
          type='button' 
          onClick={botonAgregarT}>Agregar Tipo de Usuario</Button>
          {/* <ExcelBotonEmpresa /> */}
          <a className='btn btn-app'>
                  
                  <i className="fas fa-download" onClick={exportarXLSX}/>
                    Exportar Excel
                  </a>
          <BuscarTipoUsuario 
          searchText={searchText} handleSearch={handleSearch} 
          />
          {isLoading ? (
          
          <div style={{padding: "220px", display: "flex", justifyContent:"center"}}>
          <Spinner animation="border" variant="danger" />
          </div>
        ) : (
          <TablaTipoUsuario 
       datos={filteredData}
       reload={obtenerTipoUsuario2}
       clickEditar={botonActualizarT}
       />
        )}
    </div>
    <div style={{ margin: 30, display:divAgregarT ? 'block' : 'none' }}>
        
        <Button 
          style={{ float: "right", margin: 30}}
          variant="outline-danger"
          type='button'
          onClick={botonAtrasT}>Atras</Button>
          <BotonAgregarTipoUsuario reload={obtenerTipoUsuario2} />
          
      </div>
      <div style={{ margin: 30,  display:divActualizarT ? 'block' : 'none'}}>
      <Button
          style={{ float: "right", margin: 30}}
          variant="outline-danger" 
          type='button'
          onClick={botonAtrasT}>atras</Button>
        <div>
        <h3>Actualizar</h3>
          <Form onSubmit={editarTipoUsuario}>
              <Form.Label>Tipo Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ingrese un nombre"
                  id="formNombre"
                  name="nombre"
                  value={datosTipoUsuarioU.nombre}
                  onChange={handleInputChange}
                  required
                />
              <Form.Check // prettier-ignore
                    type="switch"
                    id="formEstado"
                    name="estado"
                    // label="Estado"
                    // value={checked}
                    // {datosProducto.estado ? checked : ''}
                    checked={datosTipoUsuarioU.estado}
                    // value={datosProducto.estado}
                    onChange={handleEstadoChange}
                />
          <hr/>
          <Button type='submit'>Guardar</Button>
          </Form>
        </div>
      </div>   
    </>
  );
};

export default TipoUsuario;
