import React, { useState } from 'react';import './Header.css';
import { NavLink, Link} from 'react-router-dom';
import Inicio from '../Inicio/Inicio';
import Registrarse from '../Registrarse/Registrarse';

function Header() {

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const openRegisterModal = () => setRegisterModalOpen(true);
  const closeRegisterModal = () => setRegisterModalOpen(false);

  const [isRecetasDropdownOpen, setRecetasDropdownOpen] = useState(false);

  const handleRecetasMouseEnter = () => setRecetasDropdownOpen(true);
  const handleRecetasMouseLeave = () => setRecetasDropdownOpen(false);

  return (
    <>
      <div className="header-div">
        <div className="header-item">
          <Link onClick={openRegisterModal} className="header-title">
            REGISTRARSE
          </Link>
        </div>
        <div className="header-item">
          <Link onClick={openLoginModal} className="header-title">
            INICIAR SESIÓN
          </Link>
        </div>
      </div>
      <header className="header">
        <img src="logo.png" alt="VitaCocina" className="logo" />
        <nav>
          <ul>
          <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'header-nav activo' : 'header-nav')}
              >
                INICIO
              </NavLink>
            </li>
            <li
              onMouseEnter={handleRecetasMouseEnter}
              onMouseLeave={handleRecetasMouseLeave}
            >
              <NavLink
                to="/recetas"
                className={({ isActive }) => (isActive ? 'header-nav activo' : 'header-nav')}
              >
                RECETAS
              </NavLink>
              {isRecetasDropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/recetas/entradas">Recetas favoritas</NavLink>
                  </li>
                  <li>
                    <NavLink to="/recetas/platos-principales">Publicar recetas</NavLink>
                  </li>
                  <li>
                    <NavLink to="/recetas/postres">Buscador de recetas</NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <NavLink
                to="/consejos"
                className={({ isActive }) => (isActive ? 'header-nav activo' : 'header-nav')}
              >
                CONSEJOS
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/nosotros"
                className={({ isActive }) => (isActive ? 'header-nav activo' : 'header-nav')}
              >
                NOSOTROS
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      {/* Modals */}
      <Inicio isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <Registrarse isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />
    </>
  );
}

export default Header;
