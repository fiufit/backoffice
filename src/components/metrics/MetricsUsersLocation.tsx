import PieChartsMetrics from "@components/recharts/PieChartsMetrics";
import RadarChartMetrics from "@components/recharts/RadarChartMetrics";
import { getUsersLocations } from "@services/metrics";
import { Col, Container, Row } from "react-bootstrap";

interface MetricsProps {
    fromDate: string,
    toDate: string
}

export default function MetricsUsersLocation(props: MetricsProps) {

  const { fromDate, toDate } = props; 
  let dataMetricsUsersLocations: { subject: string, metrics: number }[] = [];
  let totalSets = 0;
  let allValuesAreZero = true;
  let totalUsers: { [subject: string]: number } = {
    "Latinoamérica": 0,
    "América del Norte": 0,
    "Asia": 0,
    "Oceanía": 0,
    "África": 0,
    "Europa": 0
  };
  let dataComparisonLocations: {name: string, value: number }[] = [];
  const locations = getUsersLocations(fromDate, toDate);

  locations.forEach(function(value, key) {  
    dataMetricsUsersLocations.push({ subject: value.continent, metrics: value.sets });
    totalSets = totalSets + value.sets;
    if (totalUsers[value.continent] === 0) totalUsers[value.continent] = value.sets;
    dataComparisonLocations.push({name: value.continent, value: value.sets});
  })

  if (totalSets > 0) { allValuesAreZero = false; }

    return (
        <Container>
            <Row>
                <Col>
                  <h3 className='mb-0 mt-0 text-center '>Cantidad de usuarios por zona geográfica</h3>
                  <RadarChartMetrics data={dataMetricsUsersLocations} />
                </Col>
                <Col>
                  <h3 className='mb-0 mt-0 text-center'>Porcentajes según ubicación geográfica con respecto al total de usuarios</h3>
                  
                  {
                    allValuesAreZero ? 
                    <h4 className="text-center align-middle mt-4">No se detectaron cambios o seteos de región para este día o intervalo de días.</h4>
                    : <PieChartsMetrics data={dataComparisonLocations} allValuesAreZero={allValuesAreZero} />
                  }
                </Col>
              </Row>
        </Container>
    );
}