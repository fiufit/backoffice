import { Col, Container, Form, Row } from "react-bootstrap";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

function PercentagesLocation() {
    return (
        <div className='mt-3'>
            <h4 className='mb-2'>Porcentajes de usuarios según ubicación geográfica con respecto al total registrados</h4>
            <Form className="mx-auto">
                <Row>
                    <Col>
                        <Form.Group className="mb-2" controlId="formPercentagesLocationLatino">
                            <Form.Label className="mb-0">Latinoamérica</Form.Label>
                            <Form.Control type="text" id="users-percentage-latino" aria-label="users-percentage-latino" disabled value="50%" readOnly />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-2" controlId="formPercentagesLocationNorthAmerica">
                            <Form.Label className="mb-0">América del Norte</Form.Label>
                            <Form.Control type="text" id="users-percentage-north-america" aria-label="users-percentage-north-america" disabled value="10%" readOnly />
                        </Form.Group>
                    </Col>
                </Row>
                  <Row>
                    <Col>
                        <Form.Group className="mb-2" controlId="formPercentagesLocationEurope">
                            <Form.Label className="mb-0">Europa</Form.Label>
                            <Form.Control type="text" id="users-percentage-europa" aria-label="users-percentage-europa" disabled value="20%" readOnly />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-2" controlId="formPercentagesLocationOceania">
                            <Form.Label className="mb-0">Oceanía</Form.Label>
                            <Form.Control type="text" id="users-percentage-oceania" aria-label="users-percentage-oceania" disabled value="10%" readOnly />
                        </Form.Group>
                    </Col>
                </Row>
                  <Row>
                    <Col>
                        <Form.Group className="mb-2" controlId="formPercentagesLocationAsia">
                            <Form.Label className="mb-0">Asia</Form.Label>
                            <Form.Control type="text" id="users-percentage-asia" aria-label="users-percentage-asia" disabled value="5%" readOnly />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-2" controlId="formPercentagesLocationAfrica">
                            <Form.Label className="mb-0">África</Form.Label>
                            <Form.Control type="text" id="users-percentage-africa" aria-label="users-percentage-africa" disabled value="5%" readOnly />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

function UsersLocationGraphic() {
  
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
 
  return (
    <div>
      <h3 className='mb-3 mt-0 text-center '>Cantidad de usuarios por zona geográfica</h3>
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
                <Col>
                  <PercentagesLocation />
                </Col>
            </Row>
        </Container>
    );
}