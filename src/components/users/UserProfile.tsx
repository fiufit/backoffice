import { Col, Container, Form, Row } from "react-bootstrap";

export default function UserProfile() {
    return (
        <Container>
            <Row>
                <Col lg={3}>
                    <div className='border rounded-circle mx-auto mb-2' style={{'height': '150px', 'width': '150px'}}>
                    </div>
                    <div className='text-center'>
                        ID
                    </div>
                    <div className='text-center'>
                        Entrenador (HDC)
                    </div>
                </Col>
                <Col>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2 me-4" controlId="formBasicEmail">
                                    <Form.Label className="mb-0">Nombre Completo</Form.Label>
                                    <Form.Control type="Text" value={'Daniel Lovera'} readOnly/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label className="mb-0">Nombre de Usuario</Form.Label>
                                    <Form.Control type="Text" value={'Danilo'} readOnly/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2 me-4" controlId="formBasicEmail">
                                    <Form.Label className="mb-0">Fecha de Nacimiento</Form.Label>
                                    <Form.Control type="Text" value={'24/01/1997'} readOnly/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="d-flex flex-column mb-2" controlId="formBasicEmail">
                                    <Form.Label className="mb-0">Sexo</Form.Label>
                                    <Form.Control type="Text" value={'Masculino'} readOnly/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2 me-4" controlId="formBasicEmail">
                                    <Form.Label className="mb-0">Altura</Form.Label>
                                    <Form.Control type="Text" value={'1,75 m'} readOnly/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="d-flex flex-column mb-2" controlId="formBasicEmail">
                                    <Form.Label className="mb-0">Peso</Form.Label>
                                    <Form.Control type="Text" value={'78 kg'} readOnly/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={{ span: 6, offset: 6 }}>
                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label className="mb-0">Fecha de creación</Form.Label>
                                    <Form.Control type="Text" value={'05/07/2023'} readOnly/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}