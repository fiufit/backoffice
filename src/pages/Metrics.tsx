import Footer from '@components/Footer';
import Header from '@components/Header';
import Navbar from '@components/Navbar';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';

export default function Metrics() {

    return (
        <>
            <Header />
            <Container className='d-flex flex-column flex-grow-1 py-5' fluid>
                <Row>
                    <Col xs='auto'>
                        <div className='layout-navbar'>
                            <Navbar />
                        </div>
                    </Col>
                    <Col>
                        <div className='management-section'>
                            <h1 className='management-section-title'>Panel de métricas</h1>
                            <hr />
                            <div className='management-section-content'>
                                <div id='management-section-metrics'>
                                </div>
                            </div>
                        </div> 
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
};