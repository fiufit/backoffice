import { Container, Row } from "react-bootstrap";
import Brand from "@components/Brand";

export default function Footer() {

    return (
        <footer className='shadow'>
            <Container fluid>
                <Row className="bg-dark_blue--secondary px-5 py-1">
                    <div id="footer-brand">
                        <div className='text-white--primary footer-align-center'>
                            <img
                                alt=''
                                src='/logo192.png'
                                className="fiufit-brand"
                            />
                            <span className='text-white--primary ps-2 fs-4'>FIUFIT</span>
                        </div>
                    </div>
                </Row>
                <Row className="bg-dark_blue--primary px-5 pt-1">
                    <div className="d-flex d-flex d-flex justify-content-around d-flex align-items-center">
                        <h6 className="text-white--primary my-1 fw-bold">
                            Copyright © {new Date().getFullYear()} | Todos los derechos reservados.
                        </h6>
                    </div>  
                </Row>
                <Row className="bg-dark_blue--primary px-5 pb-3">
                    <div className="d-flex justify-content-center">
                        <h6 className='text-white--primary my-1'>
                            Diseñado por estudiantes de la Facultad de Ingenieria de la UBA.
                        </h6>
                    </div>
                </Row>
            </Container>
        </footer>
    )
}