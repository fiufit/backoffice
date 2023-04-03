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
                    <Col className='d-flex justify-content-center align-items-center' md={12} lg={6} >
                        <img src="/login_desktop.png" alt="" id='login-img-welcome' />
                    </Col>
                    <Col className='d-flex justify-content-center align-items-center' md={12} lg={6} >
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