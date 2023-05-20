import { Col, Container, Row } from "react-bootstrap";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const data = [
  {
    subject: "América del Norte",
    users: 120,
  },
  {
    subject: "Asia",
    users: 98,
  },
  {
    subject: "África",
    users: 86,
  },
  {
    subject: "Latinoamérica",
    users: 99,
  },
  {
    subject: "Europa",
    users: 85,
  },
  {
    subject: "Oceanía",
    users: 65,
  }
];

function UsersLocationGraphic() {
  return (
    <div>
      <h4 className='mb-3 mt-0 text-center '>Cantidad de usuarios por zona geográfica</h4>
      <RadarChart
        cx={200}
        cy={200}
        outerRadius={150}
        width={400}
        height={400}
        data={data}
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
    </div>
  );
}


export default function MetricsUsersLocation() {
    return (
        <Container>
            <Row>
                <Col>
                    <UsersLocationGraphic />
                </Col>
            </Row>
        </Container>
    );
}