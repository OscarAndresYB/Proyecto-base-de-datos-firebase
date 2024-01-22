import React from 'react'
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import TablaUsuarios from '@app/pages/usuarios/TablaUsuarios';
import BotonUsuarios from '@app/pages/usuarios/BotonUsuario';
import Header from '@app/modules/main/header/Header';
import MenuSidebar from '@app/modules/main/menu-sidebar/MenuSidebar';
import Footer from '@app/modules/main/footer/Footer';
import ControlSidebar from '@app/modules/main/control-sidebar/ControlSidebar';
import { agregarUsuario, datosUsuario} from '@app/services/usuarios/data.usuario';
import { datosEmpresa } from '@app/services/empresas/data.empresa';
import ExcelBotonUsuario from '@app/pages/usuarios/ExcelBotonUsuario';
import BuscarUsuario from '@app/pages/usuarios/BuscarUsuario';
import { Form, Button, FormGroup, InputGroup, Badge} from "react-bootstrap";
import EditUsuario from '@app/pages/usuarios/EditarUsuario';
import { EditarUsuario } from '@app/services/usuarios/data.usuario';
import * as XLSX from 'xlsx';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import app from '@app/Conexion/credenciales';

const baseDEDatos = getFirestore(app)
const coleccion = 'tipousuario'

function reload() {
  location.reload();
}

