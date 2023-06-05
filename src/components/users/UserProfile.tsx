import { User } from "@services/users";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { toLocalTimeString, toLocalDateString } from "@utils/utils";
import { BiUserCheck, BiUserX } from 'react-icons/bi';
import { usePostEnableUserMutation, useDeleteDisableUserMutation } from '@services/users';
import { useState } from "react";

interface UserProfileProps {
    user: User
}

enum Gender {
    Male = 'Masculino',
    Female = 'Femenino',
}

export default function UserProfile(props: UserProfileProps) {

    const [user, setUser] = useState<User>({ ...props.user });
    const [isLoading, setIsLoading] = useState(false);
    const [enable, enableResult ] = usePostEnableUserMutation();
    const [disable, disableResult ] = useDeleteDisableUserMutation();

    const handleEnable = async () => {

        try {
            
            setIsLoading(true);
            await enable(user.ID).unwrap();
            var newUser: User = { ...user };
            newUser.Disabled = false;
            setUser(newUser);

        } catch (err: any) {

            console.log(err);

        }

        setIsLoading(false);

    };

    const handleDisable = async () => {

        try {
            
            setIsLoading(true);
            await disable(user.ID).unwrap();
            var newUser: User = { ...user };
            newUser.Disabled = true;
            setUser(newUser);

        } catch (err: any) {

            console.log(err);
        }

        setIsLoading(false);

    };

    const getGender = (isMale: boolean) => {
        return isMale ? Gender.Male : Gender.Female;
    }

    return (
        <Container>
            <Row>
                <Col lg={3}>
                    <div className="mx-auto mb-2" style={{'height': '150px', 'width': '150px'}}>
                        <img className={'border rounded-circle w-100 h-100' + (user.Disabled ? ' img-to-grayscale' : '')} src={user.PictureUrl}></img>
                    </div>
                    <div className='text-center'>
                        ID (HDC)
                    </div>
                    <div className='text-center'>
                        Entrenador (HDC)
                    </div>
                    <div className="text-center">
                        {'Estado: ' + (user.Disabled ? 'Bloqueado ' : 'Activo ')} {user.Disabled ? <BiUserX /> : <BiUserCheck />} 
                    </div>
                </Col>
                <Col>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2 me-4" controlId="formBasicEmail">
                                    <Form.Label className="mb-0">Nombre completo</Form.Label>
                                    <Form.Control type="Text" value={user.DisplayName} readOnly/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label className="mb-0">Usuario</Form.Label>
                                    <Form.Control type="Text" value={user.Nickname} readOnly/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2 me-4" controlId="formBasicEmail">
                                    <Form.Label className="mb-0">Fecha de nacimiento</Form.Label>
                                    <Form.Control 
                                        type="Text" 
                                        value={toLocalDateString(user.BornAt, 'es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })} 
                                        readOnly/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="d-flex flex-column mb-2" controlId="formBasicEmail">
                                    <Form.Label className="mb-0">Sexo</Form.Label>
                                    <Form.Control type="Text" value={getGender(user.IsMale)} readOnly/>
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
                                    <Form.Label className="mb-0">Fecha de registro</Form.Label>
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
            <Row>
                <Col className="mx-auto text-center mt-3 mb-3">
                    {  
                        (user.Disabled) ? 

                        <button type="button" className="btn button--secondary font-large" onClick={() => handleEnable()}><b>Desbloquear </b>{ isLoading ? <Spinner animation='border' role='status' size='sm'></Spinner> : ""}</button> :

                        <button type="button" className="btn button--secondary font-large" onClick={() => handleDisable()}><b>Bloquear </b>{ isLoading ? <Spinner animation='border' role='status' size='sm'></Spinner> : ""}</button>
                    }
                </Col>
            </Row>
        </Container>
    )
}