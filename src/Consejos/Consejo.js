import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Consejos.css';
import axios from 'axios';

function Consejo() {
    // Datos
    const location = useLocation();
    const { name, descripcion, id  } = location.state || {}; 
    const [rating, setRating] = useState(0);
    const [consejo, setConsejo] = useState({
        nombre: '',
        descripcion: '',
        creador: 'usuariox',
        contenido: '',
        foto: 'none',
        valoracion: 0,
        consejo: ''
      });
    // Valoracion
    const handleClick = (value) => {
        setRating(value);
    };

    const [loading, setLoading] = useState(true); // Estado para controlar el loading    
    // useEffect para hacer la llamada a la API cuando el componente se monta
    useEffect(() => {
        console.log("Recibido ID:", id);  // Verificar si el ID está llegando correctamente
        if (id !== undefined && id >= 0) {
            setLoading(true); // Inicia el loading
            // Configuración de la solicitud
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://iaugmt4hp4.execute-api.sa-east-1.amazonaws.com/stage_1/consejos?consejo='+id,
                headers: {}
            };

            // Hacer la solicitud
            axios.request(config)
            .then((response) => {
                // Actualizar el estado con los datos recibidos de la API
                setConsejo(response.data);
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
        }
    }, [id]);

    // Si el contenido aún está cargando, muestra el mensaje de loading
    if (loading) {
        return <div style={{display: "flex", justifyContent: "center", marginTop: "40px"}}><div className="loader"></div></div>;
    }
    

    return (
        <div className='contenedor_receta'>
            <div className='contenedor_principal'>
                <div className='contenedor_img'>
                    <img 
                        src="/logo512.png" 
                        alt="Logo" 
                        style={{ 
                            width: '100%', 
                            maxWidth: '300px', 
                            height: 'auto' 
                        }} 
                    />
                </div>
                {/* Informacion */}
                <div className='contenedor_informacion'>
                    <h1>{consejo.nombre}</h1>
                    <hr />
                    <p>{consejo.descripcion}</p>
                    <br />
                    {/* Valoracion */}
                    <div className='contenedor_valoracion'>
                        <span>Evalúa este Consejo:</span>
                        <ul style={{ listStyle: 'none', display: 'flex', padding: '0px'}}>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <li key={value} style={{ marginRight: '5px', cursor: 'pointer' }}>
                                    <i
                                        className={`fa fa-star fa-lg ${value <= rating ? 'checked' : ''}`}
                                        aria-hidden="true"
                                        onClick={() => handleClick(value)}
                                        style={{ color: value <= rating ? '#ffc107' : '#e4e5e9' }}
                                    ></i>
                                </li>
                            ))}
                        </ul>
                        <p>Calificación: {rating} estrella(s)</p>
                    </div>
                    {/* Redes Sociales */}
                    <div className='contenedor_redes_sociales'>
                        <ul className='redes_sociales'>
                            <li>
                                <a href="https://www.instagram.com/">
                                    <img style={{ width: '30px', height: '30px' }} src="/ig.png" alt="Instagram" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/">
                                    <img style={{ width: '30px', height: '30px' }} src="/yt.png" alt="Youtube" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/">
                                    <img style={{ width: '30px', height: '30px' }} src="/fb.png" alt="Facebook" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <Outlet />
            </div>
            {/* Ingredientes/Preparacion */}
            <div className="contenedor_linea">
                <div className="linea"></div>
                <h1>Descripción {name}</h1>
                <div className="linea"></div>
            </div>
            <div className='contenedor_ip'>
                <div className='clase-preparacion'>
                    <p>Pasos</p>
                    {consejo.consejo}
                </div>
                {/*<div className='clase-preparacion'>
                    <p>Comentarios</p>
                </div>*/}
            </div>
        </div>
    );
}

export default Consejo;
