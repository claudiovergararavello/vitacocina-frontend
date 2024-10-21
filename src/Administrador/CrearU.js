import React, { useState } from 'react';
import './CrearU.css'; 

function CrearU({ onClose }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setError('');
    // Aquí va la lógica de creación de usuario (conexión a backend o base de datos)
    console.log('Usuario creado:', { username, email, password, role });
    
    onClose(); // Cierra el formulario después de la creación del usuario
  };

  return (
    <div className="">
      <h2>Crear Usuario</h2>
      <div className="" style={{display: 'flex', justifyContent: 'center'}}>
        <form onSubmit={handleSubmit} className="create-user-form">
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa el nombre de usuario"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa el correo electrónico"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa la contraseña"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirma la contraseña"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Rol del Usuario</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          
          {error && <p className="error-message">{error}</p>} {/* Muestra un mensaje de error si las contraseñas no coinciden */}

          <button type="submit" className="btn-create">Crear Usuario</button>
        </form>
         {/* <button onClick={onClose} className="btn-close">Cerrar</button> */}
      </div>
    </div>
  );
}

export default CrearU;
