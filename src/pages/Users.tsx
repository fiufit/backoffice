import SearchBarUsers from "@components/management/SearchBarUsers";
import UserEditionCards from "@components/management/UserEditionCards";
import Footer from "@components/Footer";
import Header from "@components/Header";
import Navbar from "@components/Navbar";
import { Col, Container, Row } from "react-bootstrap";

export default function Users() {

    return (
        <>
            <Header />
            <Container className='d-flex flex-column justify-content-center flex-grow-1 py-5' fluid>
                <Row className='h-100'>
                    <Col xs='auto'>
                        <Navbar />
                    </Col>
                    <Col>
                        <div className="management-section">
                            <h1 className="management-section-title">Panel de usuarios</h1>
                            <hr />
                            <div className="management-section-content">
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