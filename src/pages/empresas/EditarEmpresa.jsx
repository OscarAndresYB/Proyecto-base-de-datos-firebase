import { EditarEmpresa } from '@app/services/empresas/data.empresa';
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const EditEmpresa = ({empresa, reload}) => {
    const [show, setShow] = useState(false);
    const handleClose =()=> setShow(false);
    const handleShow =()=> setShow(true);
    // const arrayCategorias = categorias;

    const[ datosEmpresa , setDatosEmpresas] = useState({});

    const handleInputChange=(e)=>{
        const {name, value} = e.target;
        setDatosEmpresas({
            ...datosEmpresa,
            [name]:value,
        });
    };
    const handleEstadoChange=(e)=>{
        const {name,checked} = e.target;
        setDatosEmpresas({
            ...datosEmpresa,
            [name]:checked,
        })

    }

    async function editarEmpresas(e){
        e.preventDefault();
        const nombre = e.target.formNombre.value;
        const ruc = e.target.formRuc.value;
        const direccion = e.target.formDireccion.value;
        const estado = e.target.formEstado.checked;
        
    
        await EditarEmpresa(datosEmpresa.id,
            nombre,
            ruc,
            direccion,
            estado
        );
        

    
        e.target.formNombre.value="";
        e.target.formRuc.value="";
        e.target.formDireccion.value="";
        
    
        reload();
        handleClose();
    
    }
    function clickEditar(){
        setDatosEmpresas({
            id:         empresa.id,
            nombre:     empresa.nombre,
            ruc:        empresa.ruc,
            direccion:  empresa.direccion,
            estado:     empresa.estado
            
        })
        handleShow();
    }


  return (
    <>
    
        
        <div>
          <Form onSubmit={editarEmpresas}>
              <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ingrese un nombre"
                  id="formNombre"
                  name="nombre"
                  value={datosEmpresa.nombre}
                  onChange={handleInputChange}
                  required
                />
              <Form.Label>RUC</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ingrese un RUC"
                  id="formRuc"
                  name="ruc"
                  value={datosEmpresa.ruc}
                  onChange={handleInputChange}
                  required
                />

              <Form.Label>Direccion</Form.Label>
              <Form.Control
                type="text"
                placeholder="ingrese su direccion"
                id="formDireccion"
                name="direccion"
                value={datosEmpresa.direccion}
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
                    checked={datosEmpresa.estado}
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

export default EditEmpresa
