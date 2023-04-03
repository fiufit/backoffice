import SearchBarUsers from '@components/management/SearchBarUsers';
import UserEditionCards from '@components/management/UserEditionCards';
import Footer from '@components/Footer';
import Header from '@components/Header';
import Navbar from '@components/Navbar';
import { Col, Container, Row } from 'react-bootstrap';

export default function Users() {

    return (
        <>
            <Header />
            <Container className='d-flex flex-column flex-grow-1 py-5' fluid>
                <Row>
                    <Col xs='auto' className='layout-navbar'>
                        <div className='layout-navbar'>
                            <Navbar />
                        </div>
                    </Col>
                    <Col>
                        <div className='management-section'>
                            <h1 className='management-section-title'>Panel de usuarios</h1>
                            <hr />
                            <div className='management-section-content'>
                                <SearchBarUsers />
                                <UserEditionCards />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}