export const Usuarios = () => {

  const [divLista, setDivLista] = useState(true);
  const [divAgregar, setDivAgregar] = useState(false);
  const [divActualizar, setDivActualizar] = useState(false);

  const[dato, setDato]= useState(0);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState({
    // id: '',
    // nombre:      '',
    // idEmpresa:   '',
    // tipoUsuario: '',
    // estado:      false
  }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [tipoUsuarioU, setTipoUsuario] = useState([]);

    useEffect(() => {
      const getTipoUsuario = async () => {
        const tipoUsuarioSnapshot = await getDocs(collection(baseDEDatos, coleccion));
        
        const tipousuarioFormat = []
        tipoUsuarioSnapshot.forEach((row)=>{
          tipousuarioFormat.push({id: row.id, nombre: row.data().nombre})
        });
        
        setTipoUsuario(tipousuarioFormat);
        
      };
      getTipoUsuario();
      
      
    }, []);


  const botonAtras = ()=>{
    setDivAgregar(false);
    setDivActualizar(false);
    setDivLista(true)
  }
  const botonAgregar = ()=>{
    setDivAgregar(true);
    setDivActualizar(false);
    setDivLista(false)
  }
  const botonActualizar = (usuario)=>{

    // console.log('dato antes:',dato);
    setDato(2);
    // console.log('dato despues:',dato);
    // console.log('usuario: ' + JSON.stringify(usuario));
    // console.log('usuarioSelecionado antes : ' + JSON.stringify(usuarioSelecionado));

    setDatosUsuarioU({
      id: usuario.id,
      nombre:usuario.nombre,
      idEmpresa:usuario.idEmpresa,
      tipoUsuario:usuario.tipoUsuario,
      desEmpresa:usuario.desEmpresa,
      estado:usuario.estado
    });
    // console.log('usuarioSelecionado despues: ' + JSON.stringify(usuarioSelecionado));
    setDivAgregar(false);
    setDivActualizar(true);
    setDivLista(false)
  }
  
  
  const [datosUsuarios, setDatosUsuarios] = useState([]);
  const [arrayEmpresas, setArrayEmpresas] = useState([]);

  const[ datosUsuarioU , setDatosUsuarioU] = useState({});
  

  

  const [searchText, setSearchText] = useState('');
  const handleSearch = (e) => { setSearchText(e.target.value) };
  const filteredData = datosUsuarios.filter((usuario) => {
    return (usuario.nombre).toLowerCase().includes(searchText.toLowerCase());
  });

  const ordenarUsuarioAsc =()=>{
    // setDatosUsuarios(
      const dataOrdenado = 
      datosUsuarios.sort((a,b) => {
      return(a.nombre.localeCompare(b.nombre))
    });
    // console.log(dataOrdenado);
    // )
    setDatosUsuarios(datosUsuarios.sort((a,b) => {
      return(a.nombre.localeCompare(b.nombre))
    }));
    // setDatosUsuarios([{
    //   id: "MM1b7NYQhJ2LzRfVq0A6",
    //   nombre: "Carlitos",
    //   idEmpresa: "3tiJHC2GorYIDvcunlTC",
    //   tipoUsuario: "reponedor",
    //   desEmpresa: "SucumeSac",
    //   estado: true
    // }]);
    // obtenerUsuarios2();
  }
  const ordenarUsuarioDesc =()=>{
    // setDatosUsuarios(
      const dataOrdenado = 
      datosUsuarios.sort((a,b) => {
      return(b.nombre.localeCompare(a.nombre))
    })
    // console.log(dataOrdenado);
    // )
    setDatosUsuarios(dataOrdenado);
    // obtenerUsuarios2();
  }

  const obtenerUsuarios= async()=>{
   // spinner on
    setIsLoading(true);
    const usuarios = await datosUsuario();
    const datosU = [];
    usuarios.forEach((element)=>{
      datosU.push({
        id: element.id,
        nombre: element.nombre,
        idEmpresa: element.idEmpresa,
        tipoUsuario: element.tipoUsuario,
        desEmpresa: element.empresaDesc,
        estado: element.estado
      })
    });
    // console.log(datosU);
    setDatosUsuarios(datosU);
    //poner spinner off
    setIsLoading(false);
    
  };
  

  const obtenerEmpresas =async ()=>{
    const datos=[];
    const empresasT = await datosEmpresa();
    empresasT.forEach((element)=>{
      datos.push({
        id : element.id,
        nombre :element.nombre
      })
    })
    setArrayEmpresas(datos);

  };
  async function obtenerUsuarios2(){
    await obtenerUsuarios();
    await obtenerEmpresas();
    
  };

  // function reloadPage() {
  //   location.reload();
  // }
  const handleInputChange=(e)=>{
    const {name, value} = e.target;
    setDatosUsuarioU({
        ...datosUsuarioU,
        [name]:value,
    });
  };
  const handleEstadoChange=(e)=>{
    const {name,checked} = e.target;
    setDatosUsuarioU({
        ...datosUsuarioU,
        [name]:checked,
    });
  
  };

  async function editarUsuarios(e) {
    e.preventDefault();
    const nombre = e.target.formNombre.value;
    const idEmpresa = e.target.formIdEmpresa.value;
    const tipoUsuario = e.target.formTipoUsuario.value;
    const estado = e.target.formEstado.checked;
    await EditarUsuario(datosUsuarioU.id,
        nombre,
        idEmpresa,
        tipoUsuario,
        estado
    );
    e.target.formNombre.value="";
    e.target.formIdEmpresa.value="";
    e.target.formTipoUsuario.value="";
    reload();
    handleClose();
  }
  
  const exportarXLSX=()=>{
    
    const dataExport =[['Nombre','Empresa','Tipo Usuario','Estado']];
    filteredData.forEach((fila)=>{
      dataExport.push([
        fila.nombre , 
        fila.desEmpresa,
        fila.tipoUsuario,
        fila.estado
      ]);
    });
    
    const workbooke = XLSX.utils.book_new();
    const worksheete = XLSX.utils.aoa_to_sheet(dataExport);
    XLSX.utils.book_append_sheet(workbooke, worksheete, 'Usuarios');
    XLSX.writeFile(workbooke, 'tabla.xlsx');
  
  }

  
  useEffect(()=>{
    obtenerUsuarios2();
  },[]);
  return (
    <>
      <h1>Usuarios</h1>

      <div style={{ margin: 30,  display:divLista ? 'block' : 'none'}}>
        
        <Button
          variant= "outline-success" 
          style={{ float: "right", margin: 30}}
          type='button' 
          onClick={botonAgregar}>Agregar Usuario
        </Button>
          {/* <ExcelBotonUsuario /> */}
          <a className='btn btn-app'>
                  
                  <i className="fas fa-download" onClick={exportarXLSX}/>
                    Exportar Excel
                  </a>
          <BuscarUsuario 
          searchText={searchText} handleSearch={handleSearch} 
          />
          {isLoading ? (
          
          <div style={{padding: "220px", display: "flex", justifyContent:"center"}}>
          <Spinner animation="border" variant="danger" />
          </div>

          
        ) : (
      <TablaUsuarios
        datosU={filteredData}
        reload={obtenerUsuarios2}
        empresasT={arrayEmpresas}
        clickEditar={botonActualizar}
      />
        )}
      </div>

      <div style={{ margin: 30, display:divAgregar ? 'block' : 'none' }}>
        {/* <h3>agregar</h3> */}
        <Button arrayEmpresas={arrayEmpresas}
          style={{ float: "right", margin: 30}}
          variant="outline-danger"
          type='button'
          onClick={botonAtras}>Atras</Button>
          <BotonUsuarios reload={obtenerUsuarios2} empresasT={arrayEmpresas} atras = {botonAtras}/>
      </div>
      <div style={{ margin: 30,  display:divActualizar ? 'block' : 'none'}}>
      <Button
          style={{ float: "right", margin: 30}}
          variant="outline-danger" 
          type='button'
          onClick={botonAtras}>atras</Button>

        
        <div>
        <h1>Actualizar</h1>
          <Form onSubmit={editarUsuarios}>
              <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ingrese un nombre"
                  id="formNombre"
                  name="nombre"
                  value={datosUsuarioU.nombre}
                  onChange={handleInputChange}
                  required
                />
              <Form.Label >Empresa</Form.Label>
                <Form.Control
                  as="select"
                  id="formIdEmpresa"
                  name="idEmpresa"
                  value={datosUsuarioU.idEmpresa}
                  onChange={handleInputChange}
                  
                >
                  <option value="">Seleccione</option>
                {arrayEmpresas.map((element)=>{
                  return(
                    <option key={element.id} value={element.id} >{element.nombre}</option>
                    )
                })}
                </Form.Control> 

                

              <Form.Label>Tipo de Usuario</Form.Label>
              <Form.Control
                as="select" 
                id="formTipoUsuario"
                name="tipoUsuario"
                value={datosUsuarioU?.idTipoUsuario}
                  onChange={handleInputChange}
               >
               <option value="">Seleccione</option>
                {tipoUsuarioU.map((tipo)=>{
                   return(
                    <option 
                      key={tipo.id}  >{tipo.nombre}</option>
                    )
                })}
                </Form.Control>
              
              <Form.Check // prettier-ignore
                    type="switch"
                    id="formEstado"
                    name="estado"
                    label="Estado"
                    //value={checked}
                    //{datosProducto.estado ? checked : ''}
                    checked={datosUsuarioU.estado}
                    // value={datosProducto.estado}
                    onChange={handleEstadoChange}
                />
          <hr/>
          <Button 
            type='submit'
            // reload= {editarUsuarios}
            >Guardar</Button>
          </Form>
        </div>
        {/* <EditUsuario
          usuario={usuarioSelecionado} 
          reload={obtenerUsuarios2} 
          empresasT={arrayEmpresas}
        /> */}
        
          
      </div>

      {/* <ExcelBotonUsuario />
      <BotonUsuarios reload={obtenerUsuarios2} empresasT={arrayEmpresas} />
      <div style={{ margin: 30 }}></div>
      <BuscarUsuario searchText={searchText} handleSearch={handleSearch} />
      <TablaUsuarios
        datosU={filteredData}
        reload={obtenerUsuarios2}
        empresasT={arrayEmpresas}
      /> */}
    </>
  );
}

export default Usuarios;
