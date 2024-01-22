import DeleteTipoUsuario from "@app/pages/tipoUsuario/EliminarTipoUsuario";
import { Button, Table } from "react-bootstrap";



const TablaTipoUsuario = ({datos, reload, clickEditar})=> {

  
    return (
      <>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>Tipo Usuario</th>
            <th>Estado</th>
            <th> </th>
            <th> </th>
            </tr>
        </thead>
  
        <tbody>
         {datos.length === 0 ? (
              <tr>
                <td colSpan="6">No hay nada para mostrar</td>
              </tr>
            ) : (
  datos.map((element)=>{
    return(
      <tr key={element.id}>
            <td>{element.nombre}</td>
            <td style={{textAlign:"center", paddingRight:"10px"}}>{
              element.estado ? 
                <span className="badge badge-success">Activo</span>
                : 
                <span className="badge badge-danger">No Activo</span> 
                }
            </td>
            {/* <td>{element.estado ? 'activo':'inactivo'}</td> */}
            <Button variant='warning' onClick={()=>clickEditar(element)} ><i className="fas fa-pen" /></Button>
            
            <td><DeleteTipoUsuario id={element.id} reload={reload}/></td>
          </tr>
    )
  })
            )}
          
          
        </tbody>
      </Table>
      </>
    );
  }
  
  export default TablaTipoUsuario;