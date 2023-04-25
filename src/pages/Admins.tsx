import Footer from "@components/Footer";
import Header from "@components/Header";
import CreateAdminModal from "@components/CreateAdminModal";
import EditAdminForm from "@components/home/EditAdminForm";
import SearchBarAdmins from "@components/home/SearchBarAdmins";
import Navbar from "@components/Navbar";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useAppDispatch } from "@app/hooks";
import { open } from '@state/createAdminModal';

export default function Admins() {
    const dispatch = useAppDispatch();
    const handleShow = () => dispatch(open());

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
                                <Button className="button--primary btn btn-primary align-self-center" style={{'width': "10%"}} onClick={handleShow}>Crear</Button>
                            </div>
                            <hr />
                            <div className="management-section-content">
                                <div id="management-section-admin-creation">
                                    <CreateAdminModal />
                                </div>
                                <div id="management-section-admin-edition">
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