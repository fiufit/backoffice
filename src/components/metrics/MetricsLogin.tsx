import { Col, Container, Form, Row } from "react-bootstrap";
import BarChartMetrics from '@components/recharts/BarChartMetrics';
import PieChartsMetrics from '@components/recharts/PieChartsMetrics';
import FormGroupMetrics from '@components/recharts/FormGroupMetrics';

const dataLoginsGraphic = [
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
    { name: 'Mayo', value: 6690 },
    { name: 'Junio', value: 6190 },
];

export default function MetricsLogin() {
    return (
        <Container>
            <Row>
                <Col>
                    <h4 className='mb-3 mt-0 text-center '>Cantidad de usuarios logueados en los últimos 6 meses.</h4>
                    <BarChartMetrics data={dataLoginsGraphic} titleA="E-mail y contraseña" titleB="Identidad federada" />
                </Col>
                <Col>
                    <h4 className='mb-3 mt-0 text-center '>Comparación con el mes anterior</h4>
                    <PieChartsMetrics data={dataComparisonPreviousMonth} />
                </Col>
                <Col lg={12} xs={12} className="mt-3">
                    <h3 className='mb-2'>Estadísticas</h3>
                    <Form className="mx-auto">
                        <Row>
                            <Col>
                                <FormGroupMetrics title='Record histórico de usuarios logueados en 1 mes (e-mail y contraseña + identidad federada)' value='4800' />
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}