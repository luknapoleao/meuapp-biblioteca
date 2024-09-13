import React from "react";
import { Table } from "react-bootstrap";

class Livros extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      livros: [
        { id: 1, "nome do livro": "Crônicas de Gelo e Fogo", Autor: "R. R. Martin", Editora: "Bantam Spectra" },
        { id: 2, "nome do livro": "Harry Potter e a Pedra Filosofal", Autor: "J. K. Rowling", Editora: "Rocco" },
        { id: 3, "nome do livro": "Percy Jackson Ladrão de Raios", Autor: "Rick Riordan", Editora: "Intrínseca" },
      ]
    };
  }

  componentDidMount(){
   
  }

  componentWillUnmount(){
   
  }

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Id</td>
            <th>Nome do livro</th>
            <th>Autor</th>
            <th>Editora</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {this.state.livros.map((livro) => (
            <tr key={livro.id}>
              <td>{livro.id}</td>
              <td>{livro["nome do livro"]}</td>
              <td>{livro.Autor}</td>
              <td>{livro.Editora}</td>
              <td>
                <button>Atualizar</button>
                <button>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default Livros;