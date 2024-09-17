import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header/Header';
import Inicio from './Inicio/Inicio';
import Recetas from './Recetas/Recetas';
import Consejos from './Consejos/Consejos';
import Nosotros from './Nosotros/Nosotros';
import Registrarse from './Registrarse/Registrarse';
import Login from './Login/Login';
import Favoritos from './Recetas/Favoritos';
import Creacion from './Recetas/Creacion';
import Buscador from './Recetas/Buscador';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        {/* Rutas */}
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/recetas" element={<Recetas />}>
            <Route path="entradas" element={<Favoritos />} />
            <Route path="platos-principales" element={<Creacion />} />
            <Route path="postres" element={<Buscador />} />
          </Route>
          <Route path="/consejos" element={<Consejos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
