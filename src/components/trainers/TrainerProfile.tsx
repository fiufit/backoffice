import { Certificate, CertificateStatus, certificateIsApproved, certificateIsDenied, certificateIsPending, getStatusTranslation, toCertificateStatus, usePutUpdateUserCertificateStatusMutation } from "@services/users";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import { BiUserCheck, BiUserX } from 'react-icons/bi';
import { useState } from "react";
import Image from 'react-bootstrap/Image';
import { toLocalTimeString } from "@utils/utils";

interface UserProfileProps {
    certificate: Certificate,
}

export default function TrainerProfile(props: UserProfileProps) {

    const [certificate, setCertificate] = useState<Certificate>({ ...props.certificate });
    const user = certificate.User;
    const [updateCertificateStatus, updateCertificateStatusResult] = usePutUpdateUserCertificateStatusMutation();
    const [showAlertCertificateStatus, setShowAlertCertificateStatus] = useState(false);
    const [showAlertCertificateVariant, setShowAlertCertificateVariant ] = useState("");
    const [showAlertCertificateMessage, setShowAlertCertificateMessage ] = useState("");

    const handleNewStatus = async (newStatus: CertificateStatus) => {

        try {
            
            await updateCertificateStatus({ id: certificate.ID, status: newStatus.toString()});
            var newCertificate: Certificate = { ...certificate };
            newCertificate.Status = newStatus;
            setCertificate(newCertificate);
            setShowAlertCertificateMessage("Se ha modificado el estado de la solicitud satisfactoriamente!");
            setShowAlertCertificateVariant("success");
            setShowAlertCertificateStatus(true);

        } catch (err: any) {

            setShowAlertCertificateMessage(err);
            setShowAlertCertificateVariant("danger");
            setShowAlertCertificateStatus(true);

        }

    };

    return (
        <Container>
            <Row>
                <Col lg={3} className="mt-2">
                    <div className="mx-auto mb-2" style={{'height': '150px', 'width': '150px'}}>
                        <Image src={user.PictureUrl} className={'border w-100 h-100' + (user.Disabled ? ' img-to-grayscale' : '')} rounded loading="lazy" />
                    </div>
                    <div className="text-center">
                        {'Estado Usuario: ' + (user.Disabled ? 'Bloqueado ' : 'Activo ')} {user.Disabled ? <BiUserX /> : <BiUserCheck />} 
                    </div>
                </Col>
                <Col lg={9} className="mt-2">
                    <Row>
                        <Col>
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-2 me-4" controlId="formBasicEmail">
                                            <Form.Label className="mb-0 fw-bold">Nombre completo</Form.Label>
                                            <Form.Control type="Text" value={user.DisplayName} disabled readOnly/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-2" controlId="formBasicEmail">
                                            <Form.Label className="mb-0 fw-bold">Usuario</Form.Label>
                                            <Form.Control type="Text" value={user.Nickname} disabled readOnly/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-2 me-4" controlId="formBasicEmail">
                                            <Form.Label className="mb-0 fw-bold">ID de Entrenador</Form.Label>
                                            <Form.Control type="Text" value={certificate.UserID} disabled readOnly/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-2 me-4" controlId="formBasicEmail">
                                            <Form.Label className="mb-0 fw-bold">Fecha de solicitud</Form.Label>
                                            <Form.Control 
                                                type="Text" 
                                                value={toLocalTimeString(certificate.CreatedAt, 'es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })} 
                                                disabled
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                        <div className="fw-bold">Video de verificación</div>
                        </Col>
                        <Col>
                            <div className="ratio ratio-16x9">
                                <video controls width="100%" className="fiufit-video-trainers pt-4 pb-4" preload="none">
                                    <source src={certificate.VideoUrl} type="video/mp4" />
                                </video>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Form>
                            <Form.Group className="mb-2 me-4" controlId="formBasicEmail">
                                <Form.Label className="mb-0 fw-bold">Estado de solicitud</Form.Label>
                                <Form.Control as="select"  className={"form-select"} onChange={(event) => handleNewStatus(toCertificateStatus(event.currentTarget.value))} defaultValue={certificate.Status} disabled={certificateIsApproved(certificate.Status)}>
                                    <option value={CertificateStatus.Pending} selected={certificateIsPending(certificate.Status)}>Pendiente</option>
                                    <option value={CertificateStatus.Approved} selected={certificateIsApproved(certificate.Status)}>Aprobado</option>
                                    <option value={CertificateStatus.Denied} selected={certificateIsDenied(certificate.Status)}>Denegado</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Row>
                    <Row>
                        <Col>
                            <Alert show={showAlertCertificateStatus} onClose={() => setShowAlertCertificateStatus(false)} variant={showAlertCertificateVariant} className="alert mt-2" dismissible>
                                <p className='mb-0'>{showAlertCertificateMessage}</p>
                            </Alert>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}