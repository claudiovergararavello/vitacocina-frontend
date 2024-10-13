import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Creacion.css';

function Creacion() {
  const [loggedIn, setLoggedIn] = useState(false); // Simulando estado de sesión
  const [receta, setReceta] = useState({
    titulo: '',
    descripcion: '',
    ingredientes: '',
    preparacion: '',
    tipo: '', // Campo nuevo para tipo de receta
    duracion: '', // Campo nuevo para tiempo de duración
    nivel: '', // Campo nuevo para nivel de dificultad
    imagen: null,
  });

  const navigate = useNavigate();

  // Simulación de login
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

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Receta enviada:', receta);
    // Aquí enviarías la receta a la base de datos
    // Redireccionar a otra página o mostrar un mensaje de éxito
  };

  if (!loggedIn) {
    return (
      <div className="contenedor-login">
        <div className="login-box">
          <h2>Para acceder a este contenido debes iniciar sesión</h2>
          <button onClick={handleLogin} className="boton-login">Iniciar sesión</button>
          <p>
            <span>¿No tienes cuenta?</span> {/* Aquí está el texto sobre el botón */}
            <button onClick={handleLogin} className="boton-login">Regístrate</button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="formulario-receta">
      <h2>Crea una nueva receta</h2>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="titulo">Título de la receta:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={receta.titulo}
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
            onChange={handleInputChange}
            rows="3"
            required
          ></textarea>
        </div>
        <div className="campo">
          <label htmlFor="ingredientes">Ingredientes:</label>
          <textarea
            id="ingredientes"
            name="ingredientes"
            value={receta.ingredientes}
            onChange={handleInputChange}
            rows="4"
            required
          ></textarea>
        </div>
        <div className="campo">
          <label htmlFor="preparacion">Preparación:</label>
          <textarea
            id="preparacion"
            name="preparacion"
            value={receta.preparacion}
            onChange={handleInputChange}
            rows="5"
            required
          ></textarea>
        </div>
        <div className="campo">
          <label htmlFor="tipo">Tipo de receta:</label>
          <select
            id="tipo"
            name="tipo"
            value={receta.tipo}
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
          <label htmlFor="duracion">Tiempo de duración (min):</label>
          <input
            type="number"
            id="duracion"
            name="duracion"
            value={receta.duracion}
            onChange={handleInputChange}
            required
          />
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
        <button type="submit" className="boton-enviar">Enviar receta</button>
      </form>
    </div>
  );
}

export default Creacion;
