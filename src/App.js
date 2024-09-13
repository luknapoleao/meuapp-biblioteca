import Home from './components/Home'; 
import Sobre from './components/Sobre'; 
import Livros from './components/Livros'; 
import {BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1>Minha aplicação em React</h1>
      <BrowserRouter>

        <Nav variant='tabs'>
          <Nav.Link as={Link} to="/">Página Inicial</Nav.Link>
          <Nav.Link as={Link} to="/livros">Cadastro de Livros</Nav.Link>
          <Nav.Link as={Link} to="/sobre">Sobre</Nav.Link>
        </Nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/livros" element={<Livros />} />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;