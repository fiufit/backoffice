import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

interface RadarChartProps {
    data: {
        subject: string;
        users: number;
    }[]
}

export default function RadarChartMetrics(props: RadarChartProps) {

    return (

        <RadarChart
            cx={200}
            cy={200}
            outerRadius={150}
            width={400}
            height={400}
            data={props.data}
        >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar
            name="location"
            dataKey="users"
            stroke="#46bbf2"
            fill="#46bbf2"
            fillOpacity={0.6}
            />
      </RadarChart>

    );

}