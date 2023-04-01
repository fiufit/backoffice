import { Form, Button, InputGroup } from 'react-bootstrap';

export default function LoginForm() {

    return (
        <Form>
            <InputGroup className="mb-3" hasValidation>
                <InputGroup.Text id="email">
                    <i className="bi bi-envelope"></i>
                </InputGroup.Text>
                <Form.Control type="email" placeholder="Correo electronico" className='form-input-login' />
                <Form.Control.Feedback type="invalid" className='form-input-invalid' >No existe ninguna cuenta asociada a ese nombre de usuario o correo electrónico.</Form.Control.Feedback>
            </InputGroup>

            <InputGroup className="mb-3" hasValidation>
                <InputGroup.Text id="password">
                    <i className="bi bi-lock"></i>
                </InputGroup.Text>
                <Form.Control type="password" placeholder="Contraseña" className='form-input-login' />
                <Form.Control.Feedback type="invalid" className='form-input-invalid' >La contraseña ingresada no coincide con la asociada a la cuenta en cuestión.</Form.Control.Feedback>
            </InputGroup>
            <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Recordarme" className='login-checkbox-rememberme' defaultChecked />
            </Form.Group>
            <Button id="btn-form-login" variant="primary" type="submit" className='fiufit-button-green'>
                INICIAR SESIÓN
            </Button>
        </Form>
    );
}