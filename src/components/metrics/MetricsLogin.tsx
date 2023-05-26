import { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Label, PieChart, Cell, Pie } from 'recharts';
import { Col, Container, Form, Row } from "react-bootstrap";

function HistoricRecordMonth() {
    return (
        <div className='mt-3'>
            <h3 className='mb-2'>Estadísticas</h3>
            <Form className="mx-auto">
                <Row>
                    <Col>
                        <Form.Group className="mb-2" controlId="formHistoricRecordLogin">
                            <Form.Label className="mb-0">Record histórico de usuarios logueados en 1 mes (e-mail y contraseña + identidad federada)</Form.Label>
                            <Form.Control type="text" id="users-total-record" aria-label="users-total-record" disabled value="4800" readOnly />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

class ComparisonPreviousMonth extends PureComponent {
  
    render() {

        const data = [
        { name: 'Mayo', value: 6690 },
        { name: 'Junio', value: 6190 },
        ];

        const COLORS = ['#46bbf2', '#f246bb'];

        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: CustomizedLabelProps) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
        };

        return (
            <div>
                <h4 className='mb-3 mt-0 text-center '>Comparación con el mes anterior.</h4>
                <PieChart width={400} height={380}>
                <Pie
                    data={data}
                    cx={240}
                    cy={170}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={130}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend />
                </PieChart>
            </div>
        );
    }
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
                <Col>
                    <ComparisonPreviousMonth />
                </Col>
                <Col lg={12} xs={12}>
                    <HistoricRecordMonth />
                </Col>
            </Row>
        </Container>
    );
}