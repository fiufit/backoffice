import {FaSearch} from "react-icons/fa";
import { Form, InputGroup } from 'react-bootstrap';

export default function SearchBarAdmins() {

    return (
        <Form id='edit-admin-form-search'>
            <InputGroup className="mb-3">
                <Form.Control type="text" placeholder="Buscar" id="admin-edit-search" aria-label="admin-edit-search" className="admin-form-input"/>
                <InputGroup.Text id="admin-search-bar-icon" ><FaSearch /></InputGroup.Text>
            </InputGroup>
        </Form>
    );

}
