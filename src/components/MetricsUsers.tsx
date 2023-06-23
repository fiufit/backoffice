import { Accordion } from "react-bootstrap";
import MetricsNewUsers from "@components/metrics/MetricsNewUsers";
import MetricsLogin from "@components/metrics/MetricsLogin";
import MetricsBlockedUsers from "@components/metrics/MetricsBlockedUsers";
import MetricsPassRecover from "@components/metrics/MetricsPassRecover";
import MetricsUsersLocation from "@components/metrics/MetricsUsersLocation";
import { useState } from "react";
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'react-day-picker/dist/style.css';
import { Col, Container, Row } from "react-bootstrap";
import { format } from "date-fns";

export default function MetricsUsers() {

    const [showMetricsNewUsers, setShowMetricsNewUsers] = useState(false);
    const [showMetricsLogin, setShowMetricsLogin] = useState(false);
    const [showMetricsBlocked, setShowMetricsBlocked] = useState(false);
    const [showMetricsPassRecover, setShowMetricsPassRecover] = useState(false);
    const [showMetricsUsersLocation, setShowMetricsUsersLocation] = useState(false);

    dayjs.locale('es');
    const initialDays: Date[] = [];
    const [days, setDays] = useState<Date[] | undefined>(initialDays);
    const cant_days = (days) ? days.length : 0;
    const todayDate = new Date(); // en caso de no seleccionar nada se mostrara la informacion mas actualizada de hoy
    let fromDate = format(todayDate, 'yyyy-MM-dd') + 'T00:00:00.000Z';
    let toDate = format(todayDate, 'yyyy-MM-dd') + 'T23:59:59.999Z';
    let footer = <div>Elige el día o el invervalo de días en el selector de fechas para obtener las estadísticas. En caso de no seleccionar ningún día, se mostrará la información más actualizada de hoy.</div>;

    if (days) {

        // ordeno fechas seleccionadas
        days.sort((a: { getTime: () => number; }, b: { getTime: () => number; }) => a.getTime() - b.getTime());

        // cambio información en footer
        if (cant_days === 1) { 

            footer = <div>Has seleccionado el {format(days[0], 'PPP', { locale: es })} .</div> 
            fromDate = format(days[0], 'yyyy-MM-dd') + 'T00:00:00.000Z';
            toDate = format(days[0], 'yyyy-MM-dd') + 'T23:59:59.999Z';
        }
        else if (cant_days === 2) { 
            
            footer = <div>Has seleccionado el intervalo entre el {format(days[0], 'PPP', { locale: es })} y el {format(days[1], 'PPP', { locale: es })}.</div> 
            fromDate = format(days[0], 'yyyy-MM-dd') + 'T00:00:00.000Z';
            toDate = format(days[1], 'yyyy-MM-dd') + 'T23:59:59.999Z';
        }

    }

    return (
        <div className="metrics-accordion">
            <Accordion className='pt-4' defaultActiveKey={"metrics-users"}>
                <Accordion.Item eventKey="metrics-users">
                    <Accordion.Header className="metrics-item">Usuarios</Accordion.Header>
                    <Accordion.Body className="pb-4">
                        <Container>
                            <Row>
                                <Col>
                                    <div className='mt-2'>
                                        <h3>Selecciona el día/intervalo a mostrar</h3>
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
                            </Row>
                        </Container>
                        <Accordion alwaysOpen>
                            <Accordion.Item eventKey="metrics-new-users">
                                <Accordion.Header onClick={() => {setShowMetricsNewUsers(!showMetricsNewUsers)}}>Nuevos usuarios</Accordion.Header>
                                <Accordion.Body>{ showMetricsNewUsers ? <MetricsNewUsers fromDate={fromDate} toDate={toDate} /> : <></>}</Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="metrics-login">
                                <Accordion.Header onClick={() => {setShowMetricsLogin(!showMetricsLogin)}}>Login</Accordion.Header>
                                <Accordion.Body>{ showMetricsLogin ? <MetricsLogin fromDate={fromDate} toDate={toDate} /> : <></>}</Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="metrics-blocked-users">
                                <Accordion.Header onClick={() => {setShowMetricsBlocked(!showMetricsBlocked)}}>Bloqueo de usuarios</Accordion.Header>
                                <Accordion.Body>{ showMetricsBlocked ? <MetricsBlockedUsers fromDate={fromDate} toDate={toDate} /> : <></> }</Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="metrics-pass-recover">
                                <Accordion.Header onClick={() => {setShowMetricsPassRecover(!showMetricsPassRecover)}}>Recupero de contraseña</Accordion.Header>
                                <Accordion.Body>{ showMetricsPassRecover ? <MetricsPassRecover fromDate={fromDate} toDate={toDate} /> : <></> }</Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="metrics-users-location">
                                <Accordion.Header onClick={() => {setShowMetricsUsersLocation(!showMetricsUsersLocation)}}>Ubicación de usuarios</Accordion.Header>
                                <Accordion.Body>{ showMetricsUsersLocation ? <MetricsUsersLocation fromDate={fromDate} toDate={toDate} /> : <></> }</Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}