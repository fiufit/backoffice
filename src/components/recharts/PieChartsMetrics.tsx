import { PieChart, Pie, Cell, Legend } from 'recharts';

interface PieChartMetricsProps {
    data: {
        name: string;
        value: number;
    }[],
    allValuesAreZero: boolean
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

export default function PieChartsMetrics(props: PieChartMetricsProps) {

    const { data, allValuesAreZero } = props;

    const COLORS = ['#46bbf2', '#f246bb', '#8bc34a', '#f2b46b', '#4a8bc3', '#6bf2b4'];
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

    if (allValuesAreZero) return (<></>);
    
    return (
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
                {props.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Legend />
        </PieChart>
    )

}