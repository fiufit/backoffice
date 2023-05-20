import { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Label } from 'recharts';
import { Col, Container, Form, Row } from "react-bootstrap";

function HistoricRecordMonth() {
    return (
        <div className='mt-3'>
            <h3 className='mb-2'>Estadísticas</h3>
            <Form className="mx-auto">
                <Row>
                    <Col>
                        <Form.Group className="mb-2" controlId="formHistoricRecordLogin">
                            <Form.Label className="mb-0">Record histórico de usuarios logueados en 1 mes</Form.Label>
                            <Form.Control type="text" id="users-total-record" aria-label="users-total-record" disabled value="320" readOnly />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}


class LoginsGraphic extends PureComponent {

  render() {

    const data = [
    {
        name: 'Enero',
        clasica: 4000,
        federada: 2400,
    },
    {
        name: 'Febrero',
        clasica: 3000,
        federada: 1398,
    },
    {
        name: 'Marzo',
        clasica: 2000,
        federada: 5800,
    },
    {
        name: 'Abril',
        clasica: 2780,
        federada: 3908,
    },
    {
        name: 'Mayo',
        clasica: 1890,
        federada: 4800,
    },
    {
        name: 'Junio',
        clasica: 2390,
        federada: 3800,
    }
    ];


    return (
        <div>
            <h4 className='mb-3 mt-0 text-center '>Cantidad de usuarios logueados en los últimos 6 meses.</h4>
            <BarChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 30,
                    bottom: 10
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name">
                    <Label value="Mes" offset={0} position="right" />
                </XAxis>
                <YAxis>
                    <Label value="total de usuarios" position="insideLeft" angle={-90} />
                </YAxis>
                <Tooltip />
                <Legend />
                <Bar dataKey="clasica" fill="#f246bb" name='E-mail y contraseña' />
                <Bar dataKey="federada" fill="#46bbf2" name='Identidad federada' />
                </BarChart>
      </div>
    );
  }
}

export default function MetricsLogin() {
    return (
        <Container>
            <Row>
                <Col>
                    <LoginsGraphic />
                </Col>
                <Col lg={12} xs={12}>
                    <HistoricRecordMonth />
                </Col>
            </Row>
        </Container>
    );
}