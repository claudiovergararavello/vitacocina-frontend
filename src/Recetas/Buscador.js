import {useEffect, useState} from 'react';
import axios from "axios";
import './Recetas.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Buscador() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [recetas, setRecetas] = useState([]);
  const [recetasFiltradas, setRecetasFiltradas] = useState([]);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [recetaIndex, setRecetaIndex] = useState(0);
  const itemsPerPage = 8;
  const currentPage = Math.floor(recetaIndex / itemsPerPage) + 1;
  const totalPages = Math.ceil(recetasFiltradas.length / itemsPerPage);

  // Llamadas a la API cuando el componente se monta
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Iniciar el loading
        // Llamada a la API para recetas
        const recetaResponse = await axios.get('https://iaugmt4hp4.execute-api.sa-east-1.amazonaws.com/stage_1/recetas?receta=all');
        setRecetas(recetaResponse.data); // Asignar las recetas obtenidas al estado
        setRecetasFiltradas(recetaResponse.data); // Asignar todas las recetas al estado filtrado inicialmente
        setLoading(false); // Terminar el loading
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setLoading(false); // Terminar el loading en caso de error
      }
    };

    fetchData();
  }, []);

  // Filtrar las recetas cuando el valor de "busqueda" cambia
  const handleChange = (e) => {
    setBusqueda(e.target.value);
    const valorBusqueda = e.target.value.toLowerCase();
    const recetasFiltradas = recetas.filter((receta) => 
      receta.nombre.toLowerCase().includes(valorBusqueda)
    );
    setRecetasFiltradas(recetasFiltradas);
  };

  // Funcion para avanzar
  const nextRecetas = () => {
    setRecetaIndex((prevIndex) => {
      const remainingItems = recetasFiltradas.length - (prevIndex + 8);
      if(remainingItems <= 0){
        return recetasFiltradas.length - 8 < 0 ? 0 : recetasFiltradas.length - (recetasFiltradas.length % 8); 
      }
      return prevIndex + 8;
    });
  };

  // Funcion para retroceder
  const backRecetas = () => {
    setRecetaIndex((prevIndex) => {
      if(prevIndex === 0){
        return prevIndex; 
      }
      if(prevIndex - 8 < 0){
        return 0; 
      }
      return prevIndex - 8;
    });
  };

  // Funcion verReceta
  const verReceta = (id) => {
    const data = { 
      id: id 
    };
    navigate("/Receta", { state: data });
  };

  if (loading) {
    return <div style={{display: "flex", justifyContent: "center", marginTop: "40px"}}><div className="loader"></div></div>;
  }

  return (
    <div style={{paddingBottom: '10px'}}>
      <div style={{marginTop: '15px', display: 'flex', justifyContent: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '5px', padding: '5px'}}>
        <input 
          value={busqueda} 
          placeholder="ej: porotos con riendas" 
          className='buscador' 
          onChange={handleChange} 
          style={{ border: 'none', outline: 'none' }} // Para quitar los bordes del input
        />
        <FontAwesomeIcon icon={faSearch} style={{marginLeft: '8px', color: '#999'}} />
      </div>
      </div>
      <div className="consejos-lista" style={{paddingTop: '30px'}}>
        {recetasFiltradas.length > 0 ? (
          recetasFiltradas.slice(recetaIndex, recetaIndex + 8).map((receta) => (
            <div key={receta.ID} className="consejo-item" onClick={() => verReceta(receta.ID)}>
              <div className="consejo-titulo">{receta.nombre}</div>
              <div className="consejo-imagen">[Imagen]</div>
            </div>
          ))
        ) : (
          <p>No se encontraron recetas.</p>
        )}
      </div>
      <div style={{display: 'flex', justifyContent:'space-around', margin: '15px'}}>
        <button onClick={backRecetas} className='boton-siguiente-buscador'><FontAwesomeIcon icon={faArrowLeft}/></button>
        <p>Página {currentPage} de {totalPages}</p>
        <button onClick={nextRecetas} className='boton-siguiente-buscador'><FontAwesomeIcon icon={faArrowRight}/></button>
      </div>
    </div>
  );
}

export default Buscador;
