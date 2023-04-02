import { Nav } from 'react-bootstrap';
import { FaEye, FaUser, FaRegChartBar, FaServer, FaBolt } from "react-icons/fa";

export default function Navbar() {
    return (
        <Nav activeKey={location.pathname} className="flex-column">
            <Nav.Link href="/management/admins" id='management-navbar-first-link'><FaEye className='management-navbar-icon' /> Administradores</Nav.Link>
            <Nav.Link href="/management/users"><FaUser className='management-navbar-icon' /> Usuarios</Nav.Link>
            <Nav.Link href="/management/trainings"><FaBolt className='management-navbar-icon' /> Entrenamientos</Nav.Link>
            <Nav.Link href="/management/services"><FaServer className='management-navbar-icon' /> Servicios</Nav.Link>
            <Nav.Link href="/management/metrics" id='management-navbar-last-link'><FaRegChartBar className='management-navbar-icon' /> Métricas</Nav.Link>
        </Nav>
    )
}