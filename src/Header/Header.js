import React, { useState, useEffect, useRef  } from 'react';
import './Header.css';
import { NavLink, Link } from 'react-router-dom';
import Login from '../Login/Login';
import Registrarse from '../Registrarse/Registrarse';

function Header() {
  // Estados
  const [isMobile, setIsMobile] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const recetasMenuRef = useRef(null);
  const consejosMenuRef = useRef(null);
  // Modals
  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const openRegisterModal = () => setRegisterModalOpen(true);
  const closeRegisterModal = () => setRegisterModalOpen(false);

  // Toggle Recetas
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const toggleRecetasDropdown = (e) => {
    e.preventDefault()
    if (isMobile) {
      setRecetasDropdownOpen(!isRecetasDropdownOpen);
    }
  };
  
  const toggleConsejosDropdown = (e) => {
    e.preventDefault();
    setConsejosDropdownOpen(!isConsejosDropdownOpen);
  };

  // Detectar clic fuera del menú para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (consejosMenuRef.current && !consejosMenuRef.current.contains(event.target)) {
        setRecetasDropdownOpen(false);
      }
    };

    // Añadir el evento cuando el componente está montado
    document.addEventListener('mousedown', handleClickOutside);
    
    // Limpiar el evento cuando el componente se desmonta
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [consejosMenuRef]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 750); // Considerar móvil si el ancho es menor a 768px
    };

    // Ejecutar la detección cuando se redimensione la pantalla
    window.addEventListener('resize', handleResize);

    // Ejecutar al montar el componente para detectar el tamaño inicial
    handleResize();

    // Limpiar el evento cuando el componente se desmonta
    return () => window.removeEventListener('resize', handleResize);
  }, [recetasMenuRef]);

  // Dropdown states
  const [isRecetasDropdownOpen, setRecetasDropdownOpen] = useState(false);
  const handleRecetasMouseEnter = () => setRecetasDropdownOpen(true);
  const handleRecetasMouseLeave = () => setRecetasDropdownOpen(false);

  const [isConsejosDropdownOpen, setConsejosDropdownOpen] = useState(false);
  const handleConsejosMouseEnter = () => setConsejosDropdownOpen(true);
  const handleConsejosMouseLeave = () => setConsejosDropdownOpen(false);

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
        <div style={{alignSelf: 'center'}}>
          <img src="logo.png" alt="VitaCocina" className="logo" />
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
            {/* PC */}
            {isMobile && (
              <li onClick={toggleRecetasDropdown} ref={recetasMenuRef}>
                <NavLink to="/recetas" className={({ isActive }) => (isActive ? 'header-nav activo' : 'header-nav')}>
                  RECETAS
                </NavLink>
                {isRecetasDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li><NavLink to="/recetas/entradas">Recetas favoritas</NavLink></li>
                    <li><NavLink to="/recetas/platos-principales">Publicar recetas</NavLink></li>
                    <li><NavLink to="/recetas/postres">Buscador de recetas</NavLink></li>
                  </ul>
                )}
              </li> 
            )}
            {/* Mobile */}
            {!isMobile && (
              <li onMouseEnter={handleRecetasMouseEnter} onMouseLeave={handleRecetasMouseLeave} >
                <NavLink to="/recetas" className={({ isActive }) => (isActive ? 'header-nav activo' : 'header-nav')}>
                  RECETAS
                </NavLink>
                {isRecetasDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li><NavLink to="/recetas/entradas">Recetas favoritas</NavLink></li>
                    <li><NavLink to="/recetas/platos-principales">Publicar recetas</NavLink></li>
                    <li><NavLink to="/recetas/postres">Buscador de recetas</NavLink></li>
                  </ul>
                )}
              </li> 
            )}
            {/* PC */}
            {isMobile && (
              <li onClick={toggleConsejosDropdown} ref={consejosMenuRef} >
              <NavLink to="/consejos" className={({ isActive }) => (isActive ? 'header-nav activo' : 'header-nav')}>
                CONSEJOS
              </NavLink>
              {isConsejosDropdownOpen && (
                <ul className="dropdown-menu">
                  <li><NavLink to="/consejos/consejo1">Consejo número 1</NavLink></li>
                  <li><NavLink to="/consejos/consejo2">Consejo número 2</NavLink></li>
                  <li><NavLink to="/consejos/consejo3">Consejo número 3</NavLink></li>
                </ul>
              )}
            </li> 
            )}
            {/* Mobile */}
            {!isMobile && (
              <li onMouseEnter={handleConsejosMouseEnter} onMouseLeave={handleConsejosMouseLeave} >
              <NavLink to="/consejos" className={({ isActive }) => (isActive ? 'header-nav activo' : 'header-nav')}>
                CONSEJOS
              </NavLink>
              {isConsejosDropdownOpen && (
                <ul className="dropdown-menu">
                  <li><NavLink to="/consejos/consejo1">Consejo número 1</NavLink></li>
                  <li><NavLink to="/consejos/consejo2">Consejo número 2</NavLink></li>
                  <li><NavLink to="/consejos/consejo3">Consejo número 3</NavLink></li>
                </ul>
              )}
            </li> 
            )}

            <li>
              <NavLink to="/nosotros" className={({ isActive }) => (isActive ? 'header-nav activo' : 'header-nav')}>
                NOSOTROS
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      {/* Modals */}
      <Login isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <Registrarse isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />
    </>
  );
}

export default Header;
