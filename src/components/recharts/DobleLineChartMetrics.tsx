import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface DobleLineChartMetricsProps {

    data: {
        name: string;
        valueA: number;
        valueB: number;
    }[],
    titleA: string,
    titleB: string,

}

export function DobleLineChartMetrics(props: DobleLineChartMetricsProps) {

    const { data, titleA, titleB } = props; 

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
            <Line type="monotone" name={titleA} dataKey="valueA" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" name={titleB} dataKey="valueB" stroke="#82ca9d" />
        </LineChart>
    );
}
