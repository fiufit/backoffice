import FormGroupMetrics from "@components/recharts/FormGroupMetrics";
import PieChartsMetrics from "@components/recharts/PieChartsMetrics";
import { getTotalUsers } from "@services/metrics";
import { Col, Container, Form, Row } from "react-bootstrap";
import { getLastDayOfMonth, getMonthAndYearLessMonth } from "@utils/dates";

export default function MetricsBlockedUsers() {

    let dataComparisonPreviousMonth = [
        {
            name: "Activos",
            value: getTotalUsers("register")
        },
        {
            name: "Bloqueados",
            value: getTotalUsers("blocked")
        }
    ];

    return(
        <Container>
            <Row>
                <Col>
                    <h4 className='mb-0 mt-0 text-center '>Comparación total de usuarios activos vs. bloqueados.</h4>
                    <PieChartsMetrics data={dataComparisonPreviousMonth} />
                </Col>
                <Col lg={12} xs={12} className="mt-3">
                    <h3 className='mb-2'>Estadísticas</h3>
                    <Form className="mx-auto">
                        <Row>
                            <Col>
                                <FormGroupMetrics title="Total de usuarios bloqueados" value={getTotalUsers("blocked")} />
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}