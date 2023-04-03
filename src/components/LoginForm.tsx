import { Form, Button, InputGroup } from 'react-bootstrap';

export default function LoginForm() {

    return (
        <>
            <h1 className='text-dark_blue--primary fs-1 text-center'>Inicio de Sesion</h1>
            <h2 className='text-dark_grey--primary fs-5 pb-2 text-center'>Inicie sesion para continuar</h2>
            <Form>
                {/* EMAIL */}
                <InputGroup className='input-group-lg mb-3' hasValidation>
                    <InputGroup.Text id='email'>
                        <i className='bi bi-envelope'></i>
                    </InputGroup.Text>
                    <Form.Control type='email' placeholder='Correo electronico' />
                    <Form.Control.Feedback type='invalid' className='form-input-invalid'>
                        No existe ninguna cuenta asociada a ese nombre de usuario o correo electrónico.
                    </Form.Control.Feedback>
                </InputGroup>
                {/* PASSWORD */}
                <InputGroup className='input-group-lg mb-3' hasValidation>
                    <InputGroup.Text id='password'>
                        <i className='bi bi-lock'></i>
                    </InputGroup.Text>
                    <Form.Control type='password' placeholder='Contraseña' />
                    <Form.Control.Feedback type='invalid' className='form-input-invalid'>
                        La contraseña ingresada no coincide con la asociada a la cuenta en cuestión.
                    </Form.Control.Feedback>
                </InputGroup>
                {/* REMEMBER ME */}
                <Form.Group className='mb-3'>
                    <Form.Check id='rememberme' type='checkbox' label='Recuerdame' />
                </Form.Group>
                {/* SUBMIT BUTTON*/}
                <div className='d-flex justify-content-center'>
                    <Button className='button--primary button--rounded w-50 d-flex justify-content-center' type='submit'>
                        Iniciar
                    </Button>
                </div>
            </Form>
        </>
    );
};