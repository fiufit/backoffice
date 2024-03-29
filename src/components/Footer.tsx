import { Container, Row } from "react-bootstrap";
import Brand from "@components/Brand";

export default function Footer() {

    return (
        <footer className='shadow'>
            <Container fluid>
                <Row className="bg-dark_blue--secondary px-5 py-1">
                    <div>
                        <div className='text-white--primary footer-align-center pt-2 pb-1'>
                            <Brand />
                        </div>
                    </div>
                </Row>
                <Row className="bg-dark_blue--primary px-5 pt-1 pb-3">
                    <div className="d-flex d-flex d-flex justify-content-around d-flex align-items-center">
                        <h6 className="text-white--primary my-1 fw-bold">
                            Copyright © {new Date().getFullYear()} | Todos los derechos reservados.
                        </h6>
                    </div>  
                </Row>
            </Container>
        </footer>
    )
}