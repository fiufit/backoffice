import Header from '@features/Header';
import Footer from '@features/Footer';
import LoginForm from '@features/LoginForm';
import { Row, Container, Col } from 'react-bootstrap';

export default function Login() {

    return (
        <>
            <Header />
            <Container className='d-flex flex-column justify-content-center flex-grow-1 py-5' fluid>
                <Row>
                    <Col className='d-flex justify-content-center align-items-center'>
                        <img src="/public/login_desktop.png" alt="" />
                    </Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                        <div className='pe-5 w-75'>
                            <LoginForm />
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
};