import Footer from "@components/Footer";
import Header from "@components/Header";
import CreateAdminForm from "@components/home/CreateAdminForm";
import EditAdminForm from "@components/home/EditAdminForm";
import SearchBarAdmins from "@components/home/SearchBarAdmins";
import Navbar from "@components/Navbar";
import { Col, Container, Row } from "react-bootstrap";

export default function Home() {
    return (
        <>
            <Header />
            <Container className='d-flex flex-column flex-grow-1 py-5' fluid>
                <Row>
                    <Col xs='auto'>
                        <div className="layout-navbar">
                            <Navbar />  
                        </div>
                    </Col>

                    <Col>
                        <div className="management-section">
                            <h1 className="management-section-title">Panel de administradores</h1>
                            <hr />
                            <div className="management-section-content">
                                <div id="management-section-admin-creation">
                                    <h2>Creación</h2>
                                    <CreateAdminForm />
                                </div>
                                <hr />
                                <div id="management-section-admin-edition">
                                    <h2>Edición</h2>
                                    <SearchBarAdmins />
                                    <EditAdminForm />
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