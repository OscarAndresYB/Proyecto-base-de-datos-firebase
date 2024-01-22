

// ya no se usa este editar porque que esta
//implementado dentro de Usuarios
import app from '@app/Conexion/credenciales';
import { EditarUsuario } from '@app/services/usuarios/data.usuario';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const baseDEDatos = getFirestore(app)
const coleccion = 'tipousuario'

const EditUsuario = ({usuario, reload, empresasT}) => {
    const [show, setShow] = useState(false);
    const handleClose =()=> setShow(false);
    const handleShow =()=> setShow(true);
    // const arrayCategorias = categorias;

    const [tipoUsuarioU, setTipoUsuario] = useState([]);

    useEffect(() => {
      const getTipoUsuario = async () => {
        const tipoUsuarioSnapshot = await getDocs(collection(baseDEDatos, coleccion));
        console.log('getTipoUsuario');
        console.log(tipoUsuarioSnapshot);
        const tipousuarioFormat = []
        tipoUsuarioSnapshot.forEach((row)=>{
          tipousuarioFormat.push({id: row.id, nombre: row.data().nombre})
        });
        // const tipoUsuarioData = tipoUsuarioSnapshot.docs.map((doc) => doc.data());
        setTipoUsuario(tipousuarioFormat);
        // console.log(tipoUsuarioData);
      };
      getTipoUsuario();
      
      
    }, []);

    const[ datosUsuario , setDatosUsuarios] = useState({});

    const handleInputChange=(e)=>{
        const {name, value} = e.target;
        setDatosUsuarios({
            ...datosUsuario,
            [name]:value,
        });
    };
    const handleEstadoChange=(e)=>{
        const {name,checked} = e.target;
        setDatosUsuarios({
            ...datosUsuario,
            [name]:checked,
        })

    }

    async function editarUsuarios(e){
        e.preventDefault();
        const nombre = e.target.formNombre.value;
        const idEmpresa = e.target.formIdEmpresa.value;
        const tipoUsuario = e.target.formTipoUsuario.value;
        const estado = e.target.formEstado.checked;
        
    
        await EditarUsuario(datosUsuario.id,
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
    function clickEditar(){
        setDatosUsuarios({
            id:          usuario.id,
            nombre:      usuario.nombre,
            idEmpresa:   usuario.idEmpresa,
            tipoUsuario: usuario.tipoUsuario,
            estado:      usuario.estado
            
        })
        handleShow();
    }


  return (
    <>
    {/* <Button variant='warning' onClick={clickEditar} ><i className="fas fa-pen" /></Button>
    <Modal show={show} onHide={handleClose} backdrop="static"> */}
        {/* <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header> */}
        <div>
          <Form onSubmit={editarUsuarios}>
              <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ingrese un nombre"
                  id="formNombre"
                  name="nombre"
                  value={datosUsuario.nombre}
                  onChange={handleInputChange}
                  required
                />
              <Form.Label>EmpresaPG</Form.Label>
                <Form.Control
                  as="select"
                  id="formIdEmpresa"
                >
                  <option value="">Seleccione</option>
                {empresasT.map((element)=>{
                  return(
                    <option key={element.id} value={element.id} >{element.nombre}</option>
                    )
                })}
                </Form.Control> 

                

              <Form.Label>Tipo de Usuario</Form.Label>
              <Form.Control
                as="select" 
                id="formTipoUsuario"
               >
               <option value="">Seleccione</option>
                {tipoUsuarioU.map((element)=>{
                   return(
                    <option 
                      key={element.id}
                       value={element.id} >{element.nombre}</option>
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
                    checked={datosUsuario.estado}
                    // value={datosProducto.estado}
                    onChange={handleEstadoChange}
                />
          <hr/>
          <Button type='submit'>Guardar</Button>
          </Form>
        </div>
       
    </>
  )
}

export default EditUsuario
