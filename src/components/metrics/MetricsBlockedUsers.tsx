import { PureComponent } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
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
        { name: 'Activos', value: 537 },
        { name: 'Bloqueados', value: 312 },
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

function HistoricRecordMonth() {
    return (
        <div className='mt-3'>
            <h3 className='mb-2'>Estadísticas</h3>
            <Form className="mx-auto">
                <Row>
                    <Col>
                        <Form.Group className="mb-2" controlId="formTotalBlockedUsers">
                            <Form.Label className="mb-0">Total de usuarios bloqueados</Form.Label>
                            <Form.Control type="text" id="users-total-blocked" aria-label="users-total-blocked" disabled value="312" readOnly />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default function MetricsBlockedUsers() {
    return(
        <Container>
            <Row>
                <Col>
                    <BlockedUsersGraphic />
                </Col>
                <Col lg={12} xs={12}>
                    <HistoricRecordMonth />
                </Col>
            </Row>
        </Container>
    );
}