import { useState } from "react";
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'react-day-picker/dist/style.css';
import { Col, Container, Form, Row } from "react-bootstrap";
import { format } from "date-fns";
import FormGroupMetrics from "@components/recharts/FormGroupMetrics";
import { getTotalUsers } from "@services/metrics";

export default function MetricsByInterval() {

    dayjs.locale('es');
    const initialDays: Date[] = [];
    const [days, setDays] = useState<Date[] | undefined>(initialDays);
    const cant_days = (days) ? days.length : 0;
    let title = "Estadísticas";
    let footer = <div>Elige el día o el invervalo de días en el selector de fechas para obtener las estadísticas.</div>;
    let fromDate = "";
    let toDate = "";

    if (days) {

        // ordeno fechas seleccionadas
        days.sort((a: { getTime: () => number; }, b: { getTime: () => number; }) => a.getTime() - b.getTime());

        // cambio información en footer
        if (cant_days === 1) { 

            footer = <div>Has seleccionado el {format(days[0], 'PPP', { locale: es })} .</div> 
            title = "Estadísticas para el día "+format(days[0], 'PPP', { locale: es }); 
            fromDate = format(days[0], 'yyyy-MM-dd') + 'T' + format(days[0],'HH:mm:ss') + '.000Z';
            toDate = format(days[0], 'yyyy-MM-dd') + 'T23:59:59.999Z';
        }
        else if (cant_days === 2) { 
            
            footer = <div>Has seleccionado el intervalo entre el {format(days[0], 'PPP', { locale: es })} y el {format(days[1], 'PPP', { locale: es })}.</div> 
            title = "Estadísticas para el intervalo entre el "+format(days[0], 'PPP', { locale: es })+" y el "+format(days[1], 'PPP', { locale: es });
            fromDate = format(days[0], 'yyyy-MM-dd') + 'T00:00:00.000Z';
            toDate = format(days[1], 'yyyy-MM-dd') + 'T23:59:59.999Z';
        }

    }

    const totalUsersRegisterMail = (days) ? getTotalUsers("register", "mail", fromDate, toDate) : "";
    const totalUsersRegisterFederada = (days) ? getTotalUsers("register", "federated_entity", fromDate, toDate) : "";
    const totalUsersRegister = (days) ? getTotalUsers("register", "", fromDate, toDate) : "";
    const totalUsersLoginMail = (days) ? getTotalUsers("login", "mail", fromDate, toDate) : "";
    const totalUsersLoginFederada = (days) ? getTotalUsers("login", "federated_entity", fromDate, toDate) : "";
    const totalUsersLogin = (days) ? getTotalUsers("login", "", fromDate, toDate) : "";
    const totalUsersBlocked = (days) ? getTotalUsers("blocked", "", fromDate, toDate) : "";
    const totalUsersPassRecovered = (days) ? getTotalUsers("password_recover", "", fromDate, toDate) : "";

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
                { (cant_days > 0) ? 
                <Col> 

                    <div className='mt-2'>
                        <h3 className='mb-2'>{title}</h3>
                        <Form className="mx-auto">
                            <Row>
                                <Col>
                                    <FormGroupMetrics title="Total de usuarios registrados con e-mail y contraseña" value={totalUsersRegisterMail} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroupMetrics title="Total de usuarios registrados de forma federada" value={totalUsersRegisterFederada} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroupMetrics title="Total de usuarios registrados en FIUFIT" value={totalUsersRegister} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroupMetrics title="Total de usuarios logueados con e-mail y contraseña" value={totalUsersLoginMail} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroupMetrics title="Total de usuarios logueados de forma federada" value={totalUsersLoginFederada} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroupMetrics title="Total de usuarios logueados en FIUFIT" value={totalUsersLogin} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroupMetrics title="Total de usuarios bloqueados" value={totalUsersBlocked} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroupMetrics title="Total de usuarios que recuperaron su contraseña" value={totalUsersPassRecovered} />
                                </Col>
                            </Row>
                        </Form>
                    </div>

                </Col> 
                : <></> }
            </Row>
        </Container>
    )
}