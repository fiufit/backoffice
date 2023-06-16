import Footer from '@components/Footer';
import Header from '@components/Header';
import MetricsUsers from '@components/MetricsUsers';
import MetricsTrainings from '@components/MetricsTrainings';
import Navbar from '@components/Navbar';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';

export default function Metrics() {

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
                            <h1 className='management-section-title'>Métricas</h1>
                            <hr />
                            <div className='management-section-content'>
                                <div id='management-section-metrics'>
                                    <MetricsUsers />
                                    <MetricsTrainings />
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