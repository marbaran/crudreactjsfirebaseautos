import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getDoc, doc, updateDoc} from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import { dbCollections } from '../firebaseConfig/collections';
import {Link} from 'react-router-dom';
const Editar = () => {

    //1 estado para el form
    const [form, setForm] = useState({
        marca: "",
        modelo:"",
        cotizacion:""
    });

    const navigate = useNavigate();
    const {id} =useParams();

    //2 función para asignar valores al formulario

    const cambio = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    //3 alerta de guardado

   /* const alertaGuardado = ()=>{
        Swal.fire({
        title: 'Registro modificado y guardado',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
        });
    }*/

    //4 declaramos el función update

    const update = async (e)=>{
        e.preventDefault();
        const auto = doc(db, dbCollections.Autos, id);
        const data = {
            marca: form.marca,
            modelo: form.modelo,
            cotizacion: form.cotizacion
        };
        await updateDoc(auto, data);
     //   alertaGuardado();
        navigate("/");
    }

    //5 asincronismo de existencia con la bd

    const getAutoById = async (id) =>{
        const auto = await getDoc(doc(db, dbCollections.Autos, id));
        console.log(auto.data());

        if (auto.exists()){
            setForm({
                marca: auto.data().marca,
                modelo: auto.data().modelo,
                cotizacion: auto.data().cotizacion 
            });
        }
        else{
            console.log("no existe");
        }
    };

    //6 useEffect
    
    useEffect(()=>{
        getAutoById(id);
    }, [id])

    //7 estructura para mostrar

  return (
    <div className='container'>
        <div className='row'>
             <div className='col'>

             <h1 className='mt-3 '>EDITAR LA UNIDAD</h1>

             <form onSubmit={update} className="mt-5">
                <div className='mb-4'>
                    <label className='form-label h3 '>MARCA:</label>
                    <input 
                        name='marca'
                        value={form.marca}
                        type="text"
                        className='form-control w-50 m-auto'
                        onChange={cambio}
                    />
                </div>

                <div className='mb-4'>
                <label className='form-label h3 '>MODELO:</label>
                <input 
                    name="¨modelo"
                    value={form.modelo}
                    type="text"
                    className='form-control w-50 m-auto'
                    onChange={cambio}
                />
                </div>

                <div className='mb-3'>
                <label className='form-label h3 '>COTIZACIÓN:</label>
                <input 
                    name="cotizacion"
                    value={form.cotizacion}
                    type="text"
                    className='form-control w-50 m-auto'
                    onChange={cambio}
                />
                </div>

                <button type="submit" className='btn btn-info btn-lg mt-3'>GUARDAR</button>
                <Link to="/" className="btn btn-warning btn-lg mt-3">REGRESAR</Link>
             
             </form>
             </div>
        </div>
    </div>
  )
}

export default Editar;