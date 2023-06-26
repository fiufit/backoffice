import { MetricsData, getTop } from "@services/metrics";
import Top from "./Top";
import { Row, Col } from "react-bootstrap";

interface MetricsProps {
    fromDate: string,
    toDate: string
}

export default function MetricsTrainingsTopUsers(props: MetricsProps) {
    
    const { fromDate, toDate } = props;

    const top_followers: Array<[string, MetricsData[]]> = getTop("user_followed", "", fromDate, toDate);
    const top_session_finished: Array<[string, MetricsData[]]> = getTop("training_session_finished", "", fromDate, toDate);
    
    return(
        <Row>
            <Col>
                <Top top={top_followers} title="Top 10 Usuarios con más seguidores" subtitleLeft="ID" subtitleRight="Cantidad" />
            </Col>
            <Col>
                <Top top={top_session_finished} title="Top 10 Usuarios con más sesiones terminadas" subtitleLeft="ID" subtitleRight="Cantidad" />
            </Col>
        </Row>
    );

}