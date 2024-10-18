import React, { useState, useEffect } from 'react';
import './FavoritosC.css'; // Asegúrate de crear y vincular este archivo CSS

function FavoritosC() {
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
