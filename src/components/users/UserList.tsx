// import Pagination from 'react-bootstrap/Pagination';
import { Accordion } from "react-bootstrap";
import { useGetUsersQuery } from '@services/users';
import SyncLoader from "react-spinners/SyncLoader";
import InfoCard from "./InfoCard";
import ErrorCard from "./ErrorCard";
import UserProfile from "./UserProfile";

export default function UserList() {
    const { 
        data: response, 
        isFetching, 
        isSuccess, 
        isError,
    } = useGetUsersQuery({});

    return (
        <>
            {
                isSuccess ?
                response.data!.users.length > 0 ?
                /* USERS LIST */
                <Accordion className='py-3'>
                {
                    response!.data!.users.map((user) => {
                        return (
                            <Accordion.Item key={user.ID} eventKey={user.ID}>
                                <Accordion.Header>{`${user.DisplayName} - ${user.Nickname}`}</Accordion.Header>
                                <Accordion.Body>
                                    <UserProfile />
                                </Accordion.Body>
                            </Accordion.Item>
                        );
                    })   
                }
                </Accordion> :
                /* NO DATA AVAILABLE */
                <InfoCard message="Lo sentimos, no hay datos para mostrar en este momento"/> : <></>
            }
            {
                isError ?
                /* FETCH ERROR */
                <ErrorCard message="Ocurrio un error inesperado, por favor espere y vuelva a intentarlo" /> : <></>
            }
            {
                isFetching ?
                /* SPINNER */
                <div className="h-100 d-flex justify-content-center align-items-center">
                    <SyncLoader
                        color="rgb(25, 33, 38)"
                        margin={10}
                        size={30}
                        speedMultiplier={1.25}
                    />
                </div> :
                <></>
            }
        </>
    );
}























    /*let active = 1;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
            {number}
            </Pagination.Item>,
        );
    }*/







            {/*<div id="admin-edition-pagination">
                <Pagination>{items}</Pagination>
            </div>*/}