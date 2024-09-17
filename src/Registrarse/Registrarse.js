import React from 'react';
import '../App.css';

function Registrarse({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Registrarse</h2>
        {/* Aquí puedes agregar tu formulario de registro */}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default Registrarse;
