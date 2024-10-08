import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Recetas.css';

function Receta() {
    // Datos
    const location = useLocation();
    const { name, descripcion, id  } = location.state || {}; 
    const [rating, setRating] = useState(0);

    // Valoracion
    const handleClick = (value) => {
        setRating(value);
    };

    // Comentarios
    const [comentario, setComentario] = useState('');
    const [comentarios, setComentarios] = useState([]);

    const handleInputChange = (e) => {
        setComentario(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comentario.trim()) {
            setComentarios([...comentarios, comentario]);
            setComentario('');
        }
    };

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
                    <h1>{name} {id}</h1>
                    <hr />
                    <p>{descripcion}</p>
                    <br />
                    {/* Valoracion */}
                    <div className='contenedor_valoracion'>
                        <span>Evalúa esta Receta:</span>
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
                <h1>¿Comó preparar {name}?</h1>
                <div className="linea"></div>
            </div>
            <div className='contenedor_ip'>
                <div className='clase-preparacion'>
                    <p>Ingredientes</p>
                </div>
                <div className='clase-preparacion'>
                    <p>Preparación</p>
                </div>
            </div>
            {/* Comentarios */}
            <div style={{ marginTop: '30px' }}>
                <div className="contenedor_linea">
                    <div className="linea"></div>
                    <h1>Añade un comentario</h1>
                    <div className="linea"></div>
                </div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '0 auto' }}>
                    <textarea 
                        value={comentario} 
                        onChange={handleInputChange} 
                        placeholder="Escribe tu comentario aquí..." 
                        rows="4" 
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', resize: 'none' }}
                    />
                    <button type="submit" className='boton-comentario' >Enviar</button>
                </form>
                <div style={{ marginTop: '20px' }}>
                    <div className="contenedor_linea">
                        <div className="linea"></div>
                        <h3>Comentarios</h3>
                        <div className="linea"></div>
                    </div>
                    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                        {comentarios.length === 0 ? (
                            <p>No hay comentarios aún.</p>
                        ) : (
                            comentarios.map((com, index) => (
                                <li key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #eee', borderRadius: '5px', background: '#f9f9f9' }}>
                                    {com}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
            {/* Lista de compra */}
            <div style={{display: 'flex', flexDirection: 'row', justifyContent:'center'}}>
            <div style={{alignContent: 'center', margin: '7px'}}>
                <img style={{width: '100%', maxWidth: '35px'}} src="/cesta.png" alt="Compra"/>
            </div>
            <div style={{margin: '7px'}}>
                <p style={{color: 'red'}}><strong>Compra los ingredientes acá</strong></p> 
            </div>
            <div style={{display: 'flex', margin: '7px', alignItems:'center'}}>
                <button type="submit" className='boton-carrito'>Enviar</button>
            </div>
        </div>
        </div>
    );
}

export default Receta;
