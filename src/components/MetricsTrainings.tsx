import { Accordion } from "react-bootstrap";
import MetricsNewTrainings from "@components/metrics/MetricsNewTrainings";
import MetricsTrainingsPerType from "./metrics/MetricsTrainingsPerType";
import MetricsTrainingsContentPerUser from "./metrics/MetricsTrainingsContentPerUser";
import MetricsTrainingsTopUsers from "./metrics/MetricsTrainingsTopUsers";
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'react-day-picker/dist/style.css';
import { Col, Container, Row } from "react-bootstrap";
import { format } from "date-fns";
import { useState } from "react";

export default function MetricsUsers() {

    const [showMetricsNewTrainings, setShowMetricsNewTrainings] = useState(false);
    const [showMetricsTrainingsPerType, setShowMetricsTrainingsPerType] = useState(false);
    const [showMetricsTrainingsUsers, setShowMetricsTrainingsUsers] = useState(false);
    const [showMetricsTrainingsContentPerUser, setShowMetricsTrainingsContentPerUser] = useState(false);

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
            <Accordion className='pt-4' defaultActiveKey={"metrics-trainings"}>
                <Accordion.Item eventKey="metrics-trainings">
                    <Accordion.Header className="metrics-item">Entrenamientos</Accordion.Header>
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
                            <Accordion.Item eventKey="metrics-new-trainings">
                                <Accordion.Header onClick={() => {setShowMetricsNewTrainings(!showMetricsNewTrainings)}}>Nuevos entrenamientos</Accordion.Header>
                                { showMetricsNewTrainings && <Accordion.Body><MetricsNewTrainings fromDate={fromDate} toDate={toDate} /></Accordion.Body>}
                            </Accordion.Item>
                            <Accordion.Item eventKey="metrics-trainings-per-type">
                                <Accordion.Header onClick={() => {setShowMetricsTrainingsPerType(!showMetricsTrainingsPerType)}}>Entrenamientos por tipo</Accordion.Header>
                                { showMetricsTrainingsPerType && <Accordion.Body><MetricsTrainingsPerType fromDate={fromDate} toDate={toDate} /></Accordion.Body>}
                            </Accordion.Item>
                            <Accordion.Item eventKey="metrics-trainings-top-trainings-users">
                                <Accordion.Header onClick={() => {setShowMetricsTrainingsUsers(!showMetricsTrainingsUsers)}}>Usuarios</Accordion.Header>
                                { showMetricsTrainingsUsers && <Accordion.Body><MetricsTrainingsTopUsers fromDate={fromDate} toDate={toDate} /></Accordion.Body>}
                            </Accordion.Item>
                            <Accordion.Item eventKey="metrics-trainings-content-per-user">
                                <Accordion.Header onClick={() => {setShowMetricsTrainingsContentPerUser(!showMetricsTrainingsContentPerUser)}}>Contenido por usuario</Accordion.Header>
                                { showMetricsTrainingsContentPerUser && <Accordion.Body><MetricsTrainingsContentPerUser fromDate={fromDate} toDate={toDate} /></Accordion.Body>}
                            </Accordion.Item>
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}