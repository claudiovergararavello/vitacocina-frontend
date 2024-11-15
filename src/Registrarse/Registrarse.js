import React, { useState } from 'react';
import './Registrarse.css'; // Importamos el archivo CSS

function Registrarse({ isOpen, onClose }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // Para mostrar errores

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Si las contraseñas coinciden, limpia el error
    setError('');

    // Aquí puedes agregar la lógica para manejar el registro
    console.log('Nombre de Usuario:', username);
    console.log('Correo Electrónico:', email);
    console.log('Contraseña:', password);
    onClose(); // Cierra el modal después de enviar el formulario
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Registrarse</h2>
        <div className="title-divider"></div>
        {/* Formulario de registro */}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu nombre de usuario"
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
              placeholder="Ingresa tu correo electrónico"
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
              placeholder="Ingresa tu contraseña"
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
              placeholder="Confirma tu contraseña"
              required
            />
          </div>
          
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn-register">
            Registrarse
          </button>
        </form>
        <button onClick={onClose} className="btn-close">
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default Registrarse;
