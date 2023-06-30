import { Col, Container, Row } from 'react-bootstrap';
import Header from '@components/Header';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import TrainersContent from '@components/trainers/TrainersContent';


export default function Trainers() {
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
                        <TrainersContent />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}