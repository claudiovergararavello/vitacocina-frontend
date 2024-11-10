import React, { useState } from 'react';
import './Login.css'; 

function Login({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de credenciales específicas
    if (email === 'admin@usm.cl' && password === '123456') {
      setError(''); // Limpiar el mensaje de error
      onLoginSuccess(); // Notificar éxito de inicio de sesión
      onClose(); // Cerrar el modal
    } else {
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Iniciar Sesión</h2>
        <div className="title-divider"></div>
        <form onSubmit={handleSubmit} className="login-form">
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
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn-login">
            Iniciar Sesión
          </button>
        </form>
        <button onClick={onClose} className="btn-close">
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default Login;
