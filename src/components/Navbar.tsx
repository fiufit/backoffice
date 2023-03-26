import { Nav, Container } from 'react-bootstrap';
import NavbarBootstrap from 'react-bootstrap/Navbar'

export default function Navbar() {
    return (
        <NavbarBootstrap className="text-uppercase" id="mainNav">
            <Container>
                <NavbarBootstrap.Brand className="navbar-brand navbar-brand-light" href="/">FIUFIT</NavbarBootstrap.Brand>
                <Nav className="justify-content-end">
                    <Nav.Link className="nav-link nav-link-login" href="/login">
                        Ingresar
                    </Nav.Link>
                    <Nav.Link className="nav-link nav-link-download" href="#">
                        Descargar
                    </Nav.Link>
                </Nav>
            </Container>
        </NavbarBootstrap>
    )
}
