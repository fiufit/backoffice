import { Col, Container, Form, Row } from "react-bootstrap";
import SimpleAreaChartMetrics from "@components/recharts/SimpleAreaChartMetrics";
import FormGroupMetrics from "@components/recharts/FormGroupMetrics";

const data = [
  {
    name: 'Enero',
    users: 3,
  },
  {
    name: 'Febrero',
    users: 5,
  },
  {
    name: 'Marzo',
    users: 6,
  },
  {
    name: 'Abril',
    users: 4,
  },
  {
    name: 'Mayo',
    users: 7,
  },
  {
    name: 'Junio',
    users: 5,
  }
];

export default function MetricsPassRecover() {
    return (
        <Container>
            <Row>
                <Col className="mt-3">
                    <h4 className='mb-3 mt-0 text-center'>Cantidad de usuarios que recuperaron su contraseña en los últimos 6 meses.</h4>
                    <SimpleAreaChartMetrics data={data} labelX="Mes" labelY="Total de usuarios" />
                </Col>
                <Col lg={12} xs={12} className="mt-3">
                    <h3 className='mb-2'>Estadísticas</h3>
                    <Form className="mx-auto">
                        <Row>
                            <Col>
                                <FormGroupMetrics title="Total de usuarios que recuperaron su contraseña" value="291" />
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}