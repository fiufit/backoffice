import { Col, Container, Form, Row } from "react-bootstrap";
import FormGroupMetrics from '@components/recharts/FormGroupMetrics';
import { getTotalUsers, getTotalUsersDividedByDays } from "@services/metrics";
import { SimpleLineChartMetrics } from "@components/recharts/SimpleLineChartMetrics";
import { addDays, formatDateUTCSimple, getMonthName, sameUTCDay } from "@utils/dates";
import { ReactElement } from "react";

interface MetricsProps {
    fromDate: string,
    toDate: string
}

export default function MetricsBlockedUsers(props: MetricsProps) {

    const { fromDate, toDate } = props;
    let dataBlockedGraphic: {
        name: string;
        value: number;
    }[] = [];
    
    const metricsUsersBlocked = getTotalUsersDividedByDays("blocked", "", fromDate, toDate);
    let startDate = new Date(fromDate);
    let endDate = new Date(toDate);
    let cursorDate = startDate;
    const totalUsersBlocked = getTotalUsers("blocked", "", fromDate, toDate);
    const allValuesAreZero = !(totalUsersBlocked > 0);
    const oneDaySelected = sameUTCDay(startDate, endDate);
    let titleSimpleLineCharts = "";
    
    if (oneDaySelected) {
        
        titleSimpleLineCharts = "Cantidad de usuarios bloqueados el "+cursorDate.getUTCDate()+" de "+getMonthName(cursorDate.getUTCMonth() + 1)+" de "+cursorDate.getUTCFullYear()+".";

    } else {

        titleSimpleLineCharts = "Cantidad de usuarios bloqueados entre el "+cursorDate.getUTCDate()+" de "+getMonthName(cursorDate.getUTCMonth() + 1)+" de "+cursorDate.getUTCFullYear()+" y el "+endDate.getUTCDate()+" de "+getMonthName(endDate.getUTCMonth() + 1)+" de "+endDate.getUTCFullYear()+".";
        while (cursorDate < endDate) {

            let contDayNumber = 0;
            const totalMetricsUsersBlocked = metricsUsersBlocked.find(item => sameUTCDay(item.date, cursorDate));
            
            if (totalMetricsUsersBlocked) {
                dataBlockedGraphic.push({name: formatDateUTCSimple(cursorDate), value: totalMetricsUsersBlocked.total_users}); 
            } else {
                dataBlockedGraphic.push({name: formatDateUTCSimple(cursorDate), value: 0});
            }
            
            cursorDate = addDays(cursorDate, 1);
            contDayNumber++;

        }
    }

    const renderGraphic = (): ReactElement<any, any> => {

        if (oneDaySelected) {
            if (allValuesAreZero) {
                return (<h3 className="text-center align-middle">No se detectaron bloqueos en esta fecha.</h3>);
            }
        } else {
            return (<SimpleLineChartMetrics data={dataBlockedGraphic} title="Usuarios bloqueados" />);
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
                                <FormGroupMetrics title='Total de usuarios bloqueados' value={totalUsersBlocked} />
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}