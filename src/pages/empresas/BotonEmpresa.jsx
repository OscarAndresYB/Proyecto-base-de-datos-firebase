import { Form, Button, FormGroup, InputGroup, Modal } from "react-bootstrap";
import React, { useState,useEffect } from 'react'
import { agregarEmpresa } from "@app/services/empresas/data.empresa";
import { toast } from 'react-toastify';


function BotonEmpresa({reload}) {

  const [show, setShow] = useState(false);
    const handleClose =()=> setShow(false);
    const handleShow =()=> setShow(true);

    const agregarEmpresas =async(e)=>{
      e.preventDefault();
      const nombre = e.target.formNombre.value;
      const ruc  = e.target.formRuc.value;
      const direccion  = e.target.formDireccion.value;
      const response = await agregarEmpresa(nombre, ruc, direccion);
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
          {/* <span className='btn btn-app' onClick={handleShow}><i className="fas fa-plus" />Agregar Producto</span> */}
      {/* <Button 
        variant="outline-success" 
        style={{ float: "right", margin: 30}}
        onClick={handleShow}
      >Agregar Empresas</Button> */}

{/* <Modal show={show} onHide={handleClose} backdrop="static"> */}
        {/* <Modal.Header closeButton> */}
        <div>
          <h2>Agregar Empresa</h2>
        {/* </Modal.Header>h3
        <Modal.Body> */}
          <Form 
          onSubmit={agregarEmpresas}
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
                )}
                 */}
                
               </FormGroup>
               


              <Form.Label>ruc</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ingrese un RUC"
                  id="formRuc"
                  required
                />
              <Form.Label>direccion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ingrese una direccion"
                  id="formDireccion"
                  required
                />
              
              
              {/* <Form.Label>Descripcion Larga</Form.Label>
              <Form.Control as="textarea" rows={3} id="formDescripcionLarga" style={{ resize: "none" }} /> */}
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

export default BotonEmpresa;