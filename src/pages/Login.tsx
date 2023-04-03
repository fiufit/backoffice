import Header from '@components/Header';
import Footer from '@components/Footer';
import LoginForm from '@components/LoginForm';
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