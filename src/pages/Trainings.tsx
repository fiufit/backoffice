import Footer from "@components/Footer";
import Header from "@components/Header";
import { Form, InputGroup } from "react-bootstrap";
import Navbar from "@components/Navbar";
import { Col, Container, Row } from "react-bootstrap";
import { useGetTrainingsQuery } from '@services/trainings';
import { useState } from "react";
import { debounce } from '@utils/utils';
import { TrainingType, Training } from "@components/trainings/Training";
import Paginator from "@components/common/Paginator";

type PaginationType = {
    page: number;
    page_size: number;
    total_rows: number;
};

type TrainingsResponseType = {
    pagination: PaginationType;
    trainings: TrainingType[];
};

type TrainingsRequestParamsType = Record<string, Record<string, string | number | boolean>>;

export default function Trainings() {

    // Default
    const initialPage = 1;
    const initialPageSize = 10;
    const [pageActive, setPageActive] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);
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

        const filter = event.target;

        switch (filter.id) {

            case "name-filter": 
                setPageActive(1); 
                setSearchTrainingName(filter.value); 
                break;

            case "description-filter": 
                setPageActive(1); 
                setSearchTrainingDescription(filter.value); 
                break;

            case "trainer_id-filter": 
                setPageActive(1); 
                setSearchTrainerID(filter.value); 
                break;

            case "min_duration-filter": 
                setPageActive(1); 
                setSearchTrainingMinDuration(Number(filter.value)); 
                break;

            case "max_duration-filter": 
                setPageActive(1); 
                setSearchTrainingMaxDuration(Number(filter.value)); 
                break;

            default: break;
        }

        forceRefetch();

    }, timeBeforeRequest);

    // Request
    let request: TrainingsRequestParamsType = { params: { 

        page: pageActive, 
        page_size: pageSize 

    }};

    if (searchTrainingName != "") { request.params.name = searchTrainingName; };
    if (searchTrainingDescription != "") { request.params.description = searchTrainingDescription };
    if (searchTrainingDifficulty != "") { request.params.difficulty = searchTrainingDifficulty };
    if (searchTrainerID != "") { request.params.trainer_id = searchTrainerID };
    if (searchTrainingMinDuration > 0) { request.params.min_duration = searchTrainingMinDuration };
    if (searchTrainingMaxDuration > 0) { request.params.max_duration = searchTrainingMaxDuration };
    request.params.disabled = searchTrainingShowBlocked; // si no le indico nada, trae por defecto los activos.

    const { data, isSuccess, isFetching, refetch } = useGetTrainingsQuery(request);

    if (data) {

        const responseData: TrainingsResponseType = data.data;
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

    const forceRefetch = () => {
        refetch();
    }

    const setPageActiveWrapper = (newPageActive: number) => {
        setPageActive(newPageActive);
    };

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

                                    <Form.Control as="select" aria-label="trainings-options" className={"form-select form-select-disabled-effect d-inline-block "+((searchTrainingDifficulty == "") ? "form-select-disabled-effect-not-selected" : "")} onChange={(event) => {setPageActive(1); setSearchTrainingDifficulty(event.currentTarget.value); forceRefetch(); }}>
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
                                        <Form.Check id='disabled-filter' type='checkbox' label='Mostrar entrenamientos bloqueados.' defaultChecked={searchTrainingShowBlocked} className="fiufit-form-input shadow-none mb-0 pb-0" onChange={(event) => {setPageActive(1); setSearchTrainingShowBlocked(!searchTrainingShowBlocked); forceRefetch(); }}  /> 
                                    </Form.Group>

                                </Form>

                                <hr className="w-75 text-align-center mx-auto mt-5 mb-4"/>

                                <h2>Resultados</h2>

                                <div className="d-inline-block mb-3">Mostrar   
                                    <Form.Control as="select" aria-label="trainings-options" className="form-select show-results-per-page d-inline-block" defaultValue={initialPageSize} onChange={(event) => {setPageActive(1); setPageSize(Number(event.currentTarget.value)); forceRefetch(); }}>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                    </Form.Control> 
                                    entrenamientos por página.
                                </div>

                                {(trainingsFound) ? trainings.map((training: TrainingType, index: number) => (             
                                    <Training data={training} key={training.ID+"-"+index} />
                                )) : 
                                    <div className="results-not-found">No se han encontrado resultados.</div>
                                }

                                <div id="admin-edition-pagination" className="pagination-edition">
                                    <Paginator pageActive={pageActive} totalPages={totalPages} setPageActiveWrapper={setPageActiveWrapper} />
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
