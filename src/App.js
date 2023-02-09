import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Navbar, Nav, Button, Card, Container, Row, Col, Modal } from 'react-bootstrap';
import data from "./data"
import { Routes, Route, Link } from "react-router-dom"
import { useState } from "react";

const currencyFormatter = (price) => price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });

function App() {
  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container className='mx-3'>
          <Navbar.Brand href="#home">amazone</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/items">Items</Nav.Link>
            <Nav.Link href="/pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="*" element={<Nosuchpage />} />
      </Routes>

    </div>
  );
}

function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
    
    <Carousel activeIndex={index} onSelect={handleSelect} className="">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("./img/sale1.jpg")}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3></h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("./img/sale2.jpg")}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3></h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("./img/sale3.jpg")}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3></h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </>
  )
}

function Items() {
  const [show, setShow] = useState(false);
  const [clicked, setClicked] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (

    <Container fluid>
      <Row className='my-4' >
        {data.map(d => (
          <Col key={d.id} className='my-2'>
            <Card className='mx-auto' style={{ width: '19rem' }}>
              <Card.Img className='p-3' variant="top" src={require(`${d.pic}`)} style={{ height: "200px", objectFit: "contain" }} />
              <Card.Body>
                <Card.Title className='text-truncate'>{d.title}</Card.Title>
                <Card.Text className='text-truncate'>{d.content}</Card.Text>
                <Card.Text>{currencyFormatter(d.price)}</Card.Text>
                <Button variant="primary" onClick={() => { setClicked(d.id); handleShow() }}>Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Detail show={show} handleClose={handleClose} clicked={clicked} />
    </Container>

  )
}

function Detail(props) {

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{data[props.clicked].title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{data[props.clicked].content}</Modal.Body>
      <Modal.Body>{currencyFormatter(data[props.clicked].price)}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={props.handleClose}>
          Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function Nosuchpage() {

  return (
    <Modal show={true} onHide={false}>
      <Modal.Header closeButton>
        <Modal.Title>⛔️ Error 404</Modal.Title>
      </Modal.Header>
      <Modal.Body>No such page</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" href='/'>
          Go to Home
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default App;
