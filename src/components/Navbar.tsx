import { Nav } from 'react-bootstrap';
import { FaEye, FaUser, FaRegChartBar, FaServer, FaBolt } from "react-icons/fa";

export default function Navbar() {
    return (
        <>
            <Nav activeKey={location.pathname} className="d-flex flex-column">
                <Nav.Link href="/admins" id='management-navbar-first-link'>
                    <FaEye className='management-navbar-icon' /> 
                    <span>Administradores</span>
                </Nav.Link>
                <Nav.Link href="/users">
                    <FaUser className='management-navbar-icon' />
                    <span>Usuarios</span>
                </Nav.Link>
                <Nav.Link href="/trainings">
                    <FaBolt className='management-navbar-icon' />
                    <span>Entrenamientos</span>
                </Nav.Link>
                <Nav.Link href="/services">
                    <FaServer className='management-navbar-icon' />
                    <span>Servicios</span>
                </Nav.Link>
                <Nav.Link href="/metrics" id='management-navbar-last-link'>
                    <FaRegChartBar className='management-navbar-icon' />
                    <span>Métricas</span>
                </Nav.Link>
            </Nav>
        </>
    )
}