import Footer from "@components/Footer";
import Header from "@components/Header";
import Navbar from "@components/Navbar";
import { Col, Container, Row } from "react-bootstrap";

export default function Services() {

    return (
        <>
            <Header />
            <Container className='d-flex flex-column flex-grow-1 py-4' fluid>
                <Row className="section-home">
                    <Col md='auto' className="mx-auto">
                        <div className='layout-navbar-lateral'>
                            <Navbar />
                        </div>
                    </Col>
                    <Col md='auto' className="mx-auto">
                        <div className="management-section">
                            <h1 className="management-section-title">Panel de servicios</h1>
                            <hr />
                            <div className="management-section-content">

                            </div>
                        </div> 
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
    
}