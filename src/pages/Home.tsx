import Footer from "@components/Footer";
import Header from "@components/Header";
import Navbar from "@components/Navbar";
import { Col, Container, Row } from "react-bootstrap";
import Admins from "./Admins";

export default function Home() {
    return (
        <>
            <Header />
            <Container className='d-flex flex-column justify-content-center flex-grow-1 py-5' fluid>
                <Row className='h-100'>
                    <Col xs='auto'>
                        <Navbar />
                    </Col>

                    <Col>
                        <Admins />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}