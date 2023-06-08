import FormGroupMetrics from "@components/recharts/FormGroupMetrics";
import RadarChartMetrics from "@components/recharts/RadarChartMetrics";
import { Col, Container, Form, Row } from "react-bootstrap";

const data = [
  {
    subject: "América del Norte",
    users: 120,
  },
  {
    subject: "Asia",
    users: 98,
  },
  {
    subject: "África",
    users: 86,
  },
  {
    subject: "Latinoamérica",
    users: 99,
  },
  {
    subject: "Europa",
    users: 85,
  },
  {
    subject: "Oceanía",
    users: 65,
  }
];


export default function MetricsUsersLocation() {
    return (
        <Container>
            <Row>
                <Col>
                  <h3 className='mb-3 mt-0 text-center '>Cantidad de usuarios por zona geográfica</h3>
                  <RadarChartMetrics data={data} />
                </Col>
                <Col className="mt-3">
                  <h4 className='mb-2'>Porcentajes de usuarios según ubicación geográfica con respecto al total registrados</h4>
                  <Form className="mx-auto">
                      <Row>
                          <Col>
                            <FormGroupMetrics title="Latinoamérica" value="50%" />
                          </Col>
                      </Row>
                      <Row>
                          <Col>
                            <FormGroupMetrics title="América del Norte" value="10%" />
                          </Col>
                      </Row>
                        <Row>
                          <Col>
                            <FormGroupMetrics title="Europa" value="20%" />
                          </Col>
                      </Row>
                      <Row>
                          <Col>
                            <FormGroupMetrics title="Oceanía" value="10%" />
                          </Col>
                      </Row>
                        <Row>
                          <Col>
                            <FormGroupMetrics title="Asia" value="5%" />
                          </Col>
                      </Row>
                      <Row>
                          <Col>
                            <FormGroupMetrics title="África" value="5%" />
                          </Col>
                      </Row>
                  </Form>
                </Col>
            </Row>
        </Container>
    );
}