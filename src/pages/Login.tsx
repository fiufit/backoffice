import { Form, Button } from 'react-bootstrap';

export default function Login() {

    return (
        <div id="section-login" className="jumbotron fiufit-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <h1 className="login-title">Para continuar, inicia sesión en Fiufit</h1>
                        <div id="login-form">
                            <Form>
                                <Form.Group className="mb-3" controlId="loginUsername" >
                                    <Form.Control type="text" placeholder="Dirección de correo o nombre de usuario" aria-label="Dirección de correo o nombre de usuario" aria-describedby="basic-addon1" className='fiufit-simple-input login-input' required />
                                    <Form.Control.Feedback type="invalid" className='form-input-invalid' >No existe ninguna cuenta asociada a ese nombre de usuario o correo electrónico.</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="loginPassword">
                                    <Form.Control type="password" placeholder="Contraseña" aria-label="Contraseña" aria-describedby="basic-addon2" className='fiufit-simple-input login-input' required />
                                    <Form.Control.Feedback type="invalid" className='form-input-invalid' >La contraseña ingresada no coincide con la asociada a la cuenta en cuestión.</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Check type="checkbox" label="Recordarme" className='login-checkbox-rememberme' defaultChecked />
                                </Form.Group>
                                <Button id="btn-form-login" variant="primary" type="submit" className='fiufit-button-green'>
                                    INICIAR SESIÓN
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
    
}