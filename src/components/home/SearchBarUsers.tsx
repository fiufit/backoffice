import {FaSearch} from "react-icons/fa";
import { Form, InputGroup } from 'react-bootstrap';

export default function SearchBarUsers() {

    return (
        <Form id='edit-users-form-search'>
            <InputGroup className="mb-3">
                <Form.Control type="text" placeholder="Buscar" id="users-edit-search" aria-label="users-edit-search" className="users-form-input"/>
                <InputGroup.Text id="users-search-bar-icon" ><FaSearch /></InputGroup.Text>
            </InputGroup>
        </Form>
    );

}
