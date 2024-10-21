import React, { useState, useEffect } from 'react';
import './CreacionC.css';
import axios from 'axios';

function CreacionC() {
  const [loggedIn, setLoggedIn] = useState(false); // Estado de autenticacion
  const [loadingCreate, setLoadingCreate] = useState(false); // Estado de Loading para creacion
  const [loadingUpdate, setLoadingUpdate] = useState(false); // Estado de Loading para actualizacion
  const [error, setError] = useState(null); // Estado de Errores
  const [success, setSuccess] = useState(false);
  const [selectedConsejoId, setSelectedConsejoId] = useState(null); // Consejo seleccionada para editar
  const [loading, setLoading] = useState(true);
  const [consejos, setConsejos] = useState([]);
  const [consejo, setConsejo] = useState({
    nombre: '',
    descripcion: '',
    creador: 'usuariox',
    contenido: '',
    foto: 'none',
    valoracion: 0,
    consejo: ''
  });

  // useEffect para cargar los consejos al montar el componente
  useEffect(() => {
    setLoading(true);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://iaugmt4hp4.execute-api.sa-east-1.amazonaws.com/stage_1/consejos?consejo=all',
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        setConsejos(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar los consejos:', error);
        setError(error.message);
      })
      .finally(() => {
        // Fake time
        setTimeout(() => {
            setLoading(false);
        }, 1000);
      });
  }, []);

  // Simulación de login
  const handleLogin = () => {
    setLoggedIn(true);
  };

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConsejo({
      ...consejo,
      [name]: value,
    });
  };

  // Manejar subida de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setConsejo({
      ...consejo,
      imagen: file,
    });
  };

  // Manejar envio del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (selectedConsejoId === null) {
      // Crear nuevo Consejo
      setLoadingCreate(true);
      let newConsejo = { ...consejo};
      delete newConsejo.timestamp;
      console.log('Consejo nuevo:', newConsejo);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://iaugmt4hp4.execute-api.sa-east-1.amazonaws.com/stage_1/consejos',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(newConsejo),
      };

      axios
        .request(config)
        .then((response) => {
          console.log('Respuesta de la API:', response.data);
          setSuccess(true);
          // Asegurarnos de que el nuevo consejo se agregue correctamente al listado
          setConsejos([...consejos, { ...response.data, nombre: newConsejo.nombre }]);
        })
        .catch((error) => {
          console.error('Error en la solicitud:', error);
          setError(error.message);
        })
        .finally(() => {
          setLoadingCreate(false);
        });
    } 
    else {
      // Actualizar consejo existente
      let updatedConsejo = { ...consejo};
      delete updatedConsejo.timestamp;
      console.log('Consejo actualizado:', updatedConsejo);
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: 'https://iaugmt4hp4.execute-api.sa-east-1.amazonaws.com/stage_1/consejos',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ body: updatedConsejo }),
      };

      axios
        .request(config)
        .then((response) => {
          console.log('Consejo actualizado:', response.data);
          // Actualizar solo el consejo específico en el estado de consejos
          setConsejos((prevConsejo) =>
            prevConsejo.map((r) =>
              r.ID === selectedConsejoId ? { ...r, ...updatedConsejo } : r
            )
          );
          setSuccess(true);
        })
        .catch((error) => {
          console.error('Error en la actualización:', error);
          setError(error.message);
        })
        .finally(() => {
          setLoadingUpdate(false);
        });
    }

    setConsejo({
      nombre: '',
      descripcion: '',
      creador: 'usuariox',
      contenido: '',
      foto: 'none',
      valoracion: 0,
      consejo: ''
    });

    setSelectedConsejoId(null);
  };

  // Seleccionar consejo para editar
  const handleSelectConsejo = (id) => {
    const selected = consejos.find((r) => r.ID === id); 
    console.log(consejos); 
    if (selected) {
      setConsejo(selected);
      setSelectedConsejoId(id);
      console.log("Consejo seleccionada con ID:", id);
    } 
    else {
      console.error(`No se encontró el consejo con ID: ${id}`);
    }
  };
  
  // Eliminar consejo
  const handleDeleteConsejo = (id) => {
    const consejoSeleccionado = consejos.find((r) => r.ID === id);
    if (!consejoSeleccionado) {
      console.error("No se encontró el consejo con el ID proporcionado.");
      return;
    }
    const nombre = consejoSeleccionado.nombre;

    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el consejo "${nombre}"?`);
    if (!confirmDelete) return;

    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `https://iaugmt4hp4.execute-api.sa-east-1.amazonaws.com/stage_1/consejos/?ID=${id}&name=${encodeURIComponent(nombre)}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios.request(config)
      .then((response) => {
        console.log("Consejo eliminado:", response.data);

        // Elimina la receta del frontend
        setConsejos(consejos.filter((r) => r.ID !== id));

        if (selectedConsejoId === id) {
          setConsejo({
            nombre: '',
            descripcion: '',
            creador: 'usuariox',
            contenido: '',
            foto: 'none',
            valoracion: 0,
            consejo: ''
          });
          setSelectedConsejoId(null);
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el consejo:", error);
      });
  };

  const AgregarConsejoNuevo = (val) => {
    setConsejo({
      nombre: '',
      descripcion: '',
      creador: 'usuariox',
      contenido: '',
      foto: 'none',
      valoracion: 0,
      consejo: ''
    });
    setSelectedConsejoId(val);
  };

  if (loggedIn) {
    return (
      <div className="contenedor-login">
        <div className="login-box">
          <h2>Para acceder a este contenido debes iniciar sesión</h2>
          <button onClick={handleLogin} className="boton-login">Iniciar sesión</button>
          <p>
            <span>¿No tienes cuenta?</span>
            <button onClick={handleLogin} className="boton-login">Regístrate</button>
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div style={{display: "flex", justifyContent: "center", marginTop: "40px"}}><div className="loader"></div></div>;
  }

  return (
    <div className="contenedor-principal" style={{ display: 'flex', padding: '20px' }}>
    {/* Sidebar */}
    <div className="sidebar" style={{ flex: '1', marginRight: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '15px' }}>
      <button className="boton-agregar" onClick={() => AgregarConsejoNuevo(null)} style={{ marginBottom: '10px' }}>
        + Agregar
      </button>
      <div className="lista-recetas" style={{padding: "10px"}}>
        <h3>Listado de consejos</h3>
        <ul style={{ listStyle: 'none', padding: '0' }}>
        {consejos.map((rec, index) => (
          <li key={rec.ID || index} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <div onClick={() => handleSelectConsejo(rec.ID)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              {rec.nombre}
            </div>
            <button className="boton-eliminar" onClick={() => handleDeleteConsejo(rec.ID)} style={{ marginTop: '5px' }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      </div>
    </div>
    {/* Formulario */}
    <div className="formulario-consejo" style={{ flex: '2', border: '1px solid #ccc', padding: '20px', margin: '0' }}>
    <h2>{selectedConsejoId ? 'Editar consejo' : 'Crea un nuevo consejo'}</h2>
    <div>
      {/* Mostrar loading durante el proceso de creación o actualización */}
      {(loadingCreate || loadingUpdate) && <p>{loadingCreate ? 'Creando...' : 'Actualizando...'}</p>}
      {success && <p>Consejo enviado exitosamente.</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
      <form onSubmit={handleSubmit} style={{marginTop: '30px'}}>
        <div className="campo">
          <label htmlFor="nombre">Nombre del consejo:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={consejo.nombre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={consejo.descripcion}
            onChange={handleInputChange}
            rows="2"
            required
          ></textarea>
        </div>
        <div className="campo">
          <label htmlFor="consejo">Contenido:</label>
          <textarea
            id="consejo"
            name="consejo"
            value={consejo.consejo}
            onChange={handleInputChange}
            rows="4"
            required
          ></textarea>
        </div>
        <div className="campo">
          <label htmlFor="imagen">Imagen del consejo:</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="campo">
          <label htmlFor="valoracion">Valoración inicial:</label>
          <input
            type="number"
            id="valoracion"
            name="valoracion"
            value={consejo.valoracion}
            onChange={handleInputChange}
            min="0"
            max="5"
            required
          />
        </div>
        <button type="submit" className="boton-enviar" disabled={loadingCreate || loadingUpdate}>
        {loadingCreate ? 'Creando...' : loadingUpdate ? 'Actualizando...' : 'Guardar Consejo'}
      </button>
      </form>
    </div>
    </div>
  );
}

export default CreacionC;
