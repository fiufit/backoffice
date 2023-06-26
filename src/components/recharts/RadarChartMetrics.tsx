import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

interface RadarChartProps {
    data: {
        subject: string;
        metrics: number;
    }[]
}

export default function RadarChartMetrics(props: RadarChartProps) {

    return (

        <RadarChart
            cx={200}
            cy={200}
            outerRadius={150}
            width={500}
            height={400}
            data={props.data}
        >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar
            dataKey="metrics"
            stroke="#46bbf2"
            fill="#46bbf2"
            fillOpacity={0.6}
            />
      </RadarChart>

    );

}