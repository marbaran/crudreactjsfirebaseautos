import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {collection, addDoc} from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import {async} from '@firebase/util';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';


const Crearauto = () => {
      //1 declar los hooks

      const [marca, setMarca] = useState("");
      const [modelo, setModelo] = useState("");
      const [cotizacion, setCotizacion] = useState();
      const navigate = useNavigate();
  
      //2 referenciamos la bd
  
      const autosCollection = collection(db, "auto");
  
      //3 alerta de creacion
  
  
      //4 declaración de la función de creación
  
      const nuevo = async (e)=>{
          e.preventDefault();
          await addDoc(autosCollection, {marca: marca, modelo: modelo, cotizacion: cotizacion});
         
          navigate("/");
      }
  
      //5 mostrar al auto el form
   
    return (
      <div className='container bg-info'>
          <div className='row'>
               <div className='col '>
  
               <h1 className='mt-3 '>CREAR NUEVA UNIDAD</h1>
  
               <form onSubmit={nuevo} className='mt-5 '>
                  <div className='mb-4'>
                      <label className='form-label h3 '>MARCA:</label>
                      <input 
                          value={marca}
                          type="text"
                          className='form-control w-50 m-auto'
                          onChange={(e)=>setMarca(e.target.value)}
                      />
                  </div>
  
                  <div className='mb-4'>
                  <label className='form-label h3 '>MODELO:</label>
                  <input 
                      value={modelo}
                      type="text"
                      className='form-control w-50 m-auto'
                      onChange={(e)=>setModelo(e.target.value)}
                  />
                  </div>
  
                  <div className='mb-4'>
                  <label className='form-label h3 '>COTIZACIÓN:</label>
                  <input 
                      value={cotizacion}
                      type="text"
                      className='form-control w-50 m-auto'
                      onChange={(e)=>setCotizacion(e.target.value)}
                  />
                  </div>
  
                  <button type="submit" className='btn btn-success btn-lg mt-3'>AGREGAR</button>
                  <Link to="/" className="btn btn-warning btn-lg mt-3">REGRESAR</Link>
               </form>
               </div>
          </div>
      </div>
    )
  }
  
  export default Crearauto;
  