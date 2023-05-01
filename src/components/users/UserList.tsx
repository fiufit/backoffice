import Pagination from 'react-bootstrap/Pagination';
import { Accordion } from "react-bootstrap";
import { useGetUsersQuery, User, users } from '@services/users';

export default function UserList() {
    const { data: response, isSuccess } = useGetUsersQuery({total_rows: 3});
    // const { pagination, users } = response;

    /*let active = 1;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
            {number}
            </Pagination.Item>,
        );
    }*/

    const showUserList = () => {
        return isSuccess && response.data;
    }

    return (
        <div>
            <Accordion defaultActiveKey="1" className='py-3'>
                {
                    showUserList() ? 
                    response!.data!.users.map((user) => {
                        return (
                            <Accordion.Item eventKey={user.ID}>
                                <Accordion.Header>{`${user.DisplayName} - ${user.Nickname}`}</Accordion.Header>
                                <Accordion.Body>
                                    Información de Juan Perez #1
                                </Accordion.Body>
                            </Accordion.Item>
                        );
                    }) : 
                    <div>Sin usuarios</div>
                }
            </Accordion>






            {/*<div id="admin-edition-pagination">
                <Pagination>{items}</Pagination>
            </div>*/}
        </div>
    );
}