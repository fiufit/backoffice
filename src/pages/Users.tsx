import { Col, Container, Row } from 'react-bootstrap';
import Footer from '@components/Footer';
import Header from '@components/Header';
import Navbar from '@components/Navbar';
import UserList from '@components/users/UserList';

export default function Users() {
    return (
        <>
            <Header />
            <Container className='d-flex flex-column flex-grow-1 py-4' fluid>
                <Row>
                    <Col lg={3}>
                        <div className='layout-navbar-lateral'>
                            <Navbar />
                        </div>
                    </Col>
                    <Col lg={9}>
                        <div className='management-section'>
                            <h1 className='management-section-title'>Usuarios</h1>
                            <hr />
                            <div className='management-section-content'>
                                <UserList />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}