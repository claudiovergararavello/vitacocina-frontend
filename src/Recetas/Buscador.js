import {useEffect, useState} from 'react';
import axios from "axios";
import './Recetas.css';
import { useNavigate } from 'react-router-dom';

const recetas = [
  { id: 1, titulo: 'Título 1', imagen: '', valoracion: 'Valoración' },
  { id: 2, titulo: 'Título 2', imagen: '', valoracion: 'Valoración' },
  { id: 3, titulo: 'Título 3', imagen: '', valoracion: 'Valoración' },
  { id: 4, titulo: 'Título 4', imagen: '', valoracion: 'Valoración' },
  { id: 5, titulo: 'Título 5', imagen: '', valoracion: 'Valoración' },
  { id: 6, titulo: 'Título 6', imagen: '', valoracion: 'Valoración' },
  { id: 7, titulo: 'Título 7', imagen: '', valoracion: 'Valoración' },
  { id: 8, titulo: 'Título 8', imagen: '', valoracion: 'Valoración' },
  { id: 9, titulo: 'Título 9', imagen: '', valoracion: 'Valoración' },
  { id: 10, titulo: 'Título 10', imagen: '', valoracion: 'Valoración' },
  { id: 11, titulo: 'Título 11', imagen: '', valoracion: 'Valoración' },
  { id: 12, titulo: 'Título 12', imagen: '', valoracion: 'Valoración' },
  { id: 13, titulo: 'Título 13', imagen: '', valoracion: 'Valoración' },
  { id: 14, titulo: 'Título 14', imagen: '', valoracion: 'Valoración' },
  { id: 15, titulo: 'Título 15', imagen: '', valoracion: 'Valoración' },
  { id: 16, titulo: 'Título 16', imagen: '', valoracion: 'Valoración' },
  { id: 17, titulo: 'Título 17', imagen: '', valoracion: 'Valoración' },
  { id: 18, titulo: 'Título 18', imagen: '', valoracion: 'Valoración' },
  { id: 19, titulo: 'Título 19', imagen: '', valoracion: 'Valoración' },
];
function Buscador() {
  const navigate = useNavigate();
  
  // Paginacion
  const [recetaIndex, setRecetaIndex] = useState(0);
  const itemsPerPage = 8;
  const currentPage = Math.floor(recetaIndex / itemsPerPage) + 1;
  const totalPages = Math.ceil(recetas.length / itemsPerPage);

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

  // Para buscador
  const [usuarios, setUsuarios]= useState([]);
  const [tablaUsuarios, setTablaUsuarios]= useState([]);
  const [busqueda, setBusqueda]= useState("");

  const peticionGet=async()=>{
    await axios.get("https://jsonplaceholder.typicode.com/users")
    .then(response=>{
      setUsuarios(response.data);
      setTablaUsuarios(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const handleChange=e=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

  const filtrar=(terminoBusqueda)=>{
    var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
      if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      || elemento.company.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ){
        return elemento;
      }
      return null;
    });
    setUsuarios(resultadosBusqueda);
  }

  useEffect(()=>{
    peticionGet();
  },[])

  // Funcion verReceta
  const verReceta = (id) => {
    const data = { 
      name: 'Porotos', 
      descripcion: 'Pelar, Cocer, Aliñar, Comer', 
      id: id 
    };
    navigate("/Receta", { state: data });
  };

  return (
    <div style={{paddingBottom: '10px'}}>
      <div>
        <input value={busqueda} placeholder="ej: porotos con riendas" className='buscador' onChange={handleChange}/>
        <button>Buscar</button>
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
        <div style={{display: 'flex', justifyContent:'center', gap: '10px'}}>
          <div>
            <button>Ordenar</button>
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
              <h3>{receta.titulo}</h3>
              <div className="receta-imagen">[Imagen]</div>
              <p>{receta.valoracion}</p>
            </div>
          ))}
        </div>
        <div style={{display: 'flex', justifyContent:'space-around', margin: '15px'}}>
          <button onClick={backRecetas} className='boton-envio'>Anterior</button>
          <p>Página {currentPage} de {totalPages}</p>
          <button onClick={nextRecetas} className='boton-envio'>Siguiente</button>
        </div>
      </div>
     {/*<div>
       <table>
         <thead>
           <tr>
             <th>ID</th>
             <th>Nombre</th>
             <th>Teléfono</th>
             <th>Nombre de Usuario</th>
             <th>Correo</th>
             <th>Sitio Web</th>
             <th>Ciudad</th>
             <th>Empresa</th>
           </tr>
         </thead>

         <tbody>
           {usuarios && 
           usuarios.map((usuario)=>(
             <tr key={usuario.id}>
               <td>{usuario.id}</td>
               <td>{usuario.name}</td>
               <td>{usuario.phone}</td>
               <td>{usuario.username}</td>
               <td>{usuario.email}</td>
               <td>{usuario.website}</td>
               <td>{usuario.address.city}</td>
               <td>{usuario.company.name}</td>
             </tr>
           ))}
         </tbody>

       </table>

     </div>*/}
    </div>
  );
}

export default Buscador;