import Footer from "@components/Footer";
import Header from "@components/Header";
import Pagination from 'react-bootstrap/Pagination';
import { Accordion, Form, InputGroup } from "react-bootstrap";
import Navbar from "@components/Navbar";
import { Col, Container, Row } from "react-bootstrap";
import { useGetTrainingsQuery } from '@services/trainings';
import { FaSearch } from "react-icons/fa";
import { MouseEventHandler, useEffect, useState } from "react";
import { Params, useParams } from "react-router-dom";

type TrainingType = {
  ID: number;
  Name: string;
  Description: string;
  Difficulty: string;
  Duration: number;
  TrainerID: string;
  CreatedAt: string;
  Exercises: ExerciseType[];
};

type ExerciseType = {
  ID: number;
  TrainingPlanID: number;
  Title: string;
  Description: string;
};

type PaginationType = {
  page: number;
  page_size: number;
  total_rows: number;
};

type TrainingsResponseType = {
  pagination: PaginationType;
  trainings: TrainingType[];
};

type TrainingsRequestParamsType = Record<string, Record<string, string | number>>;

const renderExercise = (exercise: ExerciseType) => {
    return (
        <Accordion.Item eventKey={exercise.ID.toString()}>
            <Accordion.Header>{exercise.Title}</Accordion.Header>
            <Accordion.Body>
                {exercise.Description}
                <div>Plan de entrenamiento [ID]: {exercise.TrainingPlanID}</div>
            </Accordion.Body>
        </Accordion.Item>
    );
};

const renderTraining = (training: TrainingType) => {
    return (
        <Accordion className='py-1'>
            <Accordion.Item eventKey={training.ID.toString()}>
                <Accordion.Header>{training.Name}</Accordion.Header>
                <Accordion.Body>
                        {training.Description}
                        <hr/>
                        <div>Dificultad: {training.Difficulty}</div>
                        <div>Duración: {training.Duration}</div>
                        <div>Entrenador [ID]: {training.TrainerID}</div>
                        <div>Fecha de creación: {training.CreatedAt}</div>
                        <div>Ejercicios: </div>
                        <Accordion className='py-1'>
                            {training.Exercises.map((exercise: ExerciseType, i) => renderExercise(exercise) )}
                        </Accordion>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default function Trainings() {

    // Default
    const [pageActive, setPageActive] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    var totalRowsDB = 0;
    var totalPages = 1;
    var trainings: TrainingType[] = [];

    // Filter
    const [searchTrainingName, setSearchTrainingName] = useState("");
    const [searchTrainingDescription, setSearchTrainingDescription] = useState("");
    const [searchTrainingDifficulty, setSearchTrainingDifficulty] = useState("");
    const [searchTrainerID, setSearchTrainerID] = useState("");
    const [searchTrainingMinDuration, setSearchTrainingMinDuration] = useState(0);
    const [searchTrainingMaxDuration, setSearchTrainingMaxDuration] = useState(0);
    
    var request: TrainingsRequestParamsType = { params: { 

        page: pageActive, 
        page_size: pageSize 

    }};

    if (searchTrainingName != "") { request.params.name = searchTrainingName; };
    if (searchTrainingDescription != "") { request.params.description = searchTrainingDescription };
    if (searchTrainingDifficulty != "") { request.params.difficulty = searchTrainingDifficulty };
    if (searchTrainerID != "") { request.params.trainer_id = searchTrainerID };
    if (searchTrainingMinDuration > 0) { request.params.min_duration = searchTrainingMinDuration };
    if (searchTrainingMaxDuration > 0) { request.params.max_duration = searchTrainingMaxDuration };

    var response: any = useGetTrainingsQuery(request);

    if (response.data) {

        const responseData: TrainingsResponseType = response.data.data;
        totalRowsDB = responseData.pagination.total_rows;
        totalPages = Math.ceil(totalRowsDB / pageSize);
        trainings = responseData.trainings;

    } else {
        // deberian tratarse de otra manera, con captura de errores, tal vez mostrando un mensaje en resultados.
        console.log("error response data unknown from fetch");
    }

    let items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === pageActive} onClick={() => setPageActive(number)}>
            {number}
            </Pagination.Item>,
        );
    }
    
    return (
        <>
            <Header />
            <Container className='d-flex flex-column flex-grow-1 py-4' fluid>
                <Row>
                    <Col lg={3}>
                        <div className='layout-navbar-lateral'>
                            <Navbar />
                        </div>
                    </Col>
                    <Col lg={9}>
                        <div className="management-section">
                            <h1 className="management-section-title">Panel de entrenamientos</h1>
                            <hr />
                            <div className="management-section-content">
                                <h2>Filtrar búsqueda</h2>
                                <Form id='trainings-form-search' className="mx-auto">
                                    <InputGroup className="mb-2">
                                        <Form.Control type="text" placeholder="Nombre" id="name-input" aria-label="name-input" className="fiufit-form-input" onKeyUp={(event) => {setPageActive(1); setSearchTrainingName(event.currentTarget.value)}} />
                                    </InputGroup>
                                    
                                    <InputGroup className="mb-2">
                                        <Form.Control as="textarea" placeholder="Descripción" id="description-input" aria-label="description-input" className="fiufit-form-input" onKeyUp={(event) => {setPageActive(1); setSearchTrainingDescription(event.currentTarget.value)}} />
                                    </InputGroup>

                                    <InputGroup className="mb-2">
                                        <Form.Control type="text" placeholder="ID del entrenador" id="trainer_id-input" aria-label="trainer_id-input" className="fiufit-form-input" onKeyUp={(event) => {setPageActive(1); setSearchTrainerID(event.currentTarget.value)}} />
                                    </InputGroup>

                                    <InputGroup className="mb-2">
                                        <Form.Control type="text" placeholder="Dificultad" id="difficulty-input" aria-label="difficulty-input" className="fiufit-form-input" onKeyUp={(event) => {setPageActive(1); setSearchTrainingDifficulty(event.currentTarget.value)}} />
                                    </InputGroup>

                                    <InputGroup className="mb-2">
                                        <Form.Control type="number" placeholder="Duración mínima" id="min_duration-input" aria-label="min_duration-input" className="fiufit-form-input" onKeyUp={(event) => {setPageActive(1); setSearchTrainingMinDuration(Number(event.currentTarget.value))}} />
                                        <Form.Control type="number" placeholder="Duración máxima" id="max_duration-input" aria-label="max_duration-input" className="fiufit-form-input" onKeyUp={(event) => {setPageActive(1); setSearchTrainingMaxDuration(Number(event.currentTarget.value))}} />
                                    </InputGroup>
                                </Form>

                                <hr className="w-75 text-align-center mx-auto mt-5 mb-4"/>

                                <h2>Resultados</h2>

                                <div className="d-inline-block mb-3">Mostrar   
                                    <Form.Control as="select" aria-label="trainings-options" className="form-select trainings-results-per-page d-inline-block" defaultValue="10" onChange={(event) => {setPageActive(1); setPageSize(Number(event.currentTarget.value))}}>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                    </Form.Control> 
                                    entrenamientos por página.
                                </div>


                                {trainings.map((data: TrainingType, i: number) => (                   
                                    <div key={i}>
                                        {renderTraining(data)}
                                    </div> 
                                ))}

                                <div id="admin-edition-pagination">
                                    <Pagination>{items}</Pagination>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};
