import app from "@app/Conexion/credenciales"
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "firebase/firestore"

const baseDEDatos = getFirestore(app)
const coleccion = 'empresas'


export const datosEmpresa = async()=>{
    try {
        const datosE = await getDocs(collection(baseDEDatos, coleccion));
        const datosP = [];
        datosE.forEach(element => {
            datosP.push({
                id: element.id,
                nombre: element.data().nombre,
                ruc: element.data().ruc,
                direccion: element.data().direccion,
                estado: element.data().estado 
            })
        })
        return datosP;
    } catch (error) {
        console.log(error);
        return null;
    }

}

export const agregarEmpresa = async(vnombre, vruc, vdireccion)=>{
    try {
        await addDoc(collection(baseDEDatos, coleccion),{
            nombre: vnombre,
            ruc: vruc,
            direccion: vdireccion,
            estado: true});

            return 'ok';
    } catch (error) {
        console.log(error); 
        return 'error';
    }
}

export const EditarEmpresa = async(id, nombre, ruc, direccion, estado)=>{
    try {
        const docRef = doc(baseDEDatos, coleccion, id)
        await setDoc(docRef, {
            nombre: nombre,
            ruc: ruc,
            direccion: direccion,
            estado: estado
        })
    } catch (error) {
        console.log(error);
    }
}

export const EliminarEmpresa = async(id)=>{
    try {
        await deleteDoc(doc(baseDEDatos, coleccion, id))
    } catch (error) {
        console.log(error);
    }
}

// export const getEmpresas = async ()=>{
    
//     try {
//         const categories = await getDocs(collection(baseDEDatos, "empresas"));
    
//         return categories;

//     } catch (error) {
//         console.log(error)
//         return null;
//     }
    
// }