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
                <Row className='flex-grow-1'>
                    <Col lg={3}>
                        <div className='layout-navbar-lateral'>
                            <Navbar />
                        </div>
                    </Col>
                    <Col lg={9}>
                        <div className='h-100 d-flex flex-column management-section'>
                            <div>
                                <h1 className='management-section-title'>Usuarios</h1>
                                <hr />
                            </div>
                            <div className='management-section-content flex-grow-1'>
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