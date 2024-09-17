import React from 'react';
import '../App.css';

function Inicio({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Iniciar Sesión</h2>
        {/* Aquí puedes agregar tu formulario de inicio de sesión */}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default Inicio;
