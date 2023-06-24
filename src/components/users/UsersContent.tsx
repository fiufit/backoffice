import { useState } from 'react';
import SearchBar from '@components/common/SearchBar';
import UsersList from '@components/users/UsersList';
import { useGetUsersQuery } from '@services/users';
import Pagination from '@components/common/Pagination';
import { Form } from 'react-bootstrap';

export default function UsersContent() {

    const initialPage = 0;
    const pageOffset = 8;
    const [ searchText, setSearchBar ] = useState('');
    const [ searchFilterBlockedUsers, setSearchFilterBlockedUsers ] = useState(false);
    const [ page, setPage ] = useState(initialPage);
    const paramsUsersQuery = { name: searchText, page: page + 1, page_size: pageOffset, disabled: searchFilterBlockedUsers };
    let { data, isSuccess, isFetching, refetch } = useGetUsersQuery(paramsUsersQuery);

    // En caso de querer controlar errores que vengan del servicio o excepciones
    // https://redux-toolkit.js.org/rtk-query/usage-with-typescript#error-result-example

    const setSearchBarWrapper = (searchText: React.SetStateAction<string>) => {
        setPage(initialPage);
        setSearchBar(searchText);
        refetch();
    }

    const setSearchBlockedUsersWrapper = async (filterBlockedUsersActive: boolean) => {
        setPage(initialPage);
        setSearchBar("");
        setSearchFilterBlockedUsers(filterBlockedUsersActive);
        refetch();
    }

    return (
        <div className='management-section h-100 d-flex flex-column'>
            {/* TITLE */}
            <div>
                <h1 className='management-section-title'>Usuarios</h1>
                <hr />
            </div>

            {/* CONTENT */}
            <div className='management-section-content flex-grow-1 d-flex flex-column'>
                <h2>Filtrar búsqueda</h2>
                {/* SEARCH BAR */}
                <SearchBar spinner={isFetching} setSearchBar={setSearchBarWrapper} />
                <Form.Group className='mb-3'>
                    <Form.Check id='disabled-filter' type='checkbox' label='Mostrar usuarios bloqueados' defaultChecked={ searchFilterBlockedUsers } onChange={() => { setSearchBlockedUsersWrapper(!searchFilterBlockedUsers) }} />
                </Form.Group>
                <hr className="w-75 text-align-center mx-auto mt-4 mb-1" />
                {/* USERS LIST */}
                <div className='flex-grow-1'>
                    <h2>Resultados</h2>
                    { data ? <UsersList users={data.data!.users} /> : <></> }
                </div>
                {/* PAGINATION */}
                <div className='d-flex align-items-center'>
                    { 
                        data ? 
                        <Pagination 
                            page={page}
                            setPage={setPage}
                            offset={data.data!.pagination.page_size}
                            nrows={data.data!.pagination.total_rows}/> : 
                        <></> 
                    }
                </div>
            </div>
        </div>
    )
}