import app from "@app/Conexion/credenciales"
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "firebase/firestore"

const baseDEDatos = getFirestore(app)
const coleccion = 'tipousuario'


export const datosTipoUsuario = async()=>{
    try {
        const datosTipoUsuario = await getDocs(collection(baseDEDatos, coleccion));
        const datosTipoUsuarioArreglo = [];
        datosTipoUsuario.forEach(element => {
            datosTipoUsuarioArreglo.push({
                id: element.id,
                nombre: element.data().nombre,
                estado: element.data().estado
                
            })
        })
        return datosTipoUsuarioArreglo;
    } catch (error) {
        console.log(error);
        return null;
    }

}

export const agregarTipoUsuario = async(nombre)=>{
    try {
        await addDoc(collection(baseDEDatos, coleccion),{
            nombre: nombre,
            estado: true
        });

            return 'ok';
    } catch (error) {
        console.log(error); 
        return 'error';
    }
}

export const EditarTipoUsuario = async(id, nombre, estado)=>{
    try {
        const docRef = doc(baseDEDatos, coleccion, id)
        await setDoc(docRef, {
            nombre: nombre,
            estado: estado
        })
    } catch (error) {
        console.log(error);
    }
}

export const EliminarTipoUsuario = async(id)=>{
    try {
        await deleteDoc(doc(baseDEDatos, coleccion, id))
    } catch (error) {
        console.log(error);
    }
}

