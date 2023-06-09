import FormGroupMetrics from "@components/recharts/FormGroupMetrics";
import RadarChartMetrics from "@components/recharts/RadarChartMetrics";
import { getLocations } from "@services/metrics";
import { getPercentage } from "@utils/utils";
import { Col, Container, Form, Row } from "react-bootstrap";

export default function MetricsUsersLocation() {

  let dataMetricsUsersLocations: { subject: string, users: number }[] = [];
  let totalSets = 0;
  let totalUsers: { [subject: string]: number } = {
    "Latinoamérica": 0,
    "América del Norte": 0,
    "Asia": 0,
    "Oceanía": 0,
    "África": 0,
    "Europa": 0
};
  const locations = getLocations();

  locations.forEach(function(value, key) {  
    dataMetricsUsersLocations.push({ subject: value.continent, users: value.sets });
    totalSets = totalSets + value.sets;
    if (totalUsers[value.continent] === 0) totalUsers[value.continent] = value.sets;
  })

    return (
        <Container>
            <Row>
                <Col>
                  <h3 className='mb-3 mt-0 text-center '>Cantidad de usuarios por zona geográfica</h3>
                  <RadarChartMetrics data={dataMetricsUsersLocations} />
                </Col>
                <Col className="mt-3">
                  <h4 className='mb-2'>Porcentajes de usuarios según ubicación geográfica con respecto al total registrados</h4>
                  <Form className="mx-auto">
                      <Row>
                          <Col>
                            <FormGroupMetrics title="Latinoamérica" value={getPercentage(totalUsers["Latinoamérica"], totalSets)} />
                          </Col>
                      </Row>
                      <Row>
                          <Col>
                            <FormGroupMetrics title="América del Norte" value={getPercentage(totalUsers["América del Norte"], totalSets)} />
                          </Col>
                      </Row>
                        <Row>
                          <Col>
                            <FormGroupMetrics title="Europa" value={getPercentage(totalUsers["Europa"], totalSets)} />
                          </Col>
                      </Row>
                      <Row>
                          <Col>
                            <FormGroupMetrics title="Oceanía" value={getPercentage(totalUsers["Oceanía"], totalSets)} />
                          </Col>
                      </Row>
                        <Row>
                          <Col>
                            <FormGroupMetrics title="Asia" value={getPercentage(totalUsers["Asia"], totalSets)} />
                          </Col>
                      </Row>
                      <Row>
                          <Col>
                            <FormGroupMetrics title="África" value={getPercentage(totalUsers["África"], totalSets)} />
                          </Col>
                      </Row>
                  </Form>
                </Col>
            </Row>
        </Container>
    );
}