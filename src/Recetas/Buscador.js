import {useEffect, useState} from 'react';
import axios from "axios";
import './Recetas.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Buscador() {
  const navigate = useNavigate();
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [error, setError] = useState(null); // Para manejar errores
  const [tablaRecetas, SetTablaRecetas]= useState([]);
  const [busqueda, setBusqueda]= useState("");
  // Paginacion
  const [recetaIndex, setRecetaIndex] = useState(0);
  const itemsPerPage = 8;
  const currentPage = Math.floor(recetaIndex / itemsPerPage) + 1;
  const totalPages = Math.ceil(recetas.length / itemsPerPage);

  // Llamadas a la API cuando el componente se monta
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Iniciar el loading
        // Llamada a la API para recetas
        const recetaResponse = await axios.get('https://iaugmt4hp4.execute-api.sa-east-1.amazonaws.com/stage_1/recetas?receta=all');
        setRecetas(recetaResponse.data); // Asignar las recetas obtenidas al estado

        setLoading(false); // Terminar el loading
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setError('Hubo un problema al cargar los datos.');
        setLoading(false); // Terminar el loading en caso de error
      }
    };

    fetchData();
  }, []);

  // Funcion para avanzar
  const nextRecetas = () => {
    setRecetaIndex((prevIndex) => {
      const remainingItems = recetas.length - (prevIndex + 8);
      if(remainingItems <= 0){
        return recetas.length - 8 < 0 ? 0 : recetas.length - (recetas.length % 8); 
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

  const handleChange=e=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

  const filtrar=(terminoBusqueda)=>{
    var resultadosBusqueda=tablaRecetas.filter((elemento)=>{
      if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      || elemento.company.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ){
        return elemento;
      }
      return null;
    });
    setRecetas(resultadosBusqueda);
  }

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
        <div style={{display: 'flex', alignItems: 'center'}}>
          <input value={busqueda} placeholder="ej: porotos con riendas" className='buscador' onChange={handleChange}/>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <button className='button-envio'>Buscar</button>
        </div>
      </div>
      <div style={{marginTop: '20px'}}>
        <div className='contenedor-filtros'>
          <div>
            <button className='button-filtrar'>Filtrar</button>
          </div>
          <div>
            <select className="select-filtrar" name="selectedDieta">
              <option value="vegana">Vegana</option>
              <option value="vegetariana">Vegetariana</option>
              <option value="mediterranea">Mediterránea</option>
              <option value="proteina">Proteína</option>
              <option value="carbohidratos">Carbohidratos</option>
            </select>
          </div>
          <div>
            <select className="select-filtrar"  name="selectedTiempo">
              <option value="">Menor a 1 hora</option>
              <option value="">Entre 1 hora y 3 horas</option>
              <option value="">Más de 3 horas</option>
            </select>
          </div>
          <div>
            <select className="select-filtrar"  name="selectedHabilidad">
              <option value="principiante">Principiante</option>
              <option value="normal">Normal</option>
              <option value="avanzado">Avanzado</option>
              <option value="chef">Chef</option>
            </select>
          </div>
        </div>
        <div style={{display: 'flex', justifyContent:'center', gap: '10px', marginTop: '15px'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <button className='button-envio'>Ordenar</button>
          </div>
          <div>
            <select className="select-filtrar" name="selectOrden">
              <option value="atoz">A-Z</option>
              <option value="valoracion">Valoración</option>
              <option value="comentario">Comentarios</option>
            </select>
          </div>
        </div>
      </div>
      <div className="carrusel-container">
        <div className="recetas-carrusel">
          {recetas.slice(recetaIndex, recetaIndex + 8).map((receta) => (
            <div className="receta-item" key={receta.id} onClick={() => verReceta(receta.id)}>
              <h3>{receta.nombre}</h3>
              <div className="receta-imagen">[Imagen]</div>
              <div className="receta-valoracion">
                Valoración: {"★".repeat(receta.valoracion)}
              </div>
            </div>
          ))}
        </div>
        <div style={{display: 'flex', justifyContent:'space-around', margin: '15px'}}>
          <button onClick={backRecetas} className='boton-siguiente-buscador'><FontAwesomeIcon icon={faArrowLeft}/></button>
          <p>Página {currentPage} de {totalPages}</p>
          <button onClick={nextRecetas} className='boton-siguiente-buscador'><FontAwesomeIcon icon={faArrowRight}/></button>
        </div>
      </div>
    </div>
  );
}

export default Buscador;