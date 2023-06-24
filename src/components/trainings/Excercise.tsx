import { Accordion, Form } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";

export type ExerciseType = {
    ID: number;
    TrainingPlanID: number;
    Title: string;
    Description: string;
};

interface TrainingPropsType {
    data: ExerciseType;
}

export function Excercise(props: TrainingPropsType) {

    const exercise: ExerciseType = props.data;

    return (
        <Accordion.Item eventKey={exercise.ID.toString()} className="exercise-accordion-item">
            <Accordion.Header>{exercise.Title}</Accordion.Header>
            <Accordion.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2 me-4" controlId="formDescription">
                                    <Form.Label className="mb-0">Descripción</Form.Label>
                                    <Form.Control type="Text" value={exercise.Description} readOnly/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2 me-4" controlId="formTrainingPlanID">
                                    <Form.Label className="mb-0">Plan de entrenamiento [ID]</Form.Label>
                                    <Form.Control type="Text" value={exercise.TrainingPlanID} readOnly/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
            </Accordion.Body>
        </Accordion.Item>
    );

};