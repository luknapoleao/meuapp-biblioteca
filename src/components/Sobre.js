import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Sobre() {
  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">Sobre Minha Biblioteca Virtual</h1>
      
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>O que é a Minha Biblioteca Virtual?</Card.Title>
              <Card.Text>
                Minha Biblioteca Virtual é um projeto inovador que permite a você buscar e gerenciar livros de maneira simples e intuitiva. Com a nossa plataforma, você pode encontrar livros, visualizar informações detalhadas sobre cada um e manter sua própria coleção virtual.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Como Funciona?</Card.Title>
              <Card.Text>
                A plataforma utiliza a API do Google Books para fornecer informações precisas sobre os livros. Você pode procurar livros pelo título, visualizar a capa e acessar detalhes como autor, editora e descrição. Além disso, você pode adicionar novos livros à sua biblioteca e gerenciá-los facilmente.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Recursos Principais</Card.Title>
              <Card.Text>
                <ul>
                  <li><strong>Busca Rápida:</strong> Encontre livros pelo título com facilidade.</li>
                  <li><strong>Detalhes Completo:</strong> Acesse informações detalhadas sobre cada livro.</li>
                  <li><strong>Gerenciamento de Biblioteca:</strong> Adicione novos livros e mantenha sua coleção organizada.</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12} className="text-center">
          <Button variant="primary" href="/" className="mr-2">
            Voltar para a Página Inicial
          </Button>
          <Button variant="secondary" href="/contato">
            Entre em Contato
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Sobre;