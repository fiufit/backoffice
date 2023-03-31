import LoginForm from '@features/LoginForm';
import { Row, Container, Col } from 'react-bootstrap';

export default function Login() {

    return (
        <Container className='py-5' fluid>
            <Row>
                <Col>
                    IMAGEN QUE ACOMPANE
                </Col>
                <Col className='d-flex justify-content-center'>
                    <div className='pe-5 w-75'>
                        <LoginForm />
                    </div>
                </Col>
            </Row>
        </Container>
    )
};