import Pagination from 'react-bootstrap/Pagination';
import { Accordion } from "react-bootstrap";

export default function UserEditionCards() {

    let active = 1;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
            {number}
            </Pagination.Item>,
        );
    }

    return (
        <div>
            <Accordion defaultActiveKey="1">
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Juan Perez #1</Accordion.Header>
                    <Accordion.Body>
                    Información de Juan Perez #1
                    </Accordion.Body>
                </Accordion.Item>
                            <Accordion.Item eventKey="2">
                    <Accordion.Header>Juan Perez #2</Accordion.Header>
                    <Accordion.Body>
                    Información de Juan Perez #2
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Juan Perez #3</Accordion.Header>
                    <Accordion.Body>
                    Información de Juan Perez #3
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header>Juan Perez #4</Accordion.Header>
                    <Accordion.Body>
                    Información de Juan Perez #4
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                    <Accordion.Header>Juan Perez #5</Accordion.Header>
                    <Accordion.Body>
                    Información de Juan Perez #5
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6">
                    <Accordion.Header>Juan Perez #6</Accordion.Header>
                    <Accordion.Body>
                    Información de Juan Perez #6
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="7">
                    <Accordion.Header>Juan Perez #7</Accordion.Header>
                    <Accordion.Body>
                    Información de Juan Perez #7
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="8">
                    <Accordion.Header>Juan Perez #8</Accordion.Header>
                    <Accordion.Body>
                    Información de Juan Perez #8
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="9">
                    <Accordion.Header>Juan Perez #9</Accordion.Header>
                    <Accordion.Body>
                    Información de Juan Perez #9
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="10">
                    <Accordion.Header>Juan Perez #10</Accordion.Header>
                    <Accordion.Body>
                    Información de Juan Perez #10
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div id="admin-edition-pagination">
                <Pagination>{items}</Pagination>
            </div>
        </div>
    );
}