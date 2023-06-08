import FormGroupMetrics from "@components/recharts/FormGroupMetrics";
import PieChartsMetrics from "@components/recharts/PieChartsMetrics";
import { Col, Container, Form, Row } from "react-bootstrap";

const data = [
    { name: 'Activos', value: 537 },
    { name: 'Bloqueados', value: 312 },
];

export default function MetricsBlockedUsers() {
    return(
        <Container>
            <Row>
                <Col>
                    <h4 className='mb-0 mt-0 text-center '>Comparación con el total de usuarios.</h4>
                    <PieChartsMetrics data={data} />
                </Col>
                <Col lg={12} xs={12} className="mt-3">
                    <h3 className='mb-2'>Estadísticas</h3>
                    <Form className="mx-auto">
                        <Row>
                            <Col>
                                <FormGroupMetrics title="Total de usuarios bloqueados" value="312" />
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}