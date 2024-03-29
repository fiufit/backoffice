import { FaSearch } from 'react-icons/fa';
import { Form, InputGroup, Spinner } from 'react-bootstrap';
import { debounce } from '@utils/utils';

interface SearchBarProps {
    spinner: boolean,
    setSearchBar: React.Dispatch<React.SetStateAction<string>>,
}

export default function SearchBar(props: SearchBarProps) {
    const debounceDelay = 750;

    const handleChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        props.setSearchBar(event.target.value);
    }, debounceDelay);

    return (
        <InputGroup className='mb-3'>
            <Form.Control 
                type='text'
                placeholder='Nombre o Usuario'
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
