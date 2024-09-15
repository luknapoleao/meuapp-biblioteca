import React from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";

class Livros extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      livros: [],
      livroParaEditar: null, // Armazena o livro sendo editado
      nomeDoLivro: "",
      autor: "",
      editora: "",
      editando: false, // Estado para saber se está no modo de edição
      showModal: false // Controla o estado do modal
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

  editarLivro = (livro) => {
    this.setState({
      livroParaEditar: livro.id,
      nomeDoLivro: livro.nomeDoLivro,
      autor: livro.autor,
      editora: livro.editora,
      editando: true,
      showModal: true // Abre o modal para edição
    });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  adicionarLivro = (event) => {
    event.preventDefault();
    const { livros, nomeDoLivro, autor, editora } = this.state;

    const novoLivro = {
      id: Date.now(),
      nomeDoLivro,
      autor,
      editora
    };

    this.setState({
      livros: [...livros, novoLivro],
      nomeDoLivro: "",
      autor: "",
      editora: "",
      editando: false,
      showModal: false // Fecha o modal ao adicionar
    });
  };

  limparFormulario = () => {
    this.setState({
      livroParaEditar: null,
      nomeDoLivro: "",
      autor: "",
      editora: "",
      editando: false
    });
  };

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
      editando: false,
      showModal: false // Fecha o modal ao atualizar
    });
  };

  handleShow = () => {
    this.setState({
      showModal: true,
      nomeDoLivro: "",
      autor: "",
      editora: "",
      editando: false
    });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { livros, nomeDoLivro, autor, editora, editando, showModal } = this.state;

    return (
      <div>
        <h3>{editando ? "Editar Livro" : "Adicionar Livro"}</h3>
        <Button variant="warning" onClick={this.handleShow}>
          Novo Livro
        </Button>

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

        <Modal show={showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{editando ? "Editar Livro" : "Adicionar Livro"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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

              <Button variant="primary" type="submit">
                {editando ? "Salvar Alterações" : "Adicionar Livro"}
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Livros;