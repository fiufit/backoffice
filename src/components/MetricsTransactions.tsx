import { Accordion } from "react-bootstrap";

export default function MetricsTransactions() {
    return (
        <div className="metrics-accordion">
            <Accordion className='pt-2 pb-3' defaultActiveKey="metrics-transactions">
                <Accordion.Item eventKey="metrics-transactions" className="metrics-item">
                    <Accordion.Header>Métricas de transactions</Accordion.Header>
                    <Accordion.Body>
                        Métricas de transactions body
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}