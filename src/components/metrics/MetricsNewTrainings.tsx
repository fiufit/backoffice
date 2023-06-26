import { Col, Container, Form, Row } from "react-bootstrap";
import FormGroupMetrics from '@components/recharts/FormGroupMetrics';
import { getTotalMetrics, getTotalMetricsDividedByDays } from "@services/metrics";
import { SimpleLineChartMetrics } from "@components/recharts/SimpleLineChartMetrics";
import { addDays, formatDateUTCSimple, getMonthName, sameUTCDay } from "@utils/dates";
import { ReactElement } from "react";

interface MetricsProps {
    fromDate: string,
    toDate: string
}

export default function MetricsBlockedUsers(props: MetricsProps) {

    const { fromDate, toDate } = props;
    let dataTrainingsGraphic: {
        name: string;
        value: number;
    }[] = [];
    
    const metricsTrainings = getTotalMetricsDividedByDays("new_training", "", fromDate, toDate);
    let startDate = new Date(fromDate);
    let endDate = new Date(toDate);
    let cursorDate = startDate;
    const totalNewTrainings = getTotalMetrics("new_training", "", fromDate, toDate);
    const allValuesAreZero = !(totalNewTrainings > 0);
    const oneDaySelected = sameUTCDay(startDate, endDate);
    let titleSimpleLineCharts = "";
    
    if (oneDaySelected) {
        titleSimpleLineCharts = "Cantidad de nuevos entrenamientos creados el "+cursorDate.getUTCDate()+" de "+getMonthName(cursorDate.getUTCMonth() + 1)+" de "+cursorDate.getUTCFullYear()+".";
    } else {

        titleSimpleLineCharts = "Cantidad de nuevos entrenamientos creados el "+cursorDate.getUTCDate()+" de "+getMonthName(cursorDate.getUTCMonth() + 1)+" de "+cursorDate.getUTCFullYear()+" y el "+endDate.getUTCDate()+" de "+getMonthName(endDate.getUTCMonth() + 1)+" de "+endDate.getUTCFullYear()+".";
        while (cursorDate < endDate) {

            let contDayNumber = 0;
            const totalMetricsTrainings = metricsTrainings.find((item: { date: Date; }) => sameUTCDay(item.date, cursorDate));
            
            if (totalMetricsTrainings) {
                dataTrainingsGraphic.push({name: formatDateUTCSimple(cursorDate), value: totalMetricsTrainings.total_metrics}); 
            } else {
                dataTrainingsGraphic.push({name: formatDateUTCSimple(cursorDate), value: 0});
            }
            
            cursorDate = addDays(cursorDate, 1);
            contDayNumber++;

        }
    }

    const renderGraphic = (): ReactElement<any, any> => {

        if (oneDaySelected) {
            if (allValuesAreZero) {
                return (<h4 className="text-center align-middle">No se detectaron nuevos entrenamientos creados en esta fecha.</h4>);
            }
        } else {
            return (<SimpleLineChartMetrics data={dataTrainingsGraphic} title="Nuevos entrenamientos creados" />);
        }

        return (<></>);
    };

    return (
        <Container>
            <Row>
                <h4 className='mb-3 mt-0 text-center'>{titleSimpleLineCharts}</h4>

                {
                    !(oneDaySelected && !allValuesAreZero) ? 
                        <Col className='mt-3'>
                            {renderGraphic()}
                        </Col>
                    : <></>
                }
                <Col className="mt-3">
                    <Form className="mx-auto">
                        <h4>Estadísticas</h4>
                        <Row>
                            <Col>
                                <FormGroupMetrics title='Total de nuevos entrenamientos creados' value={totalNewTrainings} />
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}