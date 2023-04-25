import Footer from "@components/Footer";
import Header from "@components/Header";
import Navbar from "@components/Navbar";
import { Col, Container, Row } from "react-bootstrap";

export default function Services() {

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