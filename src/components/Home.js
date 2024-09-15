import React, { useState } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";

function Home() {
  const [livro, setLivro] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const buscarLivro = () => {
    setLoading(true);
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`)
      .then(resposta => resposta.json())
      .then(dados => {
        const livro = dados.items && dados.items.length > 0 ? dados.items[0] : null;
        setLivro(livro);
      })
      .catch(erro => console.error("Erro ao buscar livro:", erro))
      .finally(() => setLoading(false));
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <h1>Página Inicial</h1>
      <Form inline className="mb-4">
        <Form.Control
          type="text"
          placeholder="Digite o nome do livro"
          value={query}
          onChange={handleInputChange}
          className="mr-2"
        />
        <Button variant="primary" onClick={buscarLivro} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </Form>

      {livro && (
        <Card className="mt-4">
          <Row noGutters>
            <Col md={8} className="d-flex flex-column justify-content-center p-3">
              <Card.Body>
                <Card.Title>{livro.volumeInfo.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {livro.volumeInfo.authors ? livro.volumeInfo.authors.join(", ") : "Autor desconhecido"}
                </Card.Subtitle>
                <Card.Text>
                  {livro.volumeInfo.description ? livro.volumeInfo.description : "Descrição não disponível"}
                </Card.Text>
                <Card.Text>
                  <strong>Editora:</strong> {livro.volumeInfo.publisher || "Editora desconhecida"}
                </Card.Text>
              </Card.Body>
            </Col>
            <Col md={4} className="d-flex align-items-center justify-content-center p-3">
              <Card.Img
                variant="top"
                src={livro.volumeInfo.imageLinks ? livro.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/180x250.png?text=Sem+Imagem"}
                alt={livro.volumeInfo.title}
                style={{ maxWidth: "180px", maxHeight: "250px" }}
              />
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
}

export default Home;