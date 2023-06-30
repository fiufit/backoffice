import { User } from "@services/users";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { toLocalTimeString, toLocalDateString } from "@utils/utils";
import { BiUserCheck, BiUserX } from 'react-icons/bi';
import { usePostEnableUserMutation, useDeleteDisableUserMutation } from '@services/users';
import { useState } from "react";
import Image from 'react-bootstrap/Image';

interface UserProfileProps {
    user: User,
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
                        <Image src={user.PictureUrl} className={'border w-100 h-100' + (user.Disabled ? ' img-to-grayscale' : '')} rounded loading="lazy" />
                    </div>
                    <div className="text-center">
                        {'Estado: ' + (user.Disabled ? 'Bloqueado ' : 'Activo ')} {user.Disabled ? <BiUserX /> : <BiUserCheck />} 
                    </div>
                </Col>
                <Col>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2 me-4" controlId="formBasicName">
                                    <Form.Label className="mb-0 fw-bold">Nombre completo</Form.Label>
                                    <Form.Control type="Text" value={user.DisplayName} disabled readOnly/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2" controlId="formBasicUser">
                                    <Form.Label className="mb-0 fw-bold">Usuario</Form.Label>
                                    <Form.Control type="Text" value={user.Nickname} disabled readOnly/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2 me-4" controlId="formBasicBirthday">
                                    <Form.Label className="mb-0 fw-bold">Fecha de nacimiento</Form.Label>
                                    <Form.Control 
                                        type="Text" 
                                        value={toLocalDateString(user.BornAt, 'es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })} 
                                        disabled
                                        readOnly/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="d-flex flex-column mb-2" controlId="formBasicGender">
                                    <Form.Label className="mb-0 fw-bold">Sexo</Form.Label>
                                    <Form.Control type="Text" value={getGender(user.IsMale)} disabled readOnly/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2 me-4" controlId="formBasicHeight">
                                    <Form.Label className="mb-0 fw-bold">Altura</Form.Label>
                                    <Form.Control type="Text" value={`${user.Height} cm`} disabled readOnly/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="d-flex flex-column mb-2" controlId="formBasicWeight">
                                    <Form.Label className="mb-0 fw-bold">Peso</Form.Label>
                                    <Form.Control type="Text" value={`${user.Weight} kg`} disabled readOnly/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2" controlId="formBasicID">
                                    <Form.Label className="mb-0 fw-bold">ID</Form.Label>
                                    <Form.Control type="Text" value={user.ID} disabled readOnly/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2" controlId="formBasicRegisterDate">
                                    <Form.Label className="mb-0 fw-bold">Fecha de registro</Form.Label>
                                    <Form.Control 
                                        type="Text" 
                                        value={toLocalTimeString(user.CreatedAt, 'es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', weekday: 'long' })} 
                                        disabled
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