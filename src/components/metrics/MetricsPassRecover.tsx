import { PureComponent } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Label, Legend } from 'recharts';

const data = [
  {
    name: 'Enero',
    users: 3,
  },
  {
    name: 'Febrero',
    users: 5,
  },
  {
    name: 'Marzo',
    users: 6,
  },
  {
    name: 'Abril',
    users: 4,
  },
  {
    name: 'Mayo',
    users: 7,
  },
  {
    name: 'Junio',
    users: 5,
  }
];

class PassRecoverGraphic extends PureComponent {

  render() {
    return (
        <div>
            <h4 className='mb-3 mt-0 text-center '>Cantidad de usuarios que recuperaron su contraseña en los últimos 6 meses.</h4>
            <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name">
                    <Label value="Mes" offset={0} position="insideBottomRight" />
                </XAxis>
                <YAxis>
                    <Label value="total de usuarios" position="insideLeft" angle={-90} />
                </YAxis>
                <Tooltip />
            <Tooltip />
            <Area type="monotone" dataKey="users" stroke="#46bbf2" fill="#46bbf2" name="Total de usuarios" />
            </AreaChart>
        </div>
    );
  }
}

function HistoricRecordMonth() {
    return (
        <div className='mt-3'>
            <h3 className='mb-2'>Estadísticas</h3>
            <Form className="mx-auto">
                <Row>
                    <Col>
                        <Form.Group className="mb-2" controlId="formTotalRecoverUsers">
                            <Form.Label className="mb-0">Total de usuarios que recuperaron su contraseña</Form.Label>
                            <Form.Control type="text" id="users-total-recover" aria-label="users-total-recover" disabled value="291" readOnly />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}


export default function MetricsPassRecover() {
    return (
        <Container>
            <Row>
                <Col>
                    <PassRecoverGraphic /> 
                </Col>
                <Col lg={12} xs={12}>
                    <HistoricRecordMonth />
                </Col>
            </Row>
        </Container>
    );
}