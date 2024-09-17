import React from 'react';
import { Outlet } from 'react-router-dom';

function Recetas() {
    return (
      <div>
        Hola Recetas
        <Outlet />
      </div>
    );
  }

export default Recetas;