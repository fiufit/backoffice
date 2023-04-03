import { Nav, Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import Brand from '@components/Brand';

export default function Header() {
    return (
        <header className='bg-dark_blue--primary sticky-top shadow'>
            <Navbar className='py-2 navbar-fiufit'>
                <Container className='px-5' fluid>
                    <Navbar.Brand href='/'>
                        <Brand />
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link className='py-2' href='/admins'>
                                <div className='text-white--primary d-flex align-items-center'>
                                    <i className='bi bi-gear pe-2 fs-4'></i>
                                    <span className='fs-4'>BACK OFFICE</span>
                                </div>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}
