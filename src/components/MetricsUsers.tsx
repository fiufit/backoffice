import { Accordion } from "react-bootstrap";

export default function MetricsUsers() {
    return (
        <div className="metrics-accordion">
            <Accordion className='pt-3' defaultActiveKey="metrics-users">
                <Accordion.Item eventKey="metrics-users">
                    <Accordion.Header className="metrics-item">Métricas de usuarios</Accordion.Header>
                    <Accordion.Body>
                            Métricas de usuarios body
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}