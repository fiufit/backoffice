import { Nav, Container, Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import Brand from '@components/Brand';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { removeCredential, selectCredential } from '@state/credential';

export default function Header() {
    const { accessToken } = useAppSelector(selectCredential);
    const dispatch = useAppDispatch();

    const handleLogoutClick = () => {
        dispatch(removeCredential());
    }

    const logoutNavbar = () => {
        return (
            <Nav.Link className='py-2' as={Link} to='/'>
                <div className='text-white--primary d-flex align-items-center'>
                    <span className='fs-4'>BACK OFFICE</span>
                </div>
            </Nav.Link>
        );
    }

    const signinNavbar = () => {
        return (
            <Button onClick={handleLogoutClick}>Desconectarse</Button>
        );
    }

    return (
        <header className='bg-dark_blue--primary sticky-top shadow'>  
            <Navbar className='py-2'>
                <Container className='px-5' fluid>
                    <Navbar.Brand as={Link} to = { accessToken? "/admins" : '/'}>
                        <Brand />
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Item>
                            { accessToken ? signinNavbar() : logoutNavbar() }
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}
