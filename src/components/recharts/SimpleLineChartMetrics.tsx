import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface SimpleLineChartMetricsProps {

    data: {
        name: string;
        value: number;
    }[],
    title: string,

}

export function SimpleLineChartMetrics(props: SimpleLineChartMetricsProps) {

    const { data, title } = props; 

    return (
        <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
        }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" name={title} dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    );
}
