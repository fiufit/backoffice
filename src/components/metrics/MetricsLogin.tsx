import { Col, Container, Form, Row } from "react-bootstrap";
import BarChartMetrics from '@components/recharts/BarChartMetrics';
import FormGroupMetrics from '@components/recharts/FormGroupMetrics';
import { getTotalUsers } from "@services/metrics";
import { getLastDayOfMonth, getMonthAndYearLessMonth, getMonthName } from "@utils/dates";

export default function MetricsLogin() {

    let dataLoginsGraphic = [];
    let cantMesesAMostrar = 6;
    
    for (var i = cantMesesAMostrar; i > 0; i--) {

        const { year, month } = getMonthAndYearLessMonth(i - 1);
        const monthFormatted = (month < 9) ? "0"+(month + 1).toString() : (month + 1).toString();
        const lastDay = getLastDayOfMonth(year, month + 1);
        const fromDate = year + '-' + monthFormatted + '-01T00:00:00.000Z';
        const to = year + '-' + monthFormatted + '-' + lastDay  + 'T23:59:59.999Z';

        // obtengo datos de todos los meses
        dataLoginsGraphic.push(
            {
                name: getMonthName(month+1),
                valueA: getTotalUsers("login", "mail", fromDate, to),
                valueB: getTotalUsers("login", "federated_entity", fromDate, to),
            }
        )

    }

    return (
        <Container>
            <Row>
                <Col>
                    <h4 className='mb-3 mt-0 text-center '>Cantidad de usuarios logueados en los últimos 6 meses.</h4>
                    <BarChartMetrics data={dataLoginsGraphic} titleA="E-mail y contraseña" titleB="Identidad federada" />
                </Col>
                <Col className="mt-3">
                    <h3 className='mb-2'>Estadísticas</h3>
                    <Form className="mx-auto">
                        <Row>
                            <Col>
                                <FormGroupMetrics title='Total de usuarios logueados con e-mail y contraseña' value={getTotalUsers("login", "mail")} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroupMetrics title='Total de usuarios logueados de forma federada' value={getTotalUsers("login", "federated_entity")} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroupMetrics title='Total de usuarios logueados en FIUFIT' value={getTotalUsers("login")} />
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}