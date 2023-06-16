import Footer from "@components/Footer";
import Header from "@components/Header";
import Navbar from "@components/Navbar";
import { Col, Container, Row } from "react-bootstrap";
import CreateAdminForm from "@components/admins/CreateAdminForm";

export default function Admins() {

    return (
        <>
            <Header />
            <Container className='d-flex flex-column flex-grow-1 py-4' fluid>
                <Row>
                    <Col lg={3}>
                        <div className="layout-navbar-lateral">
                            <Navbar />  
                        </div>
                    </Col>

                    <Col lg={9}>
                        <div className="management-section">
                            <div className="d-flex">
                                <h1 className="management-section-title me-auto">Administradores</h1>
                            </div>
                            <hr />
                            <div className="management-section-content">
                                <h2>Crear administrador</h2>
                                <div id="management-section-admin-creation">
                                    <CreateAdminForm />
                                </div>
                            </div>
                        </div> 
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}