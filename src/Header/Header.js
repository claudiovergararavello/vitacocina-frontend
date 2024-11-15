import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Login from '../Login/Login';
import Registrarse from '../Registrarse/Registrarse';

function Header() {
  // Location
  const location = useLocation();

  // Paths
  const isRecetasActive = location.pathname.startsWith("/recetas");
  const isConsejosActive = location.pathname.startsWith("/consejos");
  const isAdministracionActive = location.pathname.startsWith("/administrador");

  // Estados
  const [isMobile, setIsMobile] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de autenticación
  const recetasMenuRef = useRef(null);
  const consejosMenuRef = useRef(null);
  const AdministracionMenuRef = useRef(null);

  // Modal Login
  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  // Modal Registro
  const openRegisterModal = () => setRegisterModalOpen(true);
  const closeRegisterModal = () => setRegisterModalOpen(false);

  // Maneja el éxito del inicio de sesión
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Toggle Menu
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  // Dropdowns
  const [isRecetasDropdownOpen, setRecetasDropdownOpen] = useState(false);
  const [isConsejosDropdownOpen, setConsejosDropdownOpen] = useState(false);
  const [isAdministracionDropdownOpen, setAdministracionDropdownOpen] = useState(false);

  const toggleRecetasDropdown = (e) => {
    e.preventDefault();
    setAdministracionDropdownOpen(false);
    setConsejosDropdownOpen(false);
    setRecetasDropdownOpen(!isRecetasDropdownOpen);
  };

  const toggleConsejosDropdown = (e) => {
    e.preventDefault();
    setAdministracionDropdownOpen(false);
    setRecetasDropdownOpen(false);
    setConsejosDropdownOpen(!isConsejosDropdownOpen);
  };

  const toggleAdministracionDropdown = (e) => {
    e.preventDefault();
    setRecetasDropdownOpen(false);
    setConsejosDropdownOpen(false);
    setAdministracionDropdownOpen(!isAdministracionDropdownOpen);
  };

  // Cierra los dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (recetasMenuRef.current && !recetasMenuRef.current.contains(event.target)) {
        setRecetasDropdownOpen(false);
      }
      if (consejosMenuRef.current && !consejosMenuRef.current.contains(event.target)) {
        setConsejosDropdownOpen(false);
      }
      if (AdministracionMenuRef.current && !AdministracionMenuRef.current.contains(event.target)) {
        setAdministracionDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [recetasMenuRef, consejosMenuRef, AdministracionMenuRef]);

  // Detecta el tamaño del dispositivo
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 750);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="header-div">
        {isLoggedIn ? (
          <div className="header-item">
            <span className="header-title">admin</span>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
      <header className="header">
        <div style={{ alignSelf: 'center' }}>
          <img alt="VitaCocina" className="logo" />
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>

        <nav className={isMenuOpen ? 'active' : ''}>
          <ul>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'header-nav activo' : 'header-nav')}>
                INICIO
              </NavLink>
            </li>

            {/* Mobile */}
            {isMobile && (
              <li onClick={toggleRecetasDropdown} ref={recetasMenuRef}>
                <span className={`header-nav ${isRecetasActive ? 'activo' : ''}`}>
                  RECETAS
                </span>
                {isRecetasDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li><NavLink to="/recetas/favoritos">Recetas</NavLink></li>
                    <li><NavLink to="/recetas/creacion">Publicar</NavLink></li>
                    <li><NavLink to="/recetas/buscador">Buscador</NavLink></li>
                  </ul>
                )}
              </li>
            )}
            {!isMobile && (
              <li onMouseEnter={() => setRecetasDropdownOpen(true)} onMouseLeave={() => setRecetasDropdownOpen(false)}>
                <span className={`header-nav ${isRecetasActive ? 'activo' : ''}`}>
                  RECETAS
                </span>
                {isRecetasDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li><NavLink to="/recetas/favoritos">Favoritas</NavLink></li>
                    <li><NavLink to="/recetas/creacion">Publicar</NavLink></li>
                    <li><NavLink to="/recetas/buscador">Buscador</NavLink></li>
                  </ul>
                )}
              </li>
            )}

            {/* Mobile */}
            {isMobile && (
              <li onClick={toggleConsejosDropdown} ref={consejosMenuRef}>
                <span className={`header-nav ${isConsejosActive ? 'activo' : ''}`}>
                  CONSEJOS
                </span>
                {isConsejosDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li><NavLink to="/consejos/favoritosc">Favoritos</NavLink></li>
                    <li><NavLink to="/consejos/buscadorc">Buscador</NavLink></li>
                  </ul>
                )}
              </li>
            )}
            {!isMobile && (
              <li onMouseEnter={() => setConsejosDropdownOpen(true)} onMouseLeave={() => setConsejosDropdownOpen(false)}>
                <span className={`header-nav ${isConsejosActive ? 'activo' : ''}`}>
                  CONSEJOS
                </span>
                {isConsejosDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li><NavLink to="/consejos/favoritosc">Favoritos</NavLink></li>
                    <li><NavLink to="/consejos/buscadorc">Buscador</NavLink></li>
                  </ul>
                )}
              </li>
            )}

            {/* Mobile */}
            {isMobile && (
              <li onClick={toggleAdministracionDropdown} ref={AdministracionMenuRef}>
                <span className={`header-nav ${isAdministracionActive ? 'activo' : ''}`}>
                  ADMINISTRACIÓN
                </span>
                {isAdministracionDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li><NavLink to="/administrador/crearu">Usuario</NavLink></li>
                    <li><NavLink to="/administrador/creacionr">Recetas</NavLink></li>
                    <li><NavLink to="/administrador/creacionc">Consejos</NavLink></li>
                  </ul>
                )}
              </li>
            )}
            {!isMobile && (
              <li onMouseEnter={() => setAdministracionDropdownOpen(true)} onMouseLeave={() => setAdministracionDropdownOpen(false)}>
                <span className={`header-nav ${isAdministracionActive ? 'activo' : ''}`}>
                  ADMINISTRACIÓN
                </span>
                {isAdministracionDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li><NavLink to="/administrador/crearu">Usuario</NavLink></li>
                    <li><NavLink to="/administrador/creacionr">Recetas</NavLink></li>
                    <li><NavLink to="/administrador/creacionc">Consejos</NavLink></li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </nav>
      </header>

      {/* Modals */}
      <Login isOpen={isLoginModalOpen} onClose={closeLoginModal} onLoginSuccess={handleLoginSuccess} />
      <Registrarse isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />
    </>
  );
}

export default Header;
