import React, { useState } from 'react';
import './Inicio.css';
import { useNavigate } from 'react-router-dom';

const recetas = [
  { id: 1, titulo: 'Título', imagen: '', valoracion: 3  },
  { id: 2, titulo: 'Título', imagen: '', valoracion: 1  },
  { id: 3, titulo: 'Título', imagen: '', valoracion: 5  },
  { id: 4, titulo: 'Título', imagen: '', valoracion: 3  },
  { id: 5, titulo: 'Título', imagen: '', valoracion: 5  },
  { id: 6, titulo: 'Título', imagen: '', valoracion: 2  },
];

const consejos = [
  { id: 1, titulo: 'Consejo', imagen: '', valoracion: 4  },
  { id: 2, titulo: 'Consejo', imagen: '', valoracion: 4  },
  { id: 3, titulo: 'Consejo', imagen: '', valoracion: 3  },
  { id: 4, titulo: 'Consejo', imagen: '', valoracion: 1 },
  { id: 5, titulo: 'Consejo', imagen: '', valoracion: 0  },
  { id: 6, titulo: 'Consejo', imagen: '', valoracion: 5  },
];

function Inicio() {
  const navigate = useNavigate();

  const [recetaIndex, setRecetaIndex] = useState(0);
  const [consejoIndex, setConsejoIndex] = useState(0);

  const nextRecetas = () => {
    setRecetaIndex((prevIndex) => (prevIndex + 4) % recetas.length);
  };

  const nextConsejos = () => {
    setConsejoIndex((prevIndex) => (prevIndex + 4) % consejos.length);
  };
  
  const verReceta = (id) => {
    const data = { 
      name: 'Porotos', 
      descripcion: 'Pelar, Cocer, Aliñar, Comer', 
      id: id 
    };
    navigate("/Receta", { state: data });
  };
  
  
  return (
    <div className="inicio">
      <h2>Recetas Mejor Evaluadas</h2>
      <div className="carrusel">
        <div className="recetas">
          {recetas.slice(recetaIndex, recetaIndex + 4).map((receta) => (
            <div className="item" key={receta.id} onClick={() => verReceta(receta.id)}>
              <h3>{receta.titulo}</h3>
              <div className="imagen">[Imagen]</div>
              <div className="receta-valoracion">
                Valoración: {"★".repeat(receta.valoracion)}
              </div>
            </div>
          ))}
        </div>
        <button onClick={nextRecetas} className='boton-siguiente'>Siguiente</button>
      </div>

      <h2>Consejos Mejor Evaluados</h2>
      <div className="carrusel">
        <div className="consejos">
          {consejos.slice(consejoIndex, consejoIndex + 4).map((consejo) => (
            <div className="item" key={consejo.id}>
              <h3>{consejo.titulo}</h3>
              <div className="imagen">[Imagen]</div>
              <div className="consejo-valoracion">
                Valoración: {"★".repeat(consejo.valoracion)}
              </div>
            </div>
          ))}
        </div>
        <button onClick={nextConsejos} className='boton-siguiente'>Siguiente</button>
      </div>
    </div>
  );
}

export default Inicio;
