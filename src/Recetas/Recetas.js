import React from 'react';
import { Outlet } from 'react-router-dom';

function Recetas() {
    return (
      <div>
        <Outlet />
      </div>
    );
  }

export default Recetas;