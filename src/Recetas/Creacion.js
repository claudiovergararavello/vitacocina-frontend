import React, { useState, useEffect } from 'react';
import './Creacion.css';
import axios from 'axios';

function Creacion() {
  const [loggedIn, setLoggedIn] = useState(false); // Estado de autenticacion
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loadingCreate, setLoadingCreate] = useState(false); // Estado de Loading para creacion
  const [loadingUpdate, setLoadingUpdate] = useState(false); // Estado de Loading para actualizacion
  const [error, setError] = useState(null); // Estado de Errores
  const [success, setSuccess] = useState(false); // Estado respuesta API
  const [recetas, setRecetas] = useState([]); // Almacenar Recetas
  const [selectedRecetaId, setSelectedRecetaId] = useState(null); // Receta seleccionada para editar
  const [loading, setLoading] = useState(true); // Estado para controlar el loading 
  const [receta, setReceta] = useState({
    nombre: '',
    descripcion: '',
    ingredientes: [],
    preparacion: '',
    categoria: '',
    duracion: '',
    nivel: '',
    foto: 'none',
    creador: 'usuariox',
    ID: ''
  });

  // useEffect para cargar las recetas al montar el componente
  useEffect(() => {
    setLoading(true);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://iaugmt4hp4.execute-api.sa-east-1.amazonaws.com/stage_1/recetas?receta=all',
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        setRecetas(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar las recetas:', error);
        setError(error.message);
      })
      .finally(() => {
        // Fake time
        setTimeout(() => {
            setLoading(false);
        }, 1000);
      });
  }, []);

  // Simulacion de login
  const handleLogin = () => {
    setLoggedIn(true);
  };

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReceta({
      ...receta,
      [name]: value,
    });
  };

  // Manejar subida de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setReceta({
      ...receta,
      imagen: file,
    });
  };

  // Manejar envio del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (selectedRecetaId === null) {
      // Crear nueva receta
      setLoadingCreate(true);
      let newReceta = { ...receta};
      delete newReceta.timestamp;
      console.log('Receta nueva:', newReceta);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://iaugmt4hp4.execute-api.sa-east-1.amazonaws.com/stage_1/recetas',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(newReceta),
      };

      axios
        .request(config)
        .then((response) => {
          console.log('Respuesta de la API:', response.data);
          setSuccess(true);
          // Asegurarnos de que la nueva receta se agregue correctamente al listado
          setRecetas([...recetas, { ...response.data, nombre: newReceta.nombre }]);
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
      // Actualizar receta existente
      let updatedReceta = { ...receta};
      delete updatedReceta.timestamp;
      console.log('Receta nueva:', updatedReceta);
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: 'https://iaugmt4hp4.execute-api.sa-east-1.amazonaws.com/stage_1/recetas',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ body: updatedReceta }),
      };

      axios
        .request(config)
        .then((response) => {
          console.log('Receta actualizada:', response.data);
          // Actualizar solo la receta específica en el estado de recetas
          setRecetas((prevRecetas) =>
            prevRecetas.map((r) =>
              r.ID === selectedRecetaId ? { ...r, ...updatedReceta } : r
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

    setReceta({
      nombre: '',
      descripcion: '',
      ingredientes: [],
      preparacion: '',
      categoria: '',
      duracion: '',
      nivel: '',
      foto: null,
      creador: 'usuariox',
      ID: ''
    });

    setSelectedRecetaId(null);
  };

  
  // Manejar el campo de ingredientes
  const handleInputChangeIngredientes = (e) => {
    setInputValue(e.target.value);
  };

  // Agregar ingrediente
  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      const updatedItems = [...selectedItems, inputValue];
      setSelectedItems(updatedItems);
      setInputValue('');

      setReceta((prevReceta) => ({
        ...prevReceta,
        ingredientes: updatedItems,
      }));
    }
  };

  // Remover ingrediente
  const handleRemoveItem = (index) => {
    const updatedItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(updatedItems);

    setReceta((prevReceta) => ({
      ...prevReceta,
      ingredientes: updatedItems,
    }));
  };

  // Maneja el evento de presionar la tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  // Seleccionar receta para editar
  const handleSelectReceta = (id) => {
    const selected = recetas.find((r) => r.ID === id); 
    console.log(recetas); 
    if (selected) {
      setReceta(selected);
      setSelectedRecetaId(id);
      setSelectedItems(selected.ingredientes); // Asegúrate de que `receta` sea válido
      console.log("Receta seleccionada con ID:", id);
    } 
    else {
      console.error(`No se encontró la receta con ID: ${id}`);
    }
  };

  // Eliminar receta
  const handleDeleteReceta = (id) => {
    const recetaSeleccionada = recetas.find((r) => r.ID === id);
    if (!recetaSeleccionada) {
      console.error("No se encontró la receta con el ID proporcionado.");
      return;
    }
    const nombre = recetaSeleccionada.nombre;

    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar la receta "${nombre}"?`);
    if (!confirmDelete) return;

    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `https://iaugmt4hp4.execute-api.sa-east-1.amazonaws.com/stage_1/recetas/?ID=${id}&name=${encodeURIComponent(nombre)}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios.request(config)
      .then((response) => {
        console.log("Receta eliminada:", response.data);

        // Elimina la receta del frontend
        setRecetas(recetas.filter((r) => r.ID !== id));

        if (selectedRecetaId === id) {
          setReceta({
            nombre: '',
            descripcion: '',
            ingredientes: [],
            preparacion: '',
            categoria: '',
            duracion: '',
            nivel: '',
            foto: null,
            creador: 'usuariox',
            ID: ''
          });
          setSelectedRecetaId(null);
        }
      })
      .catch((error) => {
        console.error("Error al eliminar la receta:", error);
      });
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
  const AgregarRecetaNueva = (val) => {
    setReceta({
      nombre: '',
      descripcion: '',
      ingredientes: [],
      preparacion: '',
      categoria: '',
      duracion: '',
      nivel: '',
      foto: null,
      creador: 'usuariox',
      ID: ''
    });
    setSelectedItems([]);
    setSelectedRecetaId(val);
  };
  
  if (loading) {
    return <div style={{display: "flex", justifyContent: "center", marginTop: "40px"}}><div className="loader"></div></div>;
  }

  return (
    <div className="contenedor-principal">
      {/* Sidebar */}
      <div className="sidebar">
        <button className="boton-agregar" onClick={() => AgregarRecetaNueva(null)} style={{ marginBottom: '10px' }}>
          + Agregar
        </button>
        <div className="lista-recetas" style={{padding: "10px"}}>
          <h3>Listado de recetas</h3>
          <ul style={{ listStyle: 'none', padding: '0' }}>
          {recetas.map((rec, index) => (
            <li key={rec.ID || index} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <div onClick={() => handleSelectReceta(rec.ID)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                {rec.nombre}
              </div>
              <button className="boton-eliminar" onClick={() => handleDeleteReceta(rec.ID)} style={{ marginTop: '5px' }}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
        </div>
      </div>

      {/* Formulario */}
      <div className="formulario-receta" style={{ flex: '2', border: '1px solid #ccc', padding: '20px', margin: '0' }}>
        <h2>{selectedRecetaId ? 'Editar receta' : 'Crea una nueva receta'}</h2>
        <div>
          {/* Mostrar loading durante el proceso de creación o actualización */}
          {(loadingCreate || loadingUpdate) && <p>{loadingCreate ? 'Creando...' : 'Actualizando...'}</p>}
          {success && <p>Receta enviada exitosamente.</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
        <form onSubmit={handleSubmit} style={{marginTop: '30px'}}>
        <div className="campo">
          <label htmlFor="nombre">Nombre de la receta:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Ingrese el nombre de la receta"
            value={receta.nombre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={receta.descripcion}
            placeholder="Ingrese una descripión de la receta"
            onChange={handleInputChange}
            rows="3"
            required
          ></textarea>
        </div>
        <div className="campo">
          <label htmlFor="ingredientes">Ingredientes:</label>
          <input
            id="ingredientes"
            name="ingredientes"
            type="text"
            value={inputValue}
            onChange={handleInputChangeIngredientes}
            onKeyDown={handleKeyPress}
            placeholder="Añada ingredientes y presione Enter"
          />
          <button className="boton-agregar" type="button" onClick={handleAddItem}>Agregar</button>

          <div style={{ marginTop: '20px' }}>
            {selectedItems.length > 0 && (
              <ul>
                {selectedItems.map((item, index) => (
                  <li key={index} style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <div>
                      <p>{index}.- {item}</p>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                      <button className="boton-eliminar" type="button" onClick={() => handleRemoveItem(index)}>Eliminar</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="campo">
          <label htmlFor="preparacion">Preparación:</label>
          <textarea
            id="preparacion"
            name="preparacion"
            value={receta.preparacion}
            placeholder="Describa la receta"
            onChange={handleInputChange}
            rows="5"
            required
          ></textarea>
        </div>
        <div className="campo">
          <label htmlFor="categoria">Tipo de receta:</label>
          <select
            id="categoria"
            name="categoria"
            value={receta.categoria}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecciona un tipo</option>
            <option value="Vegana">Vegana</option>
            <option value="Vegetariana">Vegetariana</option>
            <option value="Mediterránea">Mediterránea</option>
            <option value="Proteína">Proteína</option>
            <option value="Carbohidratos">Carbohidratos</option>
          </select>
        </div>
        <div className="campo">
          <label htmlFor="duracion">Tiempo de duración:</label>
          <select
            id="duracion"
            name="duracion"
            value={receta.duracion}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecciona una duración</option>
            <option value="Principiante">Menor a 1 hora</option>
            <option value="Normal">Entre 1 hora y 3 horas</option>
            <option value="Avanzado">Mayor a 3 horas</option>
          </select>
        </div>
        <div className="campo">
          <label htmlFor="nivel">Nivel de dificultad:</label>
          <select
            id="nivel"
            name="nivel"
            value={receta.nivel}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecciona un nivel</option>
            <option value="Principiante">Principiante</option>
            <option value="Normal">Normal</option>
            <option value="Avanzado">Avanzado</option>
            <option value="Chef">Chef</option>
          </select>
        </div>
        <div className="campo">
          <label htmlFor="imagen">Imagen de la receta:</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="boton-enviar" disabled={loadingCreate || loadingUpdate}>
          {loadingCreate ? 'Creando...' : loadingUpdate ? 'Actualizando...' : 'Guardar Receta'}
        </button>
      </form>
      </div>
    </div>
  );
}

export default Creacion;
