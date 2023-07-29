import React, {useState, useEffect} from 'react';
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import {async} from '@firebase/util';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


// or less ideally


const Mostrar = () => {

    //1 configuración de los hook de mostrar
    const [autos, setAutos] = useState([]);

    //2 referenciar la db de firebase
    const autosCollection = collection(db, "auto");

    //3 creamos la funcionabilidad para mostrar los documentos con asincronismo

    const getAutos = async ()=> { 
        const data = await getDocs(autosCollection); 
        console.log(data.docs);
 
        setAutos(
           data.docs.map((doc)=>({...doc.data(), id:doc.id}))
        ); 
       
    }
    useEffect(()=>{
        getAutos();
        
    }, [])
 
    console.log(autos);

   //4 declaración función delete para eliminar registros
   
   const deleteAuto = async (id)=>{
       const autoDoc = doc(db, "auto", id);
       await deleteDoc(autoDoc);
       getAutos();
   }
    //5 configuración sweetalert


return(
    <div className='container'>
    <div className='row'>
        <div className='col'>
            <div className='d-grid gap-2'>
                <Link to="/crearauto" className='btn btn-success btn-lg mt-3 mb-4 w-25' >AGREGAR NUEVA UNIDAD<i className="fa-solid fa-plus"></i></Link>
            </div>
            <table className='table table-success table-striped'>
                <thead>
                    <tr>
                        <th>MARCA</th>
                        <th>MODELO</th>
                        <th>COTIZACIÓN</th>
                        <th>INVENTARIO</th>
                        <th>MODIFICACIONES</th>
                    </tr>
                </thead>
                <tbody>
                    { autos.map((car)=>(
                        <tr key={car.id}>
                            <td key={car.marca} >{car.marca || ''}</td>
                            <td key={car.modelo} >{car.modelo || ''}</td>
                            <td key={car.cotizacion} >{car.cotizacion || ''} </td>
                            <td key={car.inventario} >{car.inventario || ''} </td>
                            <td>
                            <Link to={`/editarauto/${car.id}`} className="material-icons">edit</Link>
                            <button onClick={()=>{deleteAuto(car.id)}} className="material-icons">delete</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    </div>
</div>
)


}

export default Mostrar;