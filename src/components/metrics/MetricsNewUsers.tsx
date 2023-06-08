import { Col, Container, Form, Row } from "react-bootstrap";
import FormGroupMetrics from '@components/recharts/FormGroupMetrics';
import PieChartsMetrics from '@components/recharts/PieChartsMetrics';
import BarChartMetrics from '@components/recharts/BarChartMetrics';

const dataNewUsersGraphic = [
    {
        name: 'Enero',
        valueA: 4000,
        valueB: 2400,
    },
    {
        name: 'Febrero',
        valueA: 3000,
        valueB: 1398,
    },
    {
        name: 'Marzo',
        valueA: 2000,
        valueB: 5800,
    },
    {
        name: 'Abril',
        valueA: 2780,
        valueB: 3908,
    },
    {
        name: 'Mayo',
        valueA: 1890,
        valueB: 4800,
    },
    {
        name: 'Junio',
        valueA: 2390,
        valueB: 3800,
    }
];

const dataComparisonPreviousMonth = [
    { name: 'Mayo', value: 452 },
    { name: 'Junio', value: 337 },
];

export default function MetricsNewUsers() {
    return (
        <Container>
            <Row>
                <Col className='mt-3' >
                    <h4 className='mb-3 mt-0 text-center'>Cantidad de usuarios registrados en los últimos 6 meses.</h4>
                    <BarChartMetrics data={dataNewUsersGraphic} titleA="E-mail y contraseña" titleB="Identidad federada" />
                </Col>
                <Col className='mt-3' >
                    <h4 className='mb-3 mt-0 text-center'>Comparación con el mes anterior.</h4>
                    <PieChartsMetrics data={dataComparisonPreviousMonth} />
                </Col>
                <Col lg={12} xs={12} className="mt-3">
                    <h3 className='mb-2'>Estadísticas</h3>
                    <Form className="mx-auto">
                        <Row>
                            <Col>
                                <FormGroupMetrics title='Total de usuarios registrados con e-mail y contraseña' value="790" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroupMetrics title='Total de usuarios registrados de forma federada' value="340" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroupMetrics title='Total de usuarios registrados en FIUFIT' value="1130" />
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}