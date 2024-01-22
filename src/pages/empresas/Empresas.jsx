import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import BotonEmpresa from "@app/pages/empresas/BotonEmpresa";
import TablaEmpresa from "@app/pages/empresas/tabla";
import { EditarEmpresa, datosEmpresa } from "@app/services/empresas/data.empresa";
import ExcelBotonEmpresa from "@app/pages/empresas/ExcelBotonEmpresa";
import BuscarEmpresa from "@app/pages/empresas/BuscarEmpresa";
import { Button, Form } from "react-bootstrap";
import * as XLSX from 'xlsx';


function reload() {
  location.reload();
}

const Empresas = () => {
  const [divLista, setDivLista] = useState(true);
  const [divAgregar, setDivAgregar] = useState(false);
  const [divActualizar, setDivActualizar] = useState(false);

  const[dato, setDato]= useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const botonAtrasE = ()=>{
    setDivAgregar(false);
    setDivActualizar(false);
    setDivLista(true)
  }
  const botonAgregarE = ()=>{
    setDivAgregar(true);
    setDivActualizar(false);
    setDivLista(false)
  }
  const botonActualizarE = (empresa)=>{

    
    setDato(2);
    setDatosEmpresasU({
      id: empresa.id,
      nombre:empresa.nombre,
      ruc:empresa.ruc,
      direccion:empresa.direccion,
      // desEmpresa:usuario.desEmpresa,
      estado:empresa.estado
    });
    setDivAgregar(false);
    setDivActualizar(true);
    setDivLista(false)
  }

  const [datosEmpresas, setDatosEmpresas] = useState([]);
  const[ datosEmpresaU , setDatosEmpresasU] = useState({});
  
  const [searchText, setSearchText] = useState('');
  const handleSearch = (e) => { setSearchText(e.target.value) };
  const filteredData = datosEmpresas.filter((empresa) => {
    return (empresa.nombre).includes(searchText);
  });

  const obtenerEmpresas= async()=>{
    //spinner on
    setIsLoading(true);
    const empresas = await datosEmpresa();
    const datos = [];
    empresas.forEach((element)=>{
      datos.push({
        id: element.id,
        nombre: element.nombre,
        ruc: element.ruc,
        direccion: element.direccion,
        estado: element.estado
      })
      
    });

    setDatosEmpresas(datos);

    //poner spinner off
    setIsLoading(false);
    
  };
  async function obtenerEmpresas2(){

    await obtenerEmpresas();
    
  };

  const handleInputChange=(e)=>{
    const {name, value} = e.target;
    setDatosEmpresasU({
        ...datosEmpresaU,
        [name]:value,
    });
};
const handleEstadoChange=(e)=>{
    const {name,checked} = e.target;
    setDatosEmpresasU({
        ...datosEmpresaU,
        [name]:checked,
    })

}
async function editarEmpresas(e){
  e.preventDefault();
  const nombre = e.target.formNombre.value;
  const ruc = e.target.formRuc.value;
  const direccion = e.target.formDireccion.value;
  const estado = e.target.formEstado.checked;
  

  await EditarEmpresa(datosEmpresaU.id,
      nombre,
      ruc,
      direccion,
      estado
  );
  


  e.target.formNombre.value="";
  e.target.formRuc.value="";
  e.target.formDireccion.value="";
  

  // reload();
  obtenerEmpresas2();
  botonAtrasE();

}

const exportarXLSX=()=>{
    
  const dataExport =[['Empresa','Ruc','Direccion','Estado']];
  filteredData.forEach((fila)=>{
    dataExport.push([
      fila.nombre , 
      fila.ruc,
      fila.direccion,
      fila.estado
    ]);
  });
  
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(dataExport);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
  XLSX.writeFile(workbook, 'tabla.xlsx');

}
  
  useEffect(()=>{
     obtenerEmpresas2();
  },[]);
  
  return (
    <>
     <h1>Empresas</h1>
     <div style={{ margin: 30,  display:divLista ? 'block' : 'none'}}>
        
        <Button
          variant= "outline-success" 
          style={{ float: "right", margin: 30}}
          type='button' 
          onClick={botonAgregarE}>Agregar Empresa</Button>
          {/* <ExcelBotonEmpresa /> */}
          <a className='btn btn-app'>
                  
                  <i className="fas fa-download" onClick={exportarXLSX}/>
                    Exportar Excel
                  </a>
          <BuscarEmpresa 
          searchText={searchText} handleSearch={handleSearch} 
          />
          {isLoading ? (
          
          <div style={{padding: "220px", display: "flex", justifyContent:"center"}}>
          <Spinner animation="border" variant="danger" />
          </div>
        ) : (
          <TablaEmpresa 
       datos={filteredData}
       reload={obtenerEmpresas2}
       clickEditar={botonActualizarE}
       />
        )}
    </div>
    <div style={{ margin: 30, display:divAgregar ? 'block' : 'none' }}>
        
        <Button 
          style={{ float: "right", margin: 30}}
          variant="outline-danger"
          type='button'
          onClick={botonAtrasE}>Atras</Button>
          <BotonEmpresa reload={obtenerEmpresas2} />
          
      </div>
      <div style={{ margin: 30,  display:divActualizar ? 'block' : 'none'}}>
      <Button
          style={{ float: "right", margin: 30}}
          variant="outline-danger" 
          type='button'
          onClick={botonAtrasE}>atras</Button>
        <div>
        <h3>Actualizar</h3>
          <Form onSubmit={editarEmpresas}>
              <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ingrese un nombre"
                  id="formNombre"
                  name="nombre"
                  value={datosEmpresaU.nombre}
                  onChange={handleInputChange}
                  required
                />
              <Form.Label>RUC</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ingrese un RUC"
                  id="formRuc"
                  name="ruc"
                  value={datosEmpresaU.ruc}
                  onChange={handleInputChange}
                  required
                />

              <Form.Label>Direccion</Form.Label>
              <Form.Control
                type="text"
                placeholder="ingrese su direccion"
                id="formDireccion"
                name="direccion"
                value={datosEmpresaU.direccion}
                onChange={handleInputChange}
                required
              />
              
              <Form.Check // prettier-ignore
                    type="switch"
                    id="formEstado"
                    name="estado"
                    label="Estado"
                    //value={checked}
                    //{datosProducto.estado ? checked : ''}
                    checked={datosEmpresaU.estado}
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
}

export default Empresas;
