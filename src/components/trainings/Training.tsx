import { Accordion, Col, Form, Row, Spinner } from "react-bootstrap";
import { Excercise, ExerciseType } from "./Excercise";
import { useDeleteDisableTrainingMutation, usePostEnableTrainingMutation } from '@services/trainings';
import { useState } from "react";
import { toLocalTimeString } from "@utils/utils";

export type TrainingType = {
    ID: number;
    Name: string;
    Description: string;
    Difficulty: string;
    Duration: number;
    TrainerID: string;
    CreatedAt: string;
    Exercises: ExerciseType[];
    Disabled: boolean;
};

interface TrainingPropsType {
    data: TrainingType;
}

export function Training(props: TrainingPropsType) {

    const [training, setTraining] = useState<TrainingType>({ ...props.data });
    const [isLoading, setIsLoading] = useState(false);
    const [enable, enableResult ] = usePostEnableTrainingMutation();
    const [disable, disableResult ] = useDeleteDisableTrainingMutation();

    const handleEnable = async () => {

        try {
            
            setIsLoading(true);
            // await enable(training.ID).unwrap();
            var newTraining: TrainingType = { ...training };
            newTraining.Disabled = false;
            setTraining(newTraining);

        } catch (err: any) {

            console.log(err);

        }

        setIsLoading(false);

    };

    const handleDisable = async () => {

        try {
            
            setIsLoading(true);
            // await disable(training.ID).unwrap();
            var newTraining: TrainingType = { ...training };
            newTraining.Disabled = true;
            setTraining(newTraining);

        } catch (err: any) {

            console.log(err);
        }

        setIsLoading(false);

    };

    return (
        <Accordion className=''>
            <Accordion.Item eventKey={training.ID.toString()} className="training-accordion-item">
                <Accordion.Header>{training.Name}</Accordion.Header>
                <Accordion.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2 me-4" controlId="formDescription">
                                    <Form.Label className="mb-0">Descripción</Form.Label>
                                    <Form.Control type="Text" value={training.Description} readOnly/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2" controlId="formDifficulty">
                                    <Form.Label className="mb-0">Dificultad</Form.Label>
                                    <Form.Control type="Text" value={training.Difficulty} readOnly/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2" controlId="formDuration">
                                    <Form.Label className="mb-0">Duración</Form.Label>
                                    <Form.Control type="Text" value={training.Duration} readOnly/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="d-flex flex-column mb-2" controlId="formTrainerID">
                                    <Form.Label className="mb-0">Entrenador [ID]</Form.Label>
                                    <Form.Control type="Text" value={training.TrainerID} readOnly/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-2 me-4" controlId="formCreatedAt">
                                    <Form.Label className="mb-0">Fecha de creación</Form.Label>
                                    <Form.Control type="Text" value={toLocalTimeString(training.CreatedAt, 'es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })} readOnly/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="d-flex flex-column mb-2" controlId="formTraininingID">
                                    <Form.Label className="mb-0">ID de entrenamiento</Form.Label>
                                    <Form.Control type="Text" value={training.ID} readOnly/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                    <div>Ejercicios </div>
                    <Accordion className='py-1'>
                        {training.Exercises.map((exercise: ExerciseType, i) => <Excercise data={exercise} /> )}
                    </Accordion>
                    <Row>
                        <Col className="mx-auto text-center mt-3 mb-3">
                            {  
                                (training.Disabled) ?  

                                    <button type="button" className="btn button--secondary font-large" onClick={() => handleEnable()}><b>Desbloquear </b>{ isLoading ? <Spinner animation='border' role='status' size='sm'></Spinner> : ""}</button> : 

                                    <button type="button" className="btn button--secondary font-large" onClick={() => handleDisable()}><b>Bloquear </b>{ isLoading ? <Spinner animation='border' role='status' size='sm'></Spinner> : ""}</button>
                            }
                        </Col>
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
