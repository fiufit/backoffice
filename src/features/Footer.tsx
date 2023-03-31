import { Container, Row } from "react-bootstrap";
import Brand from "@features/Brand";

export default function Footer() {

    return (
        <footer className='shadow'>
            <Container fluid>
                <Row className="pt-3 bg-dark_blue--secondary px-5 pb-3">
                    <Brand />
                </Row>
                <Row className="bg-dark_blue--primary px-5 pt-3">
                    <div className="d-flex d-flex d-flex justify-content-around d-flex align-items-center">
                        <h6 className="text-white--primary my-1 fw-bold">
                            Copyright ©{new Date().getFullYear()} | Todos los derechos reservados.
                        </h6>
                    </div>  
                </Row>
                <Row className="pb-3 bg-dark_blue--primary px-5">
                    <div className="d-flex justify-content-center">
                        <h6 className='text-white--primary my-1'>
                            Disenado por estudiantes de la Facultad de Ingenieria de la UBA
                        </h6>
                    </div>
                </Row>
            </Container>
        </footer>
    )
}