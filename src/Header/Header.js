import React, { useState, useEffect, useRef  } from 'react';
import './Header.css';
import { NavLink, Link, useLocation  } from 'react-router-dom';
import Login from '../Login/Login';
import Registrarse from '../Registrarse/Registrarse';

function Header(){
  // Location
  const location = useLocation();

  // Paths
  const isRecetasActive = location.pathname.startsWith("/recetas");
  const isConsejosActive = location.pathname.startsWith("/consejos");

  // Estados
  const [isMobile, setIsMobile] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const recetasMenuRef = useRef(null);
  const consejosMenuRef = useRef(null);

  // Modal Login
  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  // Modal Registro
  const openRegisterModal = () => setRegisterModalOpen(true);
  const closeRegisterModal = () => setRegisterModalOpen(false);

  // Toggle Menu
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  // Toggle Recetas
  const toggleRecetasDropdown = (e) => {
    e.preventDefault()
      setConsejosDropdownOpen(false);
      setRecetasDropdownOpen(!isRecetasDropdownOpen);
    
  };
  // Toggle Consejos
  const toggleConsejosDropdown = (e) => {
    e.preventDefault();
   
      setRecetasDropdownOpen(false);
      setConsejosDropdownOpen(!isConsejosDropdownOpen);
    
  };

  // Funcion que cierra los dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if(recetasMenuRef.current && !recetasMenuRef.current.contains(event.target)){
        setRecetasDropdownOpen(false);
      }
      if(consejosMenuRef.current && !consejosMenuRef.current.contains(event.target)){
        setConsejosDropdownOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [recetasMenuRef, consejosMenuRef]);

  // Funcion que reconoce el tamaño del dispositivo
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 750);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dropdown Recetas
  const [isRecetasDropdownOpen, setRecetasDropdownOpen] = useState(false);
  const handleRecetasMouseEnter = () => {
    setConsejosDropdownOpen(false);
    setRecetasDropdownOpen(true);
  };
  const handleRecetasMouseLeave = () => setRecetasDropdownOpen(false);

  // Dropdown Consejos
  const [isConsejosDropdownOpen, setConsejosDropdownOpen] = useState(false);
  const handleConsejosMouseEnter = () => {
    setRecetasDropdownOpen(false);
    setConsejosDropdownOpen(true);
  };
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
            {/* Mobile */}
            {isMobile && (
              <li onClick={toggleRecetasDropdown} ref={recetasMenuRef}>
                <span className={`header-nav ${isRecetasActive ? 'activo' : ''}`}>
                  RECETAS
                </span>
                {isRecetasDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li><NavLink to="/recetas/favoritos">Recetas favoritas</NavLink></li>
                    <li><NavLink to="/recetas/creacion">Publicar recetas</NavLink></li>
                    <li><NavLink to="/recetas/buscador">Buscador de recetas</NavLink></li>
                  </ul>
                )}
              </li> 
            )}
            {/* PC */}
            {!isMobile && (
              <li onMouseEnter={handleRecetasMouseEnter} onMouseLeave={handleRecetasMouseLeave}>
                <span className={`header-nav ${isRecetasActive ? 'activo' : ''}`}>
                  RECETAS
                </span>
                {isRecetasDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li><NavLink to="/recetas/favoritos">Recetas favoritas</NavLink></li>
                    <li><NavLink to="/recetas/creacion">Publicar recetas</NavLink></li>
                    <li><NavLink to="/recetas/buscador">Buscador de recetas</NavLink></li>
                  </ul>
                )}
              </li> 
            )}
            {/* Mobile */}
            {isMobile && (
              <li onClick={toggleConsejosDropdown} ref={consejosMenuRef} >
              <span className={`header-nav ${isConsejosActive ? 'activo' : ''}`}>
                  CONSEJOS
              </span>
              {isConsejosDropdownOpen && (
                <ul className="dropdown-menu">
                  <li><NavLink to="/consejos/consejo1">Consejo número 1</NavLink></li>
                  <li><NavLink to="/consejos/consejo2">Consejo número 2</NavLink></li>
                  <li><NavLink to="/consejos/consejo3">Consejo número 3</NavLink></li>
                </ul>
              )}
            </li> 
            )}
            {/* PC */}
            {!isMobile && (
              <li onMouseEnter={handleConsejosMouseEnter} onMouseLeave={handleConsejosMouseLeave}>
              <span className={`header-nav ${isConsejosActive ? 'activo' : ''}`}>
                  CONSEJOS
              </span>
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
