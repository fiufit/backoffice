import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';

interface BarChartMetricsProps {

    data: {
        name: string;
        valueA: number;
        valueB: number;
    }[],
    titleA: string,
    titleB: string,

}

export default function BarChartMetrics(props: BarChartMetricsProps) {

    return (

        <BarChart
            width={500}
            height={400}
            data={props.data}
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
            <Bar dataKey="valueA" fill="#f246bb" name={props.titleA} />
            <Bar dataKey="valueB" fill="#46bbf2" name={props.titleB} />
        </BarChart>

    )

}