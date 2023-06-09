import { Col, Container, Form, Row } from "react-bootstrap";
import SimpleAreaChartMetrics from "@components/recharts/SimpleAreaChartMetrics";
import FormGroupMetrics from "@components/recharts/FormGroupMetrics";
import { getTotalUsers } from "@services/metrics";
import { getLastDayOfMonth, getMonthAndYearLessMonth, getMonthName } from "@utils/dates";

export default function MetricsPassRecover() {

  let dataPassRecover = [];
  let cantMesesAMostrar = 6;

  for (var i = cantMesesAMostrar; i > 0; i--) {

      const { year, month } = getMonthAndYearLessMonth(i - 1);
      const monthFormatted = (month < 9) ? "0"+(month + 1).toString() : (month + 1).toString();
      const lastDay = getLastDayOfMonth(year, month + 1);
      const fromDate = year + '-' + monthFormatted + '-01T00:00:00.000Z';
      const to = year + '-' + monthFormatted + '-' + lastDay  + 'T23:59:59.999Z';

      // obtengo datos de todos los meses
      dataPassRecover.push(
          {
              name: getMonthName(month+1),
              users: getTotalUsers("password_recover", "", fromDate, to),
          }
      )

  }

  return (
      <Container>
          <Row>
              <Col className="mt-3">
                  <h4 className='mb-3 mt-0 text-center'>Cantidad de usuarios que recuperaron su contraseña en los últimos 6 meses.</h4>
                  <SimpleAreaChartMetrics data={dataPassRecover} labelX="Mes" labelY="Total de usuarios" />
              </Col>
              <Col lg={12} xs={12} className="mt-3">
                  <h3 className='mb-2'>Estadísticas</h3>
                  <Form className="mx-auto">
                      <Row>
                          <Col>
                              <FormGroupMetrics title="Total de usuarios que recuperaron su contraseña" value={getTotalUsers("password_recover")} />
                          </Col>
                      </Row>
                  </Form>
              </Col>
          </Row>
      </Container>
  );
}