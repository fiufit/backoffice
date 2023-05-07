import { Col, Container, Pagination, Row } from 'react-bootstrap';
import Header from '@components/Header';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import UsersContent from '@components/users/UsersContent';

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
                        <UsersContent />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}