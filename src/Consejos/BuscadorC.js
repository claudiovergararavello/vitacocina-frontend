import { useState } from 'react';
import './BuscadorC.css';

const consejos = [
  { id: 1, titulo: 'Consejo 1', descripcion: 'Descripción del consejo 1', valoracion: 5 },
  { id: 2, titulo: 'Consejo 2', descripcion: 'Descripción del consejo 2', valoracion: 4 },
  { id: 3, titulo: 'Consejo 3', descripcion: 'Descripción del consejo 3', valoracion: 3 },
  { id: 4, titulo: 'Consejo 4', descripcion: 'Descripción del consejo 4', valoracion: 2 },
  { id: 5, titulo: 'Consejo 5', descripcion: 'Descripción del consejo 5', valoracion: 1 },
  { id: 6, titulo: 'Consejo 6', descripcion: 'Descripción del consejo 6', valoracion: 4 },
  { id: 7, titulo: 'Consejo 7', descripcion: 'Descripción del consejo 7', valoracion: 5 },
  { id: 8, titulo: 'Consejo 8', descripcion: 'Descripción del consejo 8', valoracion: 3 },
];

function BuscadorConsejos() {
  const [busqueda, setBusqueda] = useState("");
  const [valoracion, setValoracion] = useState("");
  const [consejosFiltrados, setConsejosFiltrados] = useState(consejos);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value, valoracion);
  };

  const handleValoracionChange = (e) => {
    setValoracion(e.target.value);
    filtrar(busqueda, e.target.value);
  };

  const filtrar = (busqueda, valoracion) => {
    const resultados = consejos.filter((consejo) => {
      const matchBusqueda = consejo.titulo.toLowerCase().includes(busqueda.toLowerCase());
      const matchValoracion = valoracion ? consejo.valoracion === parseInt(valoracion) : true;
      return matchBusqueda && matchValoracion;
    });
    setConsejosFiltrados(resultados);
  };

  return (
    <div className="buscador-consejos-container">
      <div className="buscador-consejos-barra">
        <input
          value={busqueda}
          placeholder="ej: Consejo saludable"
          className="buscador-consejos-input"
          onChange={handleChange}
        />
        <button className="button-envio">Buscar</button>
      </div>
      <div className="buscador-consejos-filtro">
        <label htmlFor="valoracion">Filtrar por valoración: </label>
        <select
          id="valoracion"
          className="buscador-consejos-select"
          value={valoracion}
          onChange={handleValoracionChange}
        >
          <option value="">Todas</option>
          <option value="5">★★★★★</option>
          <option value="4">★★★★</option>
          <option value="3">★★★</option>
          <option value="2">★★</option>
          <option value="1">★</option>
        </select>
      </div>

      <div className="consejos-lista">
        {consejosFiltrados.length > 0 ? (
          consejosFiltrados.map((consejo) => (
            <div key={consejo.id} className="consejo-item">
              <div className="consejo-titulo">{consejo.titulo}</div>
              <div className="consejo-imagen">[Imagen]</div>
              <div className="consejo-valoracion">
                Valoración: {"★".repeat(consejo.valoracion)}
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron consejos.</p>
        )}
      </div>
    </div>
  );
}

export default BuscadorConsejos;
