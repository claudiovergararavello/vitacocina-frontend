import React, { useState } from 'react';
import CrearU from './CrearU';

function Administrador() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <button
        className="btn-create"
        onClick={handleOpen}
        style={{
          padding: '10px 15px', // Ajusta el tamaño vertical y horizontal del botón
          fontSize: '16px', // Cambia el tamaño de la fuente
          display: 'inline-block', // Permite que el botón ajuste su tamaño basado en el contenido
          margin: '10px auto', // Centra el botón y agrega espacio arriba y abajo
          maxWidth: '200px', // Define un ancho máximo para el botón, ajusta según sea necesario
          width: 'auto', // Permite que el botón ajuste su ancho automáticamente
        }}
      >
        Crear Usuario
      </button>
      {isOpen && <CrearU onClose={handleClose} />}
    </div>
  );
}

export default Administrador;
