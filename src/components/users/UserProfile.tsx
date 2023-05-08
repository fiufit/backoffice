import { User } from "@services/users";
import { Col, Container, Form, Row } from "react-bootstrap";

interface UserProfileProps {
    user: User
}

export default function UserProfile(props: UserProfileProps) {
    const { user } = props;

    const toLocalDateString = (date: string, locales: Intl.LocalesArgument, options: Intl.DateTimeFormatOptions) => {
        return new Date(date).toLocaleDateString(locales, options);
    }

    const toLocalTimeString = (date: string, locales: Intl.LocalesArgument, options: Intl.DateTimeFormatOptions) => {
        return new Date(date).toLocaleTimeString(locales, options);
    }

    return (
        <Container>
            <Row>
                <Col lg={3}>
                    <div className="mx-auto mb-2" style={{'height': '150px', 'width': '150px'}}>
                        <img className='border rounded-circle w-100 h-100' src={user.PictureUrl}></img>
                    </div>
                    <div className='text-center'>
                        ID (HDC)
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
                                    <Form.Control type="Text" value={user.DisplayName} readOnly/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label className="mb-0">Nombre de Usuario</Form.Label>
                                    <Form.Control type="Text" value={user.Nickname} readOnly/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2 me-4" controlId="formBasicEmail">
                                    <Form.Label className="mb-0">Fecha de Nacimiento</Form.Label>
                                    <Form.Control 
                                        type="Text" 
                                        value={toLocalDateString(user.BornAt, 'es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })} 
                                        readOnly/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="d-flex flex-column mb-2" controlId="formBasicEmail">
                                    <Form.Label className="mb-0">Sexo</Form.Label>
                                    <Form.Control type="Text" value={user.IsMale ? 'Masculino' : 'Femenino'} readOnly/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2 me-4" controlId="formBasicEmail">
                                    <Form.Label className="mb-0">Altura</Form.Label>
                                    <Form.Control type="Text" value={`${user.Height} cm`} readOnly/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="d-flex flex-column mb-2" controlId="formBasicEmail">
                                    <Form.Label className="mb-0">Peso</Form.Label>
                                    <Form.Control type="Text" value={`${user.Weight} kg`} readOnly/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={{ span: 6, offset: 6 }}>
                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label className="mb-0">Fecha de creación</Form.Label>
                                    <Form.Control 
                                        type="Text" 
                                        value={toLocalTimeString(user.CreatedAt, 'es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', weekday: 'long' })} 
                                        readOnly/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}