import React, { useState, useEffect } from 'react';
import './FavoritosC.css'; // Asegúrate de crear y vincular este archivo CSS

function FavoritosC() {
  const [loggedIn, setLoggedIn] = useState(false); // Estado de autenticación

  // Estado para almacenar los consejos favoritos
  const [favoritos, setFavoritos] = useState([]);

  // Simulación de carga de datos (para luego conectar con una base de datos)
  useEffect(() => {
    // Simulación de los datos de consejos favoritos
    const consejosFavoritos = [
      { id: 1, titulo: 'Consejo Favorito 1', descripcion: 'Descripción del consejo 1', valoracion: 5 },
      { id: 2, titulo: 'Consejo Favorito 2', descripcion: 'Descripción del consejo 2', valoracion: 4 },
    ];

    // Actualizar el estado con los consejos favoritos cargados
    setFavoritos(consejosFavoritos);
  }, []);

  // Simulación de login
  const handleLogin = () => {
    setLoggedIn(true);
  };


  if (!loggedIn) {
    return (
      <div className="contenedor-login">
        <div className="login-box">
          <h2>Para acceder a este contenido debes iniciar sesión</h2>
          <button onClick={handleLogin} className="boton-login">Iniciar sesión</button>
          <p>
            <span>¿No tienes cuenta?</span> {/* El texto que está sobre el botón */}
            <button onClick={handleLogin} className="boton-login">Regístrate</button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="favoritos-container">
      <h2>Consejos Favoritos</h2>
      <div className="favoritos-lista">
        {favoritos.length > 0 ? (
          favoritos.map((consejo) => (
            <div key={consejo.id} className="consejo-item">
              <div className="consejo-titulo">{consejo.titulo}</div>
              <div className="consejo-imagen">[Imagen]</div>
              <div className="consejo-descripcion">{consejo.descripcion}</div>
              <div className="consejo-valoracion">
                Valoración: {"★".repeat(consejo.valoracion)}
              </div>
            </div>
          ))
        ) : (
          <p>No tienes consejos favoritos aún.</p>
        )}
      </div>
    </div>
  );
}

export default FavoritosC;
