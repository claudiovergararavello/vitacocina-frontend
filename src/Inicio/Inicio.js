import React, { useState, useEffect } from 'react';
import './Inicio.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Inicio() {
  const navigate = useNavigate();
  const [recetas, setRecetas] = useState([]);
  const [consejos, setConsejos] = useState([]);
  const [recetaIndex, setRecetaIndex] = useState(0);
  const [consejoIndex, setConsejoIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [error, setError] = useState(null); // Para manejar errores

  // Llamadas a la API cuando el componente se monta
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Iniciar el loading
        // Llamada a la API para recetas
        const recetaResponse = await axios.get('https://iaugmt4hp4.execute-api.sa-east-1.amazonaws.com/stage_1/valoraciones/best');
        setRecetas(recetaResponse.data); // Asignar las recetas obtenidas al estado

        // Llamada a la API para consejos
        const consejoResponse = await axios.get('https://iaugmt4hp4.execute-api.sa-east-1.amazonaws.com/stage_1/consejos?consejo=all');
        setConsejos(consejoResponse.data); // Asignar los consejos obtenidos al estado

        setLoading(false); // Terminar el loading
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setError('Hubo un problema al cargar los datos.');
        setLoading(false); // Terminar el loading en caso de error
      }
    };

    fetchData();
  }, []);

  const nextRecetas = () => {
    setRecetaIndex((prevIndex) => (prevIndex + 4) % recetas.length);
  };

  const nextConsejos = () => {
    setConsejoIndex((prevIndex) => (prevIndex + 4) % consejos.length);
  };
  
  const verReceta = (id) => {
    const data = {  
      id: id 
    };
    navigate("/Receta", { state: data });
  };
  
  const verConsejo = (id) => {
    const data = { 
      id: id 
    };
    navigate("/Consejo", { state: data });
  };
  
   // Mostrar un mensaje de carga o de error si es necesario
   if (loading) {
    return <div style={{display: "flex", justifyContent: "center", marginTop: "40px"}}><div className="loader"></div></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="inicio">
      <h2>Recetas Mejor Valoradas</h2>
      <div className="carrusel">
        <div className="recetas">
          {recetas.slice(recetaIndex, recetaIndex + 4).map((receta) => (
            <div className="item" key={receta.ID} onClick={() => verReceta(receta.ID)}>
              <h3 style={{fontSize: 'large'}}>{receta.receta_name}</h3>
              <div className="imagen">[Imagen]</div>
              <div className="receta-valoracion">
                Valoración: {"★".repeat(receta.mean_score)}
              </div>
            </div>
          ))}
        </div>
        <button onClick={nextRecetas} className='boton-siguiente'>Siguiente</button>
      </div>

      <h2>Últimos Consejos Ingresados</h2>
      <div className="carrusel">
        <div className="consejos">
          {consejos.slice(consejoIndex, consejoIndex + 4).map((consejo) => (
            <div className="item" key={consejo.ID} onClick={() => verConsejo(consejo.ID)}>
              <h3>{consejo.nombre}</h3>
              <div className="imagen">[Imagen]</div>
            </div>
          ))}
        </div>
        <button onClick={nextConsejos} className='boton-siguiente'>Siguiente</button>
      </div>
    </div>
  );
}

export default Inicio;
