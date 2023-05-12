import Footer from "@components/Footer";
import Header from "@components/Header";
import Pagination from 'react-bootstrap/Pagination';
import { Accordion, Form, InputGroup } from "react-bootstrap";
import Navbar from "@components/Navbar";
import { Col, Container, Row } from "react-bootstrap";
import { useGetTrainingsQuery } from '@services/trainings';
import { useState } from "react";

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

const toLocalTimeString = (date: string, locales: Intl.LocalesArgument, options: Intl.DateTimeFormatOptions) => {
    return new Date(date).toLocaleTimeString(locales, options);
}

const renderExercise = (exercise: ExerciseType) => {
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

const renderTraining = (training: TrainingType) => {
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
                        </Row>
                    </Form>
                    <div>Ejercicios </div>
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
    var trainingsFound = false;

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

        if (trainings.length > 0) { trainingsFound = true} 
        else { trainingsFound = false; }

    } else {
        // deberian tratarse de otra manera, con captura de errores, tal vez mostrando un mensaje en resultados.
        console.log("error response data unknown from fetch");
    }

    let items = [
        <Pagination.Item onClick={() => setPageActive(1)}> {"«"} </Pagination.Item>,
        <Pagination.Item onClick={() => setPageActive((pageActive > 1) ? (pageActive - 1) : 1)}> {"‹"} </Pagination.Item>
    ];
    
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === pageActive} onClick={() => setPageActive(number)}> {number} </Pagination.Item>,
        );
    }

    items.push(
        <Pagination.Item onClick={() => setPageActive((pageActive < totalPages) ? (pageActive + 1) : totalPages)}> {"›"} </Pagination.Item>        
    );
    items.push(
        <Pagination.Item onClick={() => setPageActive(totalPages)}> {"»"} </Pagination.Item>
    );
    
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
                                        <Form.Control type="text" placeholder="Duración mínima" id="min_duration-input" aria-label="min_duration-input" className="fiufit-form-input" onKeyUp={(event) => {setPageActive(1); setSearchTrainingMinDuration(Number(event.currentTarget.value))}} />
                                        <Form.Control type="text" placeholder="Duración máxima" id="max_duration-input" aria-label="max_duration-input" className="fiufit-form-input" onKeyUp={(event) => {setPageActive(1); setSearchTrainingMaxDuration(Number(event.currentTarget.value))}} />
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


                                {(trainingsFound) ? 
                                trainings.map((data: TrainingType, i: number) => (             
                                    <div key={i}>
                                        {renderTraining(data)}
                                    </div> 
                                )) : 
                                <div className="results-not-found">No se han encontrado resultados.</div>
                            }

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
function moment(date: string) {
    throw new Error("Function not implemented.");
}

