import React, { useState, useEffect } from 'react';
import './Favoritos.css'; 

function Favoritos() {
  const [loggedIn, setLoggedIn] = useState(false); // Estado de autenticación
  const [recetaIndex, setRecetaIndex] = useState(0);
  const [recetasFavoritas, setRecetasFavoritas] = useState([]);

  // Simulación de carga de recetas favoritas (esto luego se conectaría a una base de datos)
  useEffect(() => {
    const recetas = [
      { id: 1, titulo: 'Receta Favorita 1', descripcion: 'Descripción de la receta 1', valoracion: 4 },
      { id: 2, titulo: 'Receta Favorita 2', descripcion: 'Descripción de la receta 2', valoracion: 5 },
      { id: 3, titulo: 'Receta Favorita 3', descripcion: 'Descripción de la receta 3', valoracion: 3 },
      { id: 4, titulo: 'Receta Favorita 4', descripcion: 'Descripción de la receta 4', valoracion: 2 },
      { id: 5, titulo: 'Receta Favorita 5', descripcion: 'Descripción de la receta 5', valoracion: 5 },
      { id: 6, titulo: 'Receta Favorita 6', descripcion: 'Descripción de la receta 6', valoracion: 4 },
    ];
    setRecetasFavoritas(recetas);
  }, []);

  // Simulación de login
  const handleLogin = () => {
    setLoggedIn(true);
  };

  // Cambiar índice para mostrar la siguiente tanda de recetas
  const nextRecetas = () => {
    setRecetaIndex((prevIndex) => (prevIndex + 5) % recetasFavoritas.length);
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
      <h2>Recetas Favoritas</h2>
      <div className="favoritos-carrusel">
        {recetasFavoritas.slice(recetaIndex, recetaIndex + 5).map((receta) => (
          <div key={receta.id} className="favorito-item">
            <h3>{receta.titulo}</h3>
            <div className="imagen">[Imagen]</div>
            <div className="receta-valoracion">
              Valoración: {"★".repeat(receta.valoracion)}
            </div>
          </div>
        ))}
      </div>
      <button onClick={nextRecetas} className="boton-siguiente">Siguiente</button>
    </div>
  );
}

export default Favoritos;
