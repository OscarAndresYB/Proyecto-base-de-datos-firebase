import { Badge, Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import EditUsuario from "@app/pages/usuarios/EditarUsuario";
import DeleteUsuario from "@app/pages/usuarios/EliminarUsuario";



const TablaUsuarios = ({datosU, reload, empresasT,clickEditar})=> {

  return (
    <>
    <Table
      
      striped bordered hover>
      <thead>
        <tr>
          
          <th>Nombre</th>
          <th>ID de Empresa</th>
          <th>Tipo Usuario</th>
          <th>Estado</th>
          <th> </th>
          <th> </th>
          </tr>
      </thead>

            

      {datosU.length === 0 ? (
        <tbody style={{textAlign:"center"}}>
            <tr>
              <td colSpan="6">No hay nada para mostrar</td>
            </tr>
            </tbody>
          ) : (
            <tbody >
        {datosU.map((element)=>{
          return(
            <tr key={element.id}>
            <td>{element.nombre}</td>
            <td>{element.desEmpresa == 'sin asignar'? (<a style={{color:"red"}}>{element.desEmpresa}</a>):(<a style={{color:"green"}}>{element.desEmpresa}</a>) }</td>
            <td>{element.tipoUsuario}</td>
            <td style={{textAlign:"center", paddingRight:"50px"}}>{
              element.estado ? 
                <span className="badge badge-success">Activo</span>
                : 
                <span className="badge badge-danger">No Activo</span> 
                }
            </td>
            <td>
              <Button variant='warning' onClick={()=>clickEditar(element)} ><i className="fas fa-pen" /></Button>
              
            </td>
            <td><DeleteUsuario id={element.id} reload={reload}/></td>
          </tr>
          );
          
        })}
        </tbody>
          )}
        
        
     
    </Table>




    </>
  );
}

export default TablaUsuarios;