import { FaSearch } from 'react-icons/fa';
import { Form, InputGroup, Spinner } from 'react-bootstrap';
import { debounce } from '@utils/utils';

interface SearchUserByIDProps {
    spinner: boolean,
    setSearchUserByID: Function,
}

export default function SearchUserByID(props: SearchUserByIDProps) {
    const debounceDelay = 750;

    const handleChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        props.setSearchUserByID(event.target.value);
    }, debounceDelay);

    return (
        <InputGroup className='mb-3'>
            <Form.Control 
                type='text'
                placeholder='ID'
                aria-label='admin-edit-search'
                className='fiufit-form-input'
                onChange={handleChange}/>
            <InputGroup.Text id='admin-search-bar-icon'>
                {
                    props.spinner ? 
                        <Spinner animation='border' role='status' size='sm'>
                            <span className='visually-hidden'>Loading...</span>
                        </Spinner> :
                    <FaSearch />
                }
            </InputGroup.Text>
        </InputGroup>
    );
}
