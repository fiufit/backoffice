import { Accordion, Col, Form, Row, Spinner } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import { Excercise, ExerciseType } from "./Excercise";
import { useDeleteDisableTrainingMutation, usePostEnableTrainingMutation } from '@services/trainings';
import { useState } from "react";
import { toLocalTimeString } from "@utils/utils";
import { User } from "@services/users";

export type Review = {
    ID: number;
    CreatedAt: string;
    TrainingPlanID: number;
    TrainingPlanVersion: number;
    UserID: string;
    User: User;
    Score: number;
    Comment: string;
}

export type TrainingType = {
    ID: number;
    Name: string;
    Description: string;
    Difficulty: string;
    Duration: number;
    TrainerID: string;
    CreatedAt: string;
    DeletedAt: string;
    Exercises: ExerciseType[];
    Tags: Array<{Name: string}>;
    Reviews: Array<Review>;
    MeanScore: number;
    FavoritesCount: number;
    SessionCount: number;
    Disabled: boolean;
    PictureUrl: string;
};

interface TrainingPropsType {
    data: TrainingType;
}

export function Training(props: TrainingPropsType) {

    const [training, setTraining ] = useState(props.data);
    const [isLoading, setIsLoading] = useState(false);
    const [enable, enableResult ] = usePostEnableTrainingMutation();
    const [disable, disableResult ] = useDeleteDisableTrainingMutation();

    const handleEnable = async () => {

        try {
            
            setIsLoading(true);
            await enable(training.ID.toString()).unwrap();
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
            await disable(training.ID.toString()).unwrap();
            var newTraining: TrainingType = { ...training };
            newTraining.Disabled = true;
            setTraining(newTraining);

        } catch (err: any) {

            console.log(err);
        }

        setIsLoading(false);

    };

    const getTags = () => {

        let tag_print = "";
        training.Tags.forEach(tag => {
            tag_print += tag.Name + ", ";
        });

        return (training.Tags.length > 0) ? tag_print.slice(0, -2) : "";

    }

    return (
        <Accordion className=''>
            <Accordion.Item eventKey={training.ID.toString()} className="training-accordion-item">
                <Accordion.Header>{training.Name}</Accordion.Header>
                <Accordion.Body>
                    <Row>
                        <Col xs={4}>
                            <Image src={training.PictureUrl} rounded className="w-100 m-2"/>
                        </Col>
                        <Col xs={8}>
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-2 me-4" controlId="formDescription">
                                            <Form.Label className="mb-0 fw-bold">Descripción</Form.Label>
                                            <Form.Control type="Text" disabled value={training.Description} readOnly/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-2" controlId="formDifficulty">
                                            <Form.Label className="mb-0 fw-bold">Dificultad</Form.Label>
                                            <Form.Control type="Text" disabled value={training.Difficulty} readOnly/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-2" controlId="formDuration">
                                            <Form.Label className="mb-0 fw-bold">Duración</Form.Label>
                                            <Form.Control type="Text" disabled value={training.Duration} readOnly/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="d-flex flex-column mb-2" controlId="formTrainerID">
                                            <Form.Label className="mb-0 fw-bold">ID de entrenador</Form.Label>
                                            <Form.Control type="Text" disabled value={training.TrainerID} readOnly/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-2 me-4" controlId="formCreatedAt">
                                            <Form.Label className="mb-0 fw-bold">Fecha de creación</Form.Label>
                                            <Form.Control type="Text" disabled value={toLocalTimeString(training.CreatedAt, 'es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })} readOnly/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="d-flex flex-column mb-2" controlId="formTraininingID">
                                            <Form.Label className="mb-0 fw-bold">ID de entrenamiento</Form.Label>
                                            <Form.Control type="Text" disabled value={training.ID} readOnly/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="d-flex flex-column mb-2" controlId="formTraininingID">
                                            <Form.Label className="mb-0 fw-bold">Etiquetas</Form.Label>
                                            <Form.Control type="Text" disabled value={getTags()} readOnly/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    <div className="m-2 fw-bold">Ejercicios </div>
                    <Accordion className='py-1'>
                        {training.Exercises.map((exercise: ExerciseType, index: number) => <Excercise data={exercise} key={training.ID+"-"+exercise.ID+"-"+index} /> )}
                    </Accordion>
                    <Row>
                        <Col className="mx-auto text-center mt-3 mb-3">
                            {  
                                (training.Disabled) ?  

                                    <button type="button" className="btn button--secondary font-large" onClick={handleEnable}><b>Desbloquear </b>{ isLoading ? <Spinner animation='border' role='status' size='sm'></Spinner> : ""}</button> : 

                                    <button type="button" className="btn button--secondary font-large" onClick={handleDisable}><b>Bloquear </b>{ isLoading ? <Spinner animation='border' role='status' size='sm'></Spinner> : ""}</button>
                            }
                        </Col>
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
