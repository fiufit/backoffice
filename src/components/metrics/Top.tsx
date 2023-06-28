import { MetricsData } from "@services/metrics";
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap';

interface TopProps {
    top: Array<[string, MetricsData[]]>,
    title: string,
    subtitleLeft: string,
    subtitleRight: string,
}

export default function Top(props: TopProps) {
    
    const { top, title, subtitleLeft, subtitleRight } = props;
    
    return (

        <Card style={{ maxWidth: '600px'}}>      
        <Card.Header className="fw-bold">{title}</Card.Header>
        <Card.Body>
            <ListGroup as="ol">
                <ListGroup.Item>
                    <Row>
                        <Col xs={6} className="fw-bold text-start">
                        {subtitleLeft}
                        </Col>
                        <Col xs={6} className="fw-bold text-end">
                        {subtitleRight}
                        </Col>
                    </Row>
                </ListGroup.Item>
                {top.map((element, index) => (
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={index.toString()}>
                        <div>{element[0]}</div>
                        <Badge className="bg-light_green--primary text-dark_blue--primary" pill>
                            <span className="h6">{element[1].length}</span>
                        </Badge>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card.Body>
        </Card>

    );
}