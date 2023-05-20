import { PureComponent } from "react";
import { Col, Container, Row } from "react-bootstrap";
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


export default function MetricsPassRecover() {
    return (
        <Container>
            <Row>
                <Col>
                    <PassRecoverGraphic /> 
                </Col>
            </Row>
        </Container>
    );
}