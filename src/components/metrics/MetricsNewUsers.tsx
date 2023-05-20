import { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Label, PieChart, Pie, Cell } from 'recharts';
import { Col, Container, Row } from "react-bootstrap";

class NewUsersGraphic extends PureComponent {

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
            <h4 className='mb-3 mt-0 text-center '>Cantidad de usuarios registrados en los últimos 6 meses.</h4>
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
                    <Label value="total de usuarios nuevos" position="insideLeft" angle={-90} />
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

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

class ComparissonPreviousMonth extends PureComponent {
  
    render() {

        const data = [
        { name: 'Mayo (452)', value: 452 }, /* sumar al name la cantidad en mayo entre parentesis */
        { name: 'Junio (337)', value: 337 }, /* sumar al name la cantidad en junio entre parentesis */
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

export default function MetricsNewUsers() {
    return (
        <Container>
            <Row>
                <Col>
                    <NewUsersGraphic />
                </Col>
                <Col>
                    <ComparissonPreviousMonth />
                </Col>
            </Row>
        </Container>
    );
}