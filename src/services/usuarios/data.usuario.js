import app from "@app/Conexion/credenciales"
import { datosEmpresa } from "@app/services/empresas/data.empresa"
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "firebase/firestore"

const baseDEDatos = getFirestore(app)
const coleccion = 'usuarios'


export const datosUsuarioxx = async()=>{
    try {
        const datosE = await getDocs(collection(baseDEDatos, coleccion));
        const datosP = [];
        datosE.forEach(element => {
            datosP.push({
                id: element.id,
                nombre: element.data().nombre,
                idEmpresa: element.data().idEmpresa,
                tipoUsuario: element.data().tipoUsuario,
                estado: element.data().estado 
            })
        })
        return datosP;
    } catch (error) {
        console.log(error);
        return null;
    }

}

export const agregarUsuario = async(vnombre, vidEmpresa, vtipoUsuario)=>{
    try {
        await addDoc(collection(baseDEDatos, coleccion),{
            nombre: vnombre,
            idEmpresa: vidEmpresa,
            tipoUsuario: vtipoUsuario,
            estado: true});

            return 'ok';
    } catch (error) {
        console.log(error); 
        return 'error';
    }
}

export const EditarUsuario = async(id, nombre, idEmpresa, tipoUsuario, estado)=>{
    try {
        const docRef = doc(baseDEDatos, coleccion, id)
        await setDoc(docRef, {
            nombre: nombre,
            idEmpresa: idEmpresa,
            tipoUsuario: tipoUsuario,
            estado: estado
        })
    } catch (error) {
        console.log(error);
    }
}

export const EliminarUsuario = async(id)=>{
    try {
        await deleteDoc(doc(baseDEDatos, coleccion, id))
    } catch (error) {
        console.log(error);
    }
}

export const datosUsuario = async ()=>{
    
    try {
        const querySnapshot = await getDocs(collection(baseDEDatos, "usuarios"));
        
        const empresas = await datosEmpresa();
        const usuariosFinal =[];
        querySnapshot.forEach((element)=>{
          let empDesc='';
          empresas.forEach((emp)=>{
            if(emp.id==element.data().idEmpresa){
                empDesc= emp.nombre;
            } 
          });
        usuariosFinal.push({
                id: element.id,
                nombre: element.data().nombre,
                idEmpresa: element.data().idEmpresa,
                tipoUsuario: element.data().tipoUsuario,
                estado: element.data().estado,
                empresaDesc:  empDesc=='' ? 'sin asignar' : empDesc,
         })
        });
        
    return usuariosFinal
   } catch (error) {
       
        console.log(error)
        return null;
    }
    
  
  
   
}