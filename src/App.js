import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header/Header';
import Inicio from './Inicio/Inicio';
import Recetas from './Recetas/Recetas';
import Consejos from './Consejos/Consejos';
import Administrador from './Administrador/Administrador';
import Registrarse from './Registrarse/Registrarse';
import Login from './Login/Login';
import Favoritos from './Recetas/Favoritos';
import Creacion from './Recetas/Creacion';
import Buscador from './Recetas/Buscador';
import FavoritosC from './Consejos/FavoritosC';
import BuscadorC from './Consejos/BuscadorC';
import Receta from './Recetas/Receta';
import CreacionC from './Administrador/CreacionC';
import CrearU from './Administrador/CrearU';
import CreacionR from './Administrador/CreacionR';
import Consejo from './Consejos/Consejo';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        {/* Rutas */}
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/recetas" element={<Recetas />}>
            <Route path="favoritos" element={<Favoritos />} />
            <Route path="creacion" element={<Creacion />} />
            <Route path="buscador" element={<Buscador />} />
          </Route>
          <Route path="/consejos" element={<Consejos />}>
            <Route path="FavoritosC" element={<FavoritosC />} />
            <Route path="BuscadorC" element={<BuscadorC />} />
            {/**/}
          </Route>
          <Route path="/administrador" element={<Administrador />}>
            <Route path="crearu" element={<CrearU />} />
            <Route path="creacionc" element={<CreacionC />} />
            <Route path="creacionr" element={<CreacionR />} />
          </Route>
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/receta" element={<Receta />} />
          <Route path="/consejo" element={<Consejo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
