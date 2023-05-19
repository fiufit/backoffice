import { Accordion } from "react-bootstrap";

export default function MetricsTrainings() {
    return (
        <div className="metrics-accordion">
            <Accordion className='pt-2' defaultActiveKey="metrics-trainings">
                <Accordion.Item eventKey="metrics-trainings" className="metrics-item">
                    <Accordion.Header>Métricas de trainings</Accordion.Header>
                    <Accordion.Body>
                        Métricas de trainings body
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}