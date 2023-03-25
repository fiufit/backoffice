import {Nav, Navbar, Container} from 'react-bootstrap';

export default function NavBar() {
    return (
        <Navbar className="navbar text-uppercase fixed-top" id="mainNav">
            <Container>
                <a id="linkNavBarFiufit" className="navbar-brand navbar-brand-light" href="/">fiufit</a>
                <Nav className="justify-content-end">
                    <a id="linkNavBarLogin" className="nav-link nav-link-login" href="/login">Ingresar</a>
                    <a id="linkNavBarDownload" className="nav-link nav-link-download" href="#">Descargar</a>
                </Nav>
            </Container>
        </Navbar>
    
    )
}