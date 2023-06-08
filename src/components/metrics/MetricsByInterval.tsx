import { useState } from "react";
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'react-day-picker/dist/style.css';
import { Col, Container, Form, Row } from "react-bootstrap";
import { format } from "date-fns";
import FormGroupMetrics from "@components/recharts/FormGroupMetrics";

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
                        <FormGroupMetrics title="Total de usuarios registrados con e-mail y contraseña" value="790" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroupMetrics title="Total de usuarios registrados de forma federada" value="340" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroupMetrics title="Total de usuarios registrados en FIUFIT" value="1130" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroupMetrics title="Total de usuarios logueados con e-mail y contraseña" value="457" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroupMetrics title="Total de usuarios logueados de forma federada" value="214" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroupMetrics title="Total de usuarios logueados en FIUFIT" value="671" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroupMetrics title="Total de usuarios bloqueados" value="234" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroupMetrics title="Total de usuarios que recuperaron su contraseña" value="132" />
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