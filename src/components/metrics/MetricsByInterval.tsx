import { useState } from "react";
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'react-day-picker/dist/style.css';
import { Col, Container, Form, Row } from "react-bootstrap";
import { format } from "date-fns";

function metricsFor(days: Date[] | undefined) {
    
    var title = "Estadísticas";
    if (days) {
        const cant_days = days.length;
        if (cant_days === 1) { title = "Estadísticas para el día "+format(days[0], 'PPP', { locale: es }); }
        else if (cant_days === 2) { title = "Estadísticas para el intervalo entre el "+format(days[0], 'PPP', { locale: es })+" y el "+format(days[1], 'PPP', { locale: es });}
    }

    return (
        <div className='mt-2'>
            <h3 className='mb-2'>{title}</h3>
            <Form className="mx-auto">
                <Row>
                    <Col>
                        <Form.Group className="mb-2" controlId="formTotalUsersClassic">
                            <Form.Label className="mb-0">Total de usuarios registrados con e-mail y contraseña</Form.Label>
                            <Form.Control type="text" id="users-total-clasica" aria-label="users-total-clasica" disabled value="790" readOnly />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-2">
                            <Form.Label className="mb-0">Total de usuarios registrados de forma federada</Form.Label>
                            <Form.Control type="text" id="users-total-federada" aria-label="users-total-federada" disabled value="340" readOnly />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-2">
                            <Form.Label className="mb-0">Total de usuarios registrados en FIUFIT</Form.Label>
                            <Form.Control type="text" id="users-total-register" aria-label="users-total-register" disabled value="1130" readOnly />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-2" controlId="formTotalUsersClassic">
                            <Form.Label className="mb-0">Total de usuarios logueados con e-mail y contraseña</Form.Label>
                            <Form.Control type="text" id="users-login-clasica" aria-label="users-login-clasica" disabled value="457" readOnly />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-2">
                            <Form.Label className="mb-0">Total de usuarios logueados de forma federada</Form.Label>
                            <Form.Control type="text" id="users-login-federada" aria-label="users-login-federada" disabled value="214" readOnly />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-2">
                            <Form.Label className="mb-0">Total de usuarios logueados en FIUFIT</Form.Label>
                            <Form.Control type="text" id="users-login-register" aria-label="users-login-register" disabled value="671" readOnly />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-2">
                            <Form.Label className="mb-0">Total de usuarios bloqueados</Form.Label>
                            <Form.Control type="text" id="users-login-register" aria-label="users-login-register" disabled value="234" readOnly />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-2">
                            <Form.Label className="mb-0">Total de usuarios que recuperaron su contraseña</Form.Label>
                            <Form.Control type="text" id="users-recover-pass" aria-label="users-recover-pass" disabled value="132" readOnly />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default function MetricsByInterval() {

    dayjs.locale('es');
    const initialDays: Date[] = [];
    const [days, setDays] = useState<Date[] | undefined>(initialDays);
    const cant_days = (days) ? days.length : 0;
    let footer = <div>Elige el día o el invervalo de días en el selector de fechas para obtener las estadísticas.</div>;

    if (days) {

        // ordeno fechas seleccionadas
        days.sort((a: { getTime: () => number; }, b: { getTime: () => number; }) => a.getTime() - b.getTime());

        // cambio información en footer
        if (cant_days === 1) { footer = <div>Has seleccionado el {format(days[0], 'PPP', { locale: es })} .</div> }
        else if (cant_days === 2) { footer = <div>Has seleccionado el intervalo entre el {format(days[0], 'PPP', { locale: es })} y el {format(days[1], 'PPP', { locale: es })}.</div> }

    }

    return (
    <Container>
        <Row>
            <Col>
                <div className='mt-2'>
                    <h3>Selecciona el día/intervalo</h3>
                    <DayPicker
                        mode="multiple"
                        min={0}
                        max={2}
                        selected={days}
                        onSelect={setDays}
                        footer={footer}
                        locale={es}

                    />
                </div>
            </Col>
            { (cant_days > 0) ? <Col> { metricsFor(days) } </Col> : <></> }
        </Row>
    </Container>
    )
}