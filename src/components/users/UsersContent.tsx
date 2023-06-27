import { useState } from 'react';
import SearchBar from '@components/common/SearchBar';
import UsersList from '@components/users/UsersList';
import { GetUserRequest, useGetUsersQuery } from '@services/users';
import Pagination from '@components/common/Pagination';
import { Form } from 'react-bootstrap';
import SearchUserByID from '@components/common/SearchUserByID';


export default function UsersContent() {

    const initialPage = 0;
    const pageOffset = 8;
    const [ searchText, setSearchBar ] = useState('');
    const [ searchUser, setSearchUser ] = useState('');
    const [ searchFilterBlockedUsers, setSearchFilterBlockedUsers ] = useState(false);
    const [ page, setPage ] = useState(initialPage);

    let queryParams: GetUserRequest = {page: page + 1, page_size: pageOffset};
    if (searchText !== "") { queryParams.name = searchText; };
    queryParams.disabled = searchFilterBlockedUsers; // por defecto trae los usuarios activos, igual que trainings
    if (searchUser !== "") {queryParams.user_ids = searchUser; };

    let { data, isFetching, refetch } = useGetUsersQuery(queryParams);

    // En caso de querer controlar errores que vengan del servicio o excepciones
    // https://redux-toolkit.js.org/rtk-query/usage-with-typescript#error-result-example

    const setSearchBarWrapper = (searchText: React.SetStateAction<string>) => {
        refetch();
        setPage(initialPage);
        setSearchBar(searchText);
    }

    const setSearchBlockedUsersWrapper = (filterBlockedUsersActive:  React.SetStateAction<boolean>) => {
        refetch();
        setPage(initialPage);
        setSearchFilterBlockedUsers(filterBlockedUsersActive);
    }

    const setSearchUserWrapper = (user_id: string) => {
        refetch();
        setPage(initialPage);
        setSearchUser(user_id);
    }

    return (
        <div className='management-section h-100 d-flex flex-column'>

            <div>
                <h1 className='management-section-title'>Usuarios</h1>
                <hr />
            </div>


            <div className='management-section-content flex-grow-1 d-flex flex-column'>
                <h2>Filtrar búsqueda</h2>
                <Form id='edit-admin-form-search'>
                    <SearchBar spinner={isFetching} setSearchBar={setSearchBarWrapper} />
                    <SearchUserByID spinner={isFetching} setSearchUserByID={setSearchUserWrapper} />
                    <Form.Group className='mb-3'>
                        <Form.Check id='disabled-filter' type='checkbox' label='Mostrar usuarios bloqueados' defaultChecked={ searchFilterBlockedUsers } onChange={() => { setSearchBlockedUsersWrapper(!searchFilterBlockedUsers) }} />
                    </Form.Group>
                </Form>
                <hr className="w-75 text-align-center mx-auto mt-4 mb-1" />

                <div className='flex-grow-1'>
                    <h2>Resultados</h2>
                        { data && <UsersList users={data.data!.users} />}
                </div>

                <div className='d-flex align-items-center'>
                    { 
                        data && <Pagination 
                                    page={page}
                                    setPage={setPage}
                                    offset={data.data!.pagination.page_size}
                                    nrows={data.data!.pagination.total_rows}
                                />
                    }
                </div>
            </div>
        </div>
    )
}