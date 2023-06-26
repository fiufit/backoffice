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

export default function MetricsPassRecover(props: MetricsProps) {

    const { fromDate, toDate } = props;
    let dataPassRecoverGraphic: {
        name: string;
        value: number;
    }[] = [];
    
    const metricsUsersPassRecover = getTotalMetricsDividedByDays("password_recover", "", fromDate, toDate);
    let startDate = new Date(fromDate);
    let endDate = new Date(toDate);
    let cursorDate = startDate;
    const totalUsersPassRecover = getTotalMetrics("password_recover", "", fromDate, toDate);
    const allValuesAreZero = !(totalUsersPassRecover > 0);
    const oneDaySelected = sameUTCDay(startDate, endDate);
    let titleSimpleLineCharts = "";
    
    if (oneDaySelected) {
        
        titleSimpleLineCharts = "Cantidad de usuarios que recuperaron su contraseña el "+cursorDate.getUTCDate()+" de "+getMonthName(cursorDate.getUTCMonth() + 1)+" de "+cursorDate.getUTCFullYear()+".";

    } else {

        titleSimpleLineCharts = "Cantidad de usuarios que recuperaron su contraseña entre el "+cursorDate.getUTCDate()+" de "+getMonthName(cursorDate.getUTCMonth() + 1)+" de "+cursorDate.getUTCFullYear()+" y el "+endDate.getUTCDate()+" de "+getMonthName(endDate.getUTCMonth() + 1)+" de "+endDate.getUTCFullYear()+".";
        while (cursorDate < endDate) {

            let contDayNumber = 0;
            const totalMetricsUsersBlocked = metricsUsersPassRecover.find(item => sameUTCDay(item.date, cursorDate));
            
            if (totalMetricsUsersBlocked) {
                dataPassRecoverGraphic.push({name: formatDateUTCSimple(cursorDate), value: totalMetricsUsersBlocked.total_metrics}); 
            } else {
                dataPassRecoverGraphic.push({name: formatDateUTCSimple(cursorDate), value: 0});
            }
            
            cursorDate = addDays(cursorDate, 1);
            contDayNumber++;

        }
    }

    const renderGraphic = (): ReactElement<any, any> => {

        if (oneDaySelected) {
            if (allValuesAreZero) {
                return (<h4 className="text-center align-middle">No se detectaron recuperos de contraseña en esta fecha.</h4>);
            }
        } else {
            return (<SimpleLineChartMetrics data={dataPassRecoverGraphic} title="Usuarios que recuperaron su contraseña" />);
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
                                <FormGroupMetrics title='Total de usuarios que recuperaron su contraseña' value={totalUsersPassRecover} />
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}