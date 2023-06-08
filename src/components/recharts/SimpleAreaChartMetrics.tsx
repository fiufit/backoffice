import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Label, Legend } from 'recharts';

interface PropsSimpleAreChart {
    data: {
        name: string;
        users: number;
    }[],
    labelX: string,
    labelY: string,
}

export default function SimpleAreaChartMetrics(props: PropsSimpleAreChart) {

    return (
        <AreaChart
            width={500}
            height={400}
            data={props.data}
            margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name">
                    <Label value={props.labelX} offset={0} position="insideBottomRight" />
                </XAxis>
                <YAxis>
                    <Label value={props.labelY} position="insideLeft" angle={-90} />
                </YAxis>
                <Tooltip />
            <Tooltip />
            <Area type="monotone" dataKey="users" stroke="#46bbf2" fill="#46bbf2" name="Total de usuarios" />
        </AreaChart>
    );

}
