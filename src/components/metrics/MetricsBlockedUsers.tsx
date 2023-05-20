import { PureComponent } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { PieChart, Pie, Cell, Legend } from 'recharts';

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

class BlockedUsersGraphic extends PureComponent {
  
    render() {

        const data = [
        { name: 'Activos (537)', value: 537 }, /* sumar al name la cantidad de activos entre parentesis */
        { name: 'Bloqueados (312)', value: 312 }, /* sumar al name la cantidad de bloqueados entre parentesis */
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
                <h4 className='mb-0 mt-0 text-center '>Comparación con el total de usuarios.</h4>
                <PieChart width={400} height={380}>
                <Pie
                    data={data}
                    cx={230}
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

export default function MetricsBlockedUsers() {
    return(
        <Container>
            <Row>
                <Col>
                    <BlockedUsersGraphic />
                </Col>
            </Row>
        </Container>
    );
}