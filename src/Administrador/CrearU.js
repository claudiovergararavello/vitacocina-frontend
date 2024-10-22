import React, { useState, useEffect } from 'react';
import './CrearU.css'; 
import axios from 'axios';

function CrearU({ onClose }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false); // Estado de Loading para creacion
  const [loadingUpdate, setLoadingUpdate] = useState(false); // Estado de Loading para actualizacion
  const [success, setSuccess] = useState(false);
  const [selectedConsejoId, setSelectedConsejoId] = useState(null); // Consejo seleccionada para editar
  const [loading, setLoading] = useState(true); // Estado de autenticacion
  const [users, setUsers] = useState([]); 
  const [user, setUser] = useState({
    nombre: '',
    mail: '',
    tipo: 'usuariox',
    contraseña: '',
    ccontraseña: '',
  });
  //const [username, setUsername] = useState('');
  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');
  //const [confirmPassword, setConfirmPassword] = useState('');
  //const [role, setRole] = useState('user');
  const [error, setError] = useState('');

  // useEffect para cargar los usuarios al montar el componente
  useEffect(() => {
    setLoading(true);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://iaugmt4hp4.execute-api.sa-east-1.amazonaws.com/stage_1/usuarios?mail=all',
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar los usuarios:', error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Simulación de login
  const handleLogin = () => {
    setLoggedIn(true);
  };

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Manejar envio del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Verificar que las contraseñas coincidan
    if (user.contraseña !== user.ccontraseña) {
      setError("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
      return; // Detener la ejecución si no coinciden
    }

    if (selectedConsejoId === null) {
      // Crear nuevo Consejo
      setLoadingCreate(true);
      let newUser = { ...user};
      delete newUser.timestamp;
      console.log('Consejo nuevo:', newUser);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://iaugmt4hp4.execute-api.sa-east-1.amazonaws.com/stage_1/usuarios',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(newUser),
      };

      axios
        .request(config)
        .then((response) => {
          console.log('Respuesta de la API:', response.data);
          setSuccess(true);
          // Asegurarnos de que el nuevo consejo se agregue correctamente al listado
          setUsers([...users, { ...response.data, nombre: newUser.nombre }]);
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
      let updatedUser = { ...user};
      delete updatedUser.timestamp;
      console.log('Usuario actualizado:', updatedUser);
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: 'https://iaugmt4hp4.execute-api.sa-east-1.amazonaws.com/stage_1/usuarios',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ body: updatedUser }),
      };

      axios
        .request(config)
        .then((response) => {
          console.log('Consejo actualizado:', response.data);
          // Actualizar solo el consejo específico en el estado de consejos
          setUsers((prevUser) =>
            prevUser.map((r) =>
              r.mail === selectedConsejoId ? { ...r, ...updatedUser } : r
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

    setUser({
      nombre: '',
      mail: '',
      tipo: 'usuariox',
      contraseña: '',
      ccontraseña: '',
    });

    setSelectedConsejoId(null);
  };

  // Seleccionar consejo para editar
  const handleSelectUser = (id) => {
    const selected = users.find((r) => r.mail === id); 
    console.log(users); 
    if (selected) {
      setUser(selected);
      setSelectedConsejoId(id);
      console.log("Usuario seleccionado con ID:", id);
    } 
    else {
      console.error(`No se encontró el usuario con ID: ${id}`);
    }
  };

  // Eliminar usuario
  const handleDeleteUser = (id) => {
    const userSeleccionado = users.find((r) => r.mail === id);
    if (!userSeleccionado) {
      console.error("No se encontró el consejo con el ID proporcionado.");
      return;
    }
    const nombre = userSeleccionado.nombre;

    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el usuario "${nombre}"?`);
    if (!confirmDelete) return;

    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `https://iaugmt4hp4.execute-api.sa-east-1.amazonaws.com/stage_1/usuarios/?mail=${id}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios.request(config)
      .then((response) => {
        console.log("Consejo eliminado:", response.data);

        // Elimina la receta del frontend
        setUsers(users.filter((r) => r.mail !== id));

        if (selectedConsejoId === id) {
          setUser({
            nombre: '',
            mail: '',
            tipo: 'usuariox',
            contraseña: '',
            ccontraseña: '',
          });
          setSelectedConsejoId(null);
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el consejo:", error);
      });
  };

  const AgregarConsejoNuevo = (val) => {
    setUser({
      nombre: '',
      mail: '',
      tipo: 'usuariox',
      contraseña: '',
      ccontraseña: '',
    });
    setSelectedConsejoId(val);
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
  if (loading) {
    return <div style={{display: "flex", justifyContent: "center", marginTop: "40px"}}><div className="loader"></div></div>;
  }

  return (
    <div className="contenedor-principal">
      {/* Sidebar */}
      <div className="sidebar">
        <button className="boton-agregar" onClick={() => AgregarConsejoNuevo(null)} style={{ marginBottom: '10px' }}>
          + Agregar
        </button>
        <div className="lista-recetas" style={{padding: "10px"}}>
          <h3>Listado de usuarios</h3>
          <ul style={{ listStyle: 'none', padding: '0' }}>
          {users.map((rec, index) => (
            <li key={rec.ID || index} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <div onClick={() => handleSelectUser(rec.mail)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                {rec.nombre}
              </div>
              <button className="boton-eliminar" onClick={() => handleDeleteUser(rec.mail)} style={{ marginTop: '5px' }}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
        </div>
      </div>
      {/* Formulario */}
      <div className="formulario-consejo">
      <h2>{selectedConsejoId ? 'Editar usuario' : 'Crear un usuario'}</h2>
      <div>
        {/* Mostrar loading durante el proceso de creación o actualización */}
        {(loadingCreate || loadingUpdate) && <p>{loadingCreate ? 'Creando...' : 'Actualizando...'}</p>}
        {success && <p>Usuario creado exitosamente.</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </div>
      <div className="" style={{display: 'flex', justifyContent: 'center'}}>
        <form onSubmit={handleSubmit} className="create-user-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre de Usuario</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={user.nombre}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mail">Correo Electrónico</label>
            <input
              type="email"
              id="mail"
              name="mail"
              value={user.mail}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contraseña">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              value={user.contraseña}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ccontraseña">Confirmar Contraseña</label>
            <input
              type="password"
              id="ccontraseña"
              onChange={handleInputChange}
              name="ccontraseña"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tipo">Rol del Usuario</label>
            <select
              id="tipo"
              value={user.tipo}
              onChange={handleInputChange}
              required
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          
          {error && <p className="error-message">{error}</p>} {/* Muestra un mensaje de error si las contraseñas no coinciden */}

          <button type="submit" className="btn-create" disabled={loadingCreate || loadingUpdate}>
        {loadingCreate ? 'Creando...' : loadingUpdate ? 'Actualizando...' : 'Guardar Usuario'}
      </button>
        </form>
      </div>
      </div>
    </div>
    
  );
}

export default CrearU;
