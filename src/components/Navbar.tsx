import { Nav } from 'react-bootstrap';
import { FaEye, FaUser, FaRegChartBar, FaServer, FaBolt } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Navbar() {

    return (
        <>
            <Nav activeKey={location.pathname} className="d-flex flex-column">
                <Nav.Link as={Link} to="/admins" id='management-navbar-first-link'>
                    <FaEye className='management-navbar-icon' /> 
                    <span>Administradores</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/users">
                    <FaUser className='management-navbar-icon' />
                    <span>Usuarios</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/trainings">
                    <FaBolt className='management-navbar-icon' />
                    <span>Entrenamientos</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/services">
                    <FaServer className='management-navbar-icon' />
                    <span>Servicios</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/metrics" id='management-navbar-last-link'>
                    <FaRegChartBar className='management-navbar-icon' />
                    <span>Métricas</span>
                </Nav.Link>
            </Nav>
        </>
    )
}