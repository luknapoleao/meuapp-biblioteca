import Home from './components/Home'; 
import Sobre from './components/Sobre'; 
import Livros from './components/Livros'; 
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Importando o arquivo CSS
function App() {
  return (
    <div className="App">
      <h1>Biblioteca Virtual 📚 </h1>
      <BrowserRouter>
        <Nav variant='tabs' className="Nav">
          <Nav.Link as={Link} to="/" className="nav-link">Página Inicial</Nav.Link>
          <Nav.Link as={Link} to="/livros" className="nav-link">Cadastro de Livros</Nav.Link>
          <Nav.Link as={Link} to="/sobre" className="nav-link">Sobre</Nav.Link>
        </Nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/livros" element={<Livros />} />
            <Route path="/sobre" element={<Sobre />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;