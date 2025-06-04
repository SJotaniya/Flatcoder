import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/" className=''>My School</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/classrooms">Classrooms</Nav.Link>
            <Nav.Link href="/teachers">Teachers</Nav.Link>
            <Nav.Link href="/students">Students</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;