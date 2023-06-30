import { useState } from 'react';
import TrainersList from '@components/trainers/TrainersList';
import { Certificate, CertificateStatus, GetCertificateRequest,useGetCertificatesQuery, validCertificateStatus } from '@services/users';
import Pagination from '@components/common/Pagination';
import { Form, InputGroup, Spinner } from 'react-bootstrap';;
import { debounce } from '@utils/utils';
import { FaSearch } from 'react-icons/fa';


export default function TrainersContent() {

    const initialPage = 0;
    const defaulPageOffset = 10;
    const [ searchTrainerByID, setSearchTrainerByID ] = useState('');
    const [ searchTrainerStatus, setSearchTrainerStatus ] = useState('');
    const [ page, setPage ] = useState(initialPage);
    const [ pageOffset, setPageOffset ] = useState(defaulPageOffset);

    let queryParams: GetCertificateRequest = {page: page + 1, page_size: pageOffset};
    if (searchTrainerByID !== "") { queryParams.user_id = searchTrainerByID; };
    if (validCertificateStatus(searchTrainerStatus)) {queryParams.status = searchTrainerStatus; };

    let { data, isFetching, refetch } = useGetCertificatesQuery(queryParams);
    const certificates: Certificate[] = data ? data.data!.certifications : [];

    const debounceDelay = 750;

    const setSeartchTrainerByIDWrapper = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(initialPage);
        setSearchTrainerByID(event.target.value);
    }, debounceDelay);

    const setSearchTrainerStatusWrapper = (newStatus: string) => {
        forceRefetch();
        setPage(initialPage);
        setSearchTrainerStatus(newStatus);
    }

    const forceRefetch = () => {
        refetch()
    }

    const getShowingTrainerStatus = () => {
        switch (searchTrainerStatus) {
            case CertificateStatus.Approved: return "aprobadas";
            case CertificateStatus.Denied: return "denegadas";
            case CertificateStatus.Pending: return "pendientes";
            default: return "totales";
        }
    }

    return (
        <div className='management-section h-100 d-flex flex-column'>

            <div>
                <h1 className='management-section-title'>Entrenadores</h1>
                <hr />
            </div>


            <div className='management-section-content flex-grow-1 d-flex flex-column'>
                <h2>Filtrar búsqueda</h2>
                <Form id='edit-admin-form-search'>
                    <InputGroup className='mb-3'>
                        <Form.Control 
                            type='text'
                            placeholder='ID'
                            aria-label='admin-edit-search'
                            className='fiufit-form-input'
                            onChange={setSeartchTrainerByIDWrapper}/>
                        <InputGroup.Text id='admin-search-bar-icon'>
                            {
                                isFetching ? 
                                    <Spinner animation='border' role='status' size='sm'>
                                        <span className='visually-hidden'>Loading...</span>
                                    </Spinner> :
                                <FaSearch />
                            }
                        </InputGroup.Text>
                    </InputGroup>
                    <Form.Group className='mb-3'>
                        <Form.Control as="select" aria-label="trainings-options" id='status-filter' className={"form-select form-select-disabled-effect d-inline-block "+((!validCertificateStatus(searchTrainerStatus)) ? "form-select-disabled-effect-not-selected" : "")} onChange={(event) => setSearchTrainerStatusWrapper(event.currentTarget.value)} >
                            <option value="">Estado</option>
                            <option value={CertificateStatus.Approved}>Aprobado</option>
                            <option value={CertificateStatus.Denied}>Denegado</option>
                            <option value={CertificateStatus.Pending}>Pendiente</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
                <hr className="w-75 text-align-center mx-auto mt-4 mb-1" />

                <div className='flex-grow-1'>
                    <h2>Solicitudes de verificación {getShowingTrainerStatus()}</h2>
                    <div className="d-inline-block mb-3">Mostrar   
                        <Form.Control as="select" aria-label="trainers-options" className="form-select show-results-per-page d-inline-block" defaultValue={defaulPageOffset} onChange={(event) => {setPage(initialPage); setPageOffset(Number(event.currentTarget.value)); forceRefetch(); }}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </Form.Control> 
                        solicitudes por página.
                    </div>
                        { data && <TrainersList certificates={certificates} />}
                </div>

                <div className='d-flex align-items-center'>
                    { 
                        data && <Pagination 
                                    page={page}
                                    setPage={setPage}
                                    offset={data.data!.page_size}
                                    nrows={data.data!.total_rows}
                                />
                    }
                </div>
            </div>
        </div>
    )
}