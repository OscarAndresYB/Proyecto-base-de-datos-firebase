import { Form, Button, FormGroup, InputGroup, Modal } from "react-bootstrap";
import React, { useState,useEffect } from 'react'
import { toast } from 'react-toastify';
import { agregarUsuario } from "@app/services/usuarios/data.usuario";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "@app/Conexion/credenciales";

const baseDEDatos = getFirestore(app)
const coleccion = 'tipousuario'

function BotonUsuarios({reload, empresasT}) {
  const [show, setShow] = useState(false);
    const handleClose =()=> setShow(false);
    const handleShow =()=> setShow(true);

    // const [selectedTipoUsuario, setSelectedTipoUsuario] = useState(null);
    const [tipoUsuarioU, setTipoUsuario] = useState([]);

    useEffect(() => {
      const getTipoUsuario = async () => {
        const tipoUsuarioSnapshot = await getDocs(collection(baseDEDatos, coleccion));
        const tipoUsuarioData = tipoUsuarioSnapshot.docs.map((doc) => doc.data());
        setTipoUsuario(tipoUsuarioData);
        
      };
      getTipoUsuario();
      
      
    }, []);

    

// const tipoUChange = (e) => {
//   setSelectedTipoUsuario(e.target.value);
// };



    
    

    const arrayEmpresas = empresasT

    const agregarUsuarios =async(e)=>{
      e.preventDefault();
      const nombre = e.target.formNombre.value;
      const idEmpresa  = e.target.formIdEmpresa.value;
      const tipoUsuario  = e.target.formTipoUsuario.value;
      const response = await agregarUsuario(nombre, idEmpresa, tipoUsuario);
if (response=='ok') {
  toast.success('Usuario ingresado correctamente!');
  reload();
}else{
  toast.error('Error al ingresar usuario');
}
      handleClose();
    };
  return (
    <>
      
      {/* <Button 
        variant="outline-success" 
        style={{ float: "right", margin: 30}}
        onClick={handleShow}
      >Agregar Usuario</Button> */}
      
      <div>
          <h2>Agregar Usuario</h2>
        
        
          <Form 
          onSubmit={agregarUsuarios}
          >
            
              <FormGroup className="mb-3">
                <Form.Label>nombre</Form.Label>
                <InputGroup>
                <Form.Control
                type='text'
                  placeholder="Ingrese un nombre"
                  aria-label="Ingrese un nombre"
                  aria-describedby="basic-addon2"
                  id="formNombre"
                  // value={idForm}
                  // onChange={(event) => {
                  //   setIdForm(event.target.value);
                  // }}
                  required
                />
                {/* <Button variant="outline-secondary" id="btnValidar" 
                onClick={() => validar(idForm)}
                >
                  Validar Codigo
                </Button> */}
                 
                </InputGroup>
                {/* {idEnable ?  (
                  <p style={{color:"green"}} >El codigo esta disponible <i className="fas fa-check" /></p>
                ) : idEnable == null ? 
                  <p></p>
                :(
                  <p style={{color:"red"}} >El codigo ya existe <i className="fas fa-times" /></p>
                )} */}
                
                
               </FormGroup>
               


              <Form.Label>Empresa</Form.Label>
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
                  as = "select"
                  id="formTipoUsuario"
                  >
                  <option value="">Seleccione</option>
                  {tipoUsuarioU.map((tipo)=>{
                  return(
                    <option key={tipo.id} value={tipo.id} >{tipo.nombre}</option>
                    )
                })}
                </Form.Control>
              
              
              {/* <Form.Label>Descripcion Larga</Form.Label>
              <Form.Control as="textarea" rows={3} id="formDescripcionLarga" style={{ resize: "none" }} /> */}
          <hr/>
          <Button 
            type='submit'
            >Guardar</Button>
          </Form>
        
        {/* <Modal.Footer>
          
        </Modal.Footer> */}
        </div>
    </>
  );
}

export default BotonUsuarios;