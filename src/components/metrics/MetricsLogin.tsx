import { Col, Container, Form, Row } from "react-bootstrap";
import FormGroupMetrics from '@components/recharts/FormGroupMetrics';
import { getTotalMetrics, getTotalMetricsDividedByDays } from "@services/metrics";
import { DobleLineChartMetrics } from "@components/recharts/DobleLineChartMetrics";
import { addDays, formatDateUTCSimple, getMonthName, sameUTCDay } from "@utils/dates";
import PieChartsMetrics from "@components/recharts/PieChartsMetrics";
import { ReactElement } from "react";

interface MetricsProps {
    fromDate: string,
    toDate: string
}

export default function MetricsNewUsers(props: MetricsProps) {

    const { fromDate, toDate } = props;
    let dataLoginUsersGraphic: {
        name: string;
        valueA: number;
        valueB: number;
    }[] = [];
    
    const metricsUsersLoginEmail = getTotalMetricsDividedByDays("login", "mail", fromDate, toDate);
    const metricsUsersFederatedEntity = getTotalMetricsDividedByDays("login", "federated_entity", fromDate, toDate);
    let startDate = new Date(fromDate);
    let endDate = new Date(toDate);
    let cursorDate = startDate;
    const totalUsersEmail = getTotalMetrics("login", "mail", fromDate, toDate);
    const totalUsersFederated = getTotalMetrics("login", "federated_entity", fromDate, toDate);
    const totalUsers = totalUsersEmail + totalUsersFederated;
    const allValuesAreZero = !(totalUsers > 0);
    let dataComparisonOneDay: {
        name: string;
        value: number;
    }[] = [];
    const oneDaySelected = sameUTCDay(startDate, endDate);
    let titleSimpleLineCharts = "";
    
    if (oneDaySelected) {
        
        titleSimpleLineCharts = "Cantidad de usuarios logueados el "+cursorDate.getUTCDate()+" de "+getMonthName(cursorDate.getUTCMonth() + 1)+" de "+cursorDate.getUTCFullYear()+".";
        dataComparisonOneDay.push({ name: "E-mail y contraseña", value: totalUsersEmail });
        dataComparisonOneDay.push({ name: "Identidad Federada", value: totalUsersFederated });

    } else {

        titleSimpleLineCharts = "Cantidad de usuarios logueados entre el "+cursorDate.getUTCDate()+" de "+getMonthName(cursorDate.getUTCMonth() + 1)+" de "+cursorDate.getUTCFullYear()+" y el "+endDate.getUTCDate()+" de "+getMonthName(endDate.getUTCMonth() + 1)+" de "+endDate.getUTCFullYear()+".";
        while (cursorDate < endDate) {

            let contDayNumber = 0;
            const totalMetricsUsersLoginEmail = metricsUsersLoginEmail.find((item: { date: Date; }) => sameUTCDay(item.date, cursorDate));
            const totalMetricsUsersFederatedEntity = metricsUsersFederatedEntity.find((item: { date: Date; }) => sameUTCDay(item.date, cursorDate));
            
            if (totalMetricsUsersFederatedEntity && totalMetricsUsersLoginEmail) {
                dataLoginUsersGraphic.push({name: formatDateUTCSimple(cursorDate), valueA: totalMetricsUsersLoginEmail.total_metrics, valueB: totalMetricsUsersFederatedEntity.total_metrics}); 
            } else {
                dataLoginUsersGraphic.push({name: formatDateUTCSimple(cursorDate), valueA: 0, valueB: 0});
            }
            
            cursorDate = addDays(cursorDate, 1);
            contDayNumber++;

        }
    }

    const renderGraphic = (): ReactElement<any, any> => {

        if (oneDaySelected) {
            if (!allValuesAreZero ){
                return (<PieChartsMetrics data={dataComparisonOneDay} allValuesAreZero={allValuesAreZero} />);
            } else {
                return (<h4 className="text-center align-middle">No se detectaron inicios de sesión en esta fecha.</h4>);
            }
        } else {
            return (<DobleLineChartMetrics data={dataLoginUsersGraphic} titleA="E-mail y contraseña" titleB="Identidad federada" />);
        }

    };

    return (
        <Container>
            <Row>
                <h4 className='mb-3 mt-0 text-center'>{titleSimpleLineCharts}</h4>
                <Col className='mt-3'>
                    {renderGraphic()}
                </Col>
                <Col className="mt-3">
                    <Form className="mx-auto">
                        <h4>Estadísticas</h4>
                        <Row>
                            <Col>
                                <FormGroupMetrics title='Total de usuarios logueados con e-mail y contraseña' value={totalUsersEmail} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroupMetrics title='Total de usuarios logueados de forma federada' value={totalUsersFederated} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroupMetrics title='Total de usuarios logueados en FIUFIT' value={totalUsers} />
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}