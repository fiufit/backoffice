import { Accordion } from "react-bootstrap";
import MetricsNewUsers from "@components/metrics/MetricsNewUsers";
import MetricsLogin from "@components/metrics/MetricsLogin";
import MetricsBlockedUsers from "@components/metrics/MetricsBlockedUsers";
import MetricsPassRecover from "@components/metrics/MetricsPassRecover";
import MetricsUsersLocation from "@components/metrics/MetricsUsersLocation";
import MetricsByInterval from "@components/metrics/MetricsByInterval";

export default function MetricsUsers() {
    return (
        <div className="metrics-accordion">
            <Accordion className='pt-4' defaultActiveKey="metrics-users">
                <Accordion.Item eventKey="metrics-users">
                    <Accordion.Header className="metrics-item">Usuarios</Accordion.Header>
                    <Accordion.Body className="pb-4">
                        <Accordion alwaysOpen defaultActiveKey="metrics-by-interval">
                            <Accordion.Item eventKey="metrics-by-interval">
                                <Accordion.Header>Búsqueda por día/intervalo</Accordion.Header>
                                <Accordion.Body><MetricsByInterval /></Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="metrics-new-users">
                                <Accordion.Header>Nuevos usuarios</Accordion.Header>
                                <Accordion.Body><MetricsNewUsers /></Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="metrics-login">
                                <Accordion.Header>Login</Accordion.Header>
                                <Accordion.Body><MetricsLogin /></Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="metrics-blocked-users">
                                <Accordion.Header>Bloqueo de usuarios</Accordion.Header>
                                <Accordion.Body><MetricsBlockedUsers /></Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="metrics-pass-recover">
                                <Accordion.Header>Recupero de contraseña</Accordion.Header>
                                <Accordion.Body><MetricsPassRecover /></Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="metrics-users-location">
                                <Accordion.Header>Ubicación de usuarios</Accordion.Header>
                                <Accordion.Body><MetricsUsersLocation /></Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}