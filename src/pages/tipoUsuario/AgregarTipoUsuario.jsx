import { Form, Button, FormGroup, InputGroup, Modal } from "react-bootstrap";
import React, { useState,useEffect } from 'react'
import { toast } from 'react-toastify';
import { agregarTipoUsuario } from "@app/services/tipoUsuario/tipoUsuario";


function BotonAgregarTipoUsuario({reload}) {

  const [show, setShow] = useState(false);
    const handleClose =()=> setShow(false);
    const handleShow =()=> setShow(true);

    const agregarTipoU =async(e)=>{
      e.preventDefault();
      const nombre = e.target.formNombre.value;
      const estado  = e.target.formEstado.value;
      const response = await agregarTipoUsuario(nombre, estado);
if (response=='ok') {
  toast.success('Empresa ingresada correctamente!');
  reload();
}else{
  toast.error('Error al ingresar empresa');
}
      handleClose();
    };
  return (
    <>
         
        <div>
          <h2>Agregar Tipo Usuario</h2>
        {/* </Modal.Header>h3
        <Modal.Body> */}
          <Form 
          onSubmit={agregarTipoU}
          >
            
              <FormGroup className="mb-3">
                <Form.Label>Tipo Usuario</Form.Label>
                <InputGroup>
                <Form.Control
                type='text'
                  placeholder="Ingrese su tipo de usuario"
                  aria-label="Ingrese un nombre"
                  aria-describedby="basic-addon2"
                  id="formNombre"
                  // value={idForm}
                  // onChange={(event) => {
                  //   setIdForm(event.target.value);
                  // }}
                  required
                />
                
                 
                </InputGroup>
                
                
               </FormGroup>
               
              <Form.Label>Estado</Form.Label>
                <Form.Check
                  type="switch"
                  id="formEstado"
                  checked={true}
                  required
                />
              
              
        <hr/>
          <Button type='submit'>Guardar</Button>
          </Form>
        {/* </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
    </Modal> */}
    </div>
    </>
  );
}

export default BotonAgregarTipoUsuario;