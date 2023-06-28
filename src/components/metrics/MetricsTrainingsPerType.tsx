import PieChartsMetrics from "@components/recharts/PieChartsMetrics";
import RadarChartMetrics from "@components/recharts/RadarChartMetrics";
import { getTrainingsPerType } from "@services/metrics";
import { Col, Container, Row } from "react-bootstrap";

interface MetricsProps {
    fromDate: string,
    toDate: string
}

export default function MetricsTrainingsPerType(props: MetricsProps) {

  const { fromDate, toDate } = props; 
  let dataMetricsTrainingsType: { subject: string, metrics: number }[] = [];
  let totalSets = 0;
  let allValuesAreZero = true;
  let totalMetrics: { [subject: string]: number } = {
    "Fuerza": 0,
    "Velocidad": 0,
    "Resistencia": 0,
    "Perder peso": 0,
    "Ganar peso": 0,
    "Deportes": 0
  };
  let dataComparisonLocations: {name: string, value: number }[] = [];
  const trainings = getTrainingsPerType(fromDate, toDate);

  trainings.forEach(function(value, key) {  
    dataMetricsTrainingsType.push({ subject: value.type, metrics: value.sets });
    totalSets = totalSets + value.sets;
    if (totalMetrics[value.type] === 0) totalMetrics[value.type] = value.sets;
    dataComparisonLocations.push({name: value.type, value: value.sets});
  })

  if (totalSets > 0) { allValuesAreZero = false; }

    return (
        <Container>
            <Row>
                <Col>
                  <h3 className='mb-0 mt-0 text-center '>Entrenamientos según tipo.</h3>
                  <RadarChartMetrics data={dataMetricsTrainingsType} />
                </Col>
                <Col>
                  <h3 className='mb-0 mt-0 text-center'>Porcentajes según tipo de entrenamiento con respecto al total de entrenamientos detectados.</h3>
                  
                  {
                    allValuesAreZero ? 
                    <h4 className="text-center align-middle mt-4">No se detectaron tipos de entrenamientos para este día o intervalo de días.</h4>
                    : <PieChartsMetrics data={dataComparisonLocations} allValuesAreZero={allValuesAreZero} />
                  }
                </Col>
              </Row>
        </Container>
    );
}