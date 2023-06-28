import { MetricsData, getTop } from "@services/metrics";
import { Row, Col } from "react-bootstrap";
import Top from "./Top";

interface MetricsProps {
    fromDate: string,
    toDate: string
}

interface MetricsProps {
    fromDate: string,
    toDate: string
}

export default function MetricsTrainingsContentPerUser(props: MetricsProps) {
    
    const { fromDate, toDate } = props;

    const top_favorite_trainings: Array<[string, MetricsData[]]> = getTop("favorite_training", "", fromDate, toDate);
    
    return(
        <Row>
            <Col>
                <Top top={top_favorite_trainings} title="Top 10 Entrenamientos con más favoritos" subtitleLeft="ID" subtitleRight="Cantidad"/>
            </Col>
        </Row>
    );

}