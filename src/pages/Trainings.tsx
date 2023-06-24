import Footer from "@components/Footer";
import Header from "@components/Header";
import Pagination from 'react-bootstrap/Pagination';
import { Form, InputGroup } from "react-bootstrap";
import Navbar from "@components/Navbar";
import { Col, Container, Row } from "react-bootstrap";
import { useGetTrainingsQuery } from '@services/trainings';
import { useState } from "react";
import { debounce } from '@utils/utils';
import { TrainingType, Training } from "@components/trainings/Training";

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

const getPaginationLimits = (pageActive: number, maxPages: number): [number, number] => {

    if (pageActive < 1) return [1, 1];

    const cantBeforPages = 5;
    const cantAfterPages = 4;

    let startNumber = pageActive - cantBeforPages;
    let endNumber = pageActive + cantAfterPages;
    let startNumberValid = true;
    let endNumberValid = true;

    do {

        if (startNumber < 1) {

            startNumberValid = false;
            startNumber++;
            endNumber++;

        } else {
            startNumberValid = true;
        }

    } while (!startNumberValid);
    
    do {

        if (endNumber > maxPages) {
            endNumberValid = false;
            endNumber--;
            if ((startNumber - 1) >= 1) { startNumber--; }
        } else {
            endNumberValid = true;
        }

    } while (!endNumberValid)

    return [startNumber, endNumber];
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
    const [searchTrainingShowBlocked, setSearchTrainingShowBlocked] = useState(false);

    const timeBeforeRequest = 750;
    const handleFilter = debounce((event: React.ChangeEvent<HTMLInputElement>) => {

        const newValue = event.target.value;
        const id = event.target.id;

        switch (id) {

            case "name-filter": 
                setPageActive(1); 
                setSearchTrainingName(newValue); 
                break;

            case "description-filter": 
                setPageActive(1); 
                setSearchTrainingDescription(newValue); 
                break;

            case "trainer_id-filter": 
                setPageActive(1); 
                setSearchTrainerID(newValue); 
                break;

            case "min_duration-filter": 
                setPageActive(1); 
                setSearchTrainingMinDuration(Number(newValue)); 
                break;

            case "max_duration-filter": 
                setPageActive(1); 
                setSearchTrainingMaxDuration(Number(newValue)); 
                break;

            case "disabled-filter": 
                setPageActive(1); 
                setSearchTrainingShowBlocked(!JSON.parse(newValue)); 
                break;

            default: break;
        }

    }, timeBeforeRequest);

    // Request
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
    // FALTARIA FILTRO BLOCKED TRAININGS

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
        totalPages = 1;
        totalRowsDB = 0;
        trainings = [];
        trainingsFound = false;
        console.log("error response data unknown from fetch");
    }

    const [paginationStart, paginationEnd] = getPaginationLimits(pageActive, totalPages);
    
    let items = [
        <Pagination.Item onClick={() => setPageActive(1)}> {"«"} </Pagination.Item>,
        <Pagination.Item onClick={() => setPageActive((pageActive > 1) ? (pageActive - 1) : 1)}> {"‹"} </Pagination.Item>
    ];

    for (let number = paginationStart; number <= paginationEnd; number++) {

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
                            <h1 className="management-section-title">Entrenamientos</h1>
                            <hr />
                            <div className="management-section-content">
                                <h2>Filtrar búsqueda</h2>
                                <Form id='trainings-form-search' className="mx-auto">
                                    <InputGroup className="mb-2">
                                        <Form.Control type="text" placeholder="Nombre" id="name-filter" aria-label="name-filter" className="fiufit-form-input" onChange={handleFilter} />
                                    </InputGroup>
                                    
                                    <InputGroup className="mb-2">
                                        <Form.Control as="textarea" placeholder="Descripción" id="description-filter" aria-label="description-filter" className="fiufit-form-input" onChange={handleFilter} />
                                    </InputGroup>

                                    <InputGroup className="mb-2">
                                        <Form.Control type="text" placeholder="ID del entrenador" id="trainer_id-filter" aria-label="trainer_id-filter" className="fiufit-form-input" onChange={handleFilter} />
                                    </InputGroup>

                                    <Form.Control as="select" aria-label="trainings-options" className={"form-select form-select-training-difficulty d-inline-block "+((searchTrainingDifficulty == "") ? "trainings-filter-difficulty-not-selected" : "")} onChange={(event) => {setPageActive(1); setSearchTrainingDifficulty(event.currentTarget.value)}}>
                                        <option value="">Dificultad</option>
                                        <option value="Beginner">Principiante</option>
                                        <option value="Intermediate">Intermedio</option>
                                        <option value="Expert">Experto</option>
                                    </Form.Control>

                                    <InputGroup className="mb-2">
                                        <Form.Control type="number" min="0" placeholder="Duración mínima" id="min_duration-filter" aria-label="min_duration-filter" className="fiufit-form-input" onChange={handleFilter} />
                                        <Form.Control type="number" min="0" placeholder="Duración máxima" id="max_duration-filter" aria-label="max_duration-filter" className="fiufit-form-input" onChange={handleFilter} />
                                    </InputGroup>

                                    <Form.Group className='mb-3'>
                                        <Form.Check id='disabled-filter' type='checkbox' label='Mostrar entrenamientos bloqueados.' defaultChecked={searchTrainingShowBlocked} className="fiufit-form-input shadow-none mb-0 pb-0" onChange={handleFilter}  />
                                    </Form.Group>

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


                                {(trainingsFound) ? trainings.map((data: TrainingType, i: number) => (             
                                    <div key={i}>
                                        <Training data={data} />
                                    </div> 
                                )) : 
                                <div className="results-not-found">No se han encontrado resultados.</div>
                            }

                                <div id="admin-edition-pagination" className="pagination-edition">
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
