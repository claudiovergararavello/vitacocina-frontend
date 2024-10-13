import React, { useState, useEffect } from 'react';
import './FavoritosC.css'; // Asegúrate de crear y vincular este archivo CSS

function FavoritosC() {
  // Estado para almacenar los consejos favoritos
  const [favoritos, setFavoritos] = useState([]);

  // Simulación de carga de datos (para luego conectar con una base de datos)
  useEffect(() => {
    // Simulación de los datos de consejos favoritos
    const consejosFavoritos = [
      { id: 1, titulo: 'Consejo Favorito 1', descripcion: 'Descripción del consejo 1', imagen: '' },
      { id: 2, titulo: 'Consejo Favorito 2', descripcion: 'Descripción del consejo 2', imagen: '' },
    ];

    // Actualizar el estado con los consejos favoritos cargados
    setFavoritos(consejosFavoritos);
  }, []);

  return (
    <div className="favoritos-container">
      <h2>Consejos Favoritos</h2>
      <div className="favoritos-carrusel">
        {favoritos.length > 0 ? (
          favoritos.map((consejo) => (
            <div key={consejo.id} className="favorito-item">
              <h3>{consejo.titulo}</h3>
              <div className="imagen">[Imagen]</div>
              <p>{consejo.descripcion}</p>
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
