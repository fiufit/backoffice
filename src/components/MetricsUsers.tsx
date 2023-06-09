import { Accordion } from "react-bootstrap";
import MetricsNewUsers from "@components/metrics/MetricsNewUsers";
import MetricsLogin from "@components/metrics/MetricsLogin";
import MetricsBlockedUsers from "@components/metrics/MetricsBlockedUsers";
import MetricsPassRecover from "@components/metrics/MetricsPassRecover";
import MetricsUsersLocation from "@components/metrics/MetricsUsersLocation";
import MetricsByInterval from "@components/metrics/MetricsByInterval";
import { useState } from "react";

export default function MetricsUsers() {

    const [showMetricsByInterval, setShowMetricsByInterval] = useState(false);
    const [showMetricsNewUsers, setShowMetricsNewUsers] = useState(false);
    const [showMetricsLogin, setShowMetricsLogin] = useState(false);
    const [showMetricsBlocked, setShowMetricsBlocked] = useState(false);
    const [showMetricsPassRecover, setShowMetricsPassRecover] = useState(false);
    const [showMetricsUsersLocation, setShowMetricsUsersLocation] = useState(false);

    return (
        <div className="metrics-accordion">
            <Accordion className='pt-4'>
                <Accordion.Item eventKey="metrics-users">
                    <Accordion.Header className="metrics-item">Usuarios</Accordion.Header>
                    <Accordion.Body className="pb-4">
                        <Accordion alwaysOpen>
                            <Accordion.Item eventKey="metrics-by-interval">
                                <Accordion.Header onClick={() => {setShowMetricsByInterval(!showMetricsByInterval)}}>Búsqueda por día/intervalo</Accordion.Header>
                                <Accordion.Body>{ showMetricsByInterval ? <MetricsByInterval /> : <></> }</Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="metrics-new-users">
                                <Accordion.Header onClick={() => {setShowMetricsNewUsers(!showMetricsNewUsers)}}>Nuevos usuarios</Accordion.Header>
                                <Accordion.Body>{ showMetricsNewUsers ? <MetricsNewUsers /> : <></>}</Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="metrics-login">
                                <Accordion.Header onClick={() => {setShowMetricsLogin(!showMetricsLogin)}}>Login</Accordion.Header>
                                <Accordion.Body>{ showMetricsLogin ? <MetricsLogin /> : <></>}</Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="metrics-blocked-users">
                                <Accordion.Header onClick={() => {setShowMetricsBlocked(!showMetricsBlocked)}}>Bloqueo de usuarios</Accordion.Header>
                                <Accordion.Body>{ showMetricsBlocked ? <MetricsBlockedUsers /> : <></> }</Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="metrics-pass-recover">
                                <Accordion.Header onClick={() => {setShowMetricsPassRecover(!showMetricsPassRecover)}}>Recupero de contraseña</Accordion.Header>
                                <Accordion.Body>{ showMetricsPassRecover ? <MetricsPassRecover /> : <></> }</Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="metrics-users-location">
                                <Accordion.Header onClick={() => {setShowMetricsUsersLocation(!showMetricsUsersLocation)}}>Ubicación de usuarios</Accordion.Header>
                                <Accordion.Body>{ showMetricsUsersLocation ? <MetricsUsersLocation /> : <></> }</Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}