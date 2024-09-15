import React from "react";
import { Table, Button, Form } from "react-bootstrap";

class Livros extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      livros: [],
      livroParaEditar: null, // Armazena o livro sendo editado
      nomeDoLivro: "",
      autor: "",
      editora: "",
      editando: false // Estado para saber se está no modo de edição
    };
  }

  componentDidMount() {
    this.buscarLivro();
  }

  buscarLivro = () => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=holmes")
      .then(resposta => resposta.json())
      .then(dados => {
        const livros = dados.items.map(item => ({
          id: item.id,
          nomeDoLivro: item.volumeInfo.title,
          autor: item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Autor desconhecido",
          editora: item.volumeInfo.publisher || "Editora desconhecida"
        }));
        this.setState({ livros });
      })
      .catch(erro => console.error("Erro ao buscar dados: ", erro));
  }

  deletarLivro = (id) => {
    const livrosAtualizados = this.state.livros.filter(livro => livro.id !== id);
    this.setState({ livros: livrosAtualizados });
  }

  // Função para carregar os dados do livro no formulário para edição
  editarLivro = (livro) => {
    this.setState({
      livroParaEditar: livro.id,
      nomeDoLivro: livro.nomeDoLivro,
      autor: livro.autor,
      editora: livro.editora,
      editando: true
    });
  }

  // Função para manipular a alteração nos inputs do formulário
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Função para adicionar um novo livro
  adicionarLivro = (event) => {
    event.preventDefault();
    const { livros, nomeDoLivro, autor, editora } = this.state;

    // Cria um novo livro com um id único
    const novoLivro = {
      id: Date.now(), // Usando o timestamp como ID temporário
      nomeDoLivro,
      autor,
      editora
    };

    this.setState({
      livros: [...livros, novoLivro],
      nomeDoLivro: "",
      autor: "",
      editora: "",
      editando: false
    });
  };

  // Função para limpar o formulário e preparar para adicionar um novo livro
  limparFormulario = () => {
    this.setState({
      livroParaEditar: null,
      nomeDoLivro: "",
      autor: "",
      editora: "",
      editando: false
    });
  };

  // Função para atualizar o livro após a edição
  atualizarLivro = (event) => {
    event.preventDefault();
    const { livroParaEditar, nomeDoLivro, autor, editora, livros } = this.state;

    const livrosAtualizados = livros.map(livro => {
      if (livro.id === livroParaEditar) {
        return {
          ...livro,
          nomeDoLivro,
          autor,
          editora
        };
      }
      return livro;
    });

    this.setState({
      livros: livrosAtualizados,
      livroParaEditar: null,
      nomeDoLivro: "",
      autor: "",
      editora: "",
      editando: false
    });
  };

  render() {
    const { livros, nomeDoLivro, autor, editora, editando } = this.state;

    return (
      <div>
        <h3>{editando ? "Editar Livro" : "Adicionar Livro"}</h3>
        <Form onSubmit={editando ? this.atualizarLivro : this.adicionarLivro}>
          <Form.Group controlId="formNomeDoLivro">
            <Form.Label>Nome do Livro</Form.Label>
            <Form.Control
              type="text"
              name="nomeDoLivro"
              value={nomeDoLivro}
              onChange={this.handleChange}
              placeholder="Digite o nome do livro"
              required
            />
          </Form.Group>

          <Form.Group controlId="formAutor">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              type="text"
              name="autor"
              value={autor}
              onChange={this.handleChange}
              placeholder="Digite o nome do autor"
              required
            />
          </Form.Group>

          <Form.Group controlId="formEditora">
            <Form.Label>Editora</Form.Label>
            <Form.Control
              type="text"
              name="editora"
              value={editora}
              onChange={this.handleChange}
              placeholder="Digite o nome da editora"
              required
            />
          </Form.Group>

          <div className="d-flex align-items-center">
            <Button variant="success" type="submit">
              {editando ? "Atualizar Livro" : "Adicionar Livro"}
            </Button>
            <Button 
              variant="warning" 
              className="ml-2" // Adiciona um espaço ao lado
              onClick={this.limparFormulario}
            >
              Novo Livro
            </Button>
          </div>
        </Form>

        <h3>Lista de Livros</h3>
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
            {livros.map((livro, index) => (
              <tr key={livro.id}>
                <td>{String(index + 1).padStart(2, '0')}</td>
                <td>{livro.nomeDoLivro}</td>
                <td>{livro.autor}</td>
                <td>{livro.editora}</td>
                <td>
                  <Button variant="primary" onClick={() => this.editarLivro(livro)}>
                    Atualizar
                  </Button>{' '}
                  <Button variant="danger" onClick={() => this.deletarLivro(livro.id)}>
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Livros;