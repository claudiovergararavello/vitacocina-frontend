import React, { useState } from 'react';
import './CreacionC.css';

function CreacionC() {
  const [loggedIn, setLoggedIn] = useState(false); // Simulando estado de sesión
  const [consejo, setConsejo] = useState({
    titulo: '',
    contenido: '',
    imagen: null,
    valoracion: 0, // Campo de valoración que luego se conectará a una BD
  });

  // Simulación de login
  const handleLogin = () => {
    setLoggedIn(true);
  };

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConsejo({
      ...consejo,
      [name]: value,
    });
  };

  // Manejar subida de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setConsejo({
      ...consejo,
      imagen: file,
    });
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Consejo enviado:', consejo);
    // Aquí enviarías el consejo a la base de datos
    // Redireccionar a otra página o mostrar un mensaje de éxito
  };

  if (!loggedIn) {
    return (
      <div className="contenedor-login">
        <div className="login-box">
          <h2>Para acceder a este contenido debes iniciar sesión</h2>
          <button onClick={handleLogin} className="boton-login">Iniciar sesión</button>
          <p>
            <span>¿No tienes cuenta?</span>
            <button onClick={handleLogin} className="boton-login">Regístrate</button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="formulario-consejo">
      <h2>Crea un nuevo consejo</h2>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="titulo">Título del consejo:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={consejo.titulo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="contenido">Contenido:</label>
          <textarea
            id="contenido"
            name="contenido"
            value={consejo.contenido}
            onChange={handleInputChange}
            rows="4"
            required
          ></textarea>
        </div>
        <div className="campo">
          <label htmlFor="imagen">Imagen del consejo:</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="campo">
          <label htmlFor="valoracion">Valoración inicial:</label>
          <input
            type="number"
            id="valoracion"
            name="valoracion"
            value={consejo.valoracion}
            onChange={handleInputChange}
            min="0"
            max="5"
            required
          />
        </div>
        <button type="submit" className="boton-enviar">Crear Consejo</button>
      </form>
    </div>
  );
}

export default CreacionC;
