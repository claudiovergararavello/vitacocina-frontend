import React from 'react';
import { Outlet } from 'react-router-dom';

function Consejos() {
    return (
      <div>
        Hola Consejos
        <Outlet />
      </div>
    );
  }

export default Consejos;