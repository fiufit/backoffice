import { Col, Container, Form, Row } from "react-bootstrap";
import FormGroupMetrics from '@components/recharts/FormGroupMetrics';
import BarChartMetrics from '@components/recharts/BarChartMetrics';
import { getTotalUsers } from "@services/metrics";
import { getLastDayOfMonth, getMonthAndYearLessMonth, getMonthName } from "@utils/dates";

export default function MetricsNewUsers() {

    let dataNewUsersGraphic = [];
    let cantMesesAMostrar = 6;
    
    for (var i = cantMesesAMostrar; i > 0; i--) {

        const { year, month } = getMonthAndYearLessMonth(i - 1);
        const monthFormatted = (month < 9) ? "0"+(month + 1).toString() : (month + 1).toString();
        const lastDay = getLastDayOfMonth(year, month + 1);
        const fromDate = year + '-' + monthFormatted + '-01T00:00:00.000Z';
        const to = year + '-' + monthFormatted + '-' + lastDay  + 'T23:59:59.999Z';

        // obtengo datos de todos los meses
        dataNewUsersGraphic.push(
            {
                name: getMonthName(month+1),
                valueA: getTotalUsers("register", "mail", fromDate, to),
                valueB: getTotalUsers("register", "federated_entity", fromDate, to),
            }
        )

    }

    return (
        <Container>
            <Row>
                <Col className='mt-3' >
                    <h4 className='mb-3 mt-0 text-center'>Cantidad de usuarios registrados en los últimos 6 meses.</h4>
                    <BarChartMetrics data={dataNewUsersGraphic} titleA="E-mail y contraseña" titleB="Identidad federada" />
                </Col>
                <Col className="mt-3">
                    <h3 className='mb-2'>Estadísticas</h3>
                    <Form className="mx-auto">
                        <Row>
                            <Col>
                                <FormGroupMetrics title='Total de usuarios registrados con e-mail y contraseña' value={getTotalUsers("register", "mail")} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroupMetrics title='Total de usuarios registrados de forma federada' value={getTotalUsers("register", "federated_entity")} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroupMetrics title='Total de usuarios registrados en FIUFIT' value={getTotalUsers("register")} />
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}