import { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FaLock, FaEnvelope, FaEyeSlash, FaEye } from "react-icons/fa"

export default function LoginForm() {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <h1 id="login-title" className='text-dark_blue--primary fs-1 text-center'>Inicia sesión para continuar</h1>
            <Form>
                {/* EMAIL */}
                <InputGroup className='input-group-lg mb-3' hasValidation>
                    <InputGroup.Text id="login-email"><FaEnvelope /></InputGroup.Text>
                    <Form.Control type="email" placeholder="Correo electronico" className="login-form-input" required />
                    <Form.Control.Feedback type='invalid' className='form-input-invalid'>
                        No existe ninguna cuenta asociada a ese nombre de usuario o correo electrónico.
                    </Form.Control.Feedback>
                </InputGroup>
                {/* PASSWORD */}
                <InputGroup className='input-group-lg mb-3' hasValidation>
                    <InputGroup.Text id="login-password"><FaLock /></InputGroup.Text>
                    <Form.Control type={showPassword ? "text" : "password"} placeholder="Contraseña" id="admin-password" aria-label="login-password" aria-describedby="basic-addon5" className="login-form-input" required />
                    <InputGroup.Text id="show-password-eye" title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</InputGroup.Text>
                    <Form.Control.Feedback type='invalid' className='form-input-invalid'>
                        La contraseña ingresada no coincide con la cuenta asociada en cuestión.
                    </Form.Control.Feedback>
                </InputGroup>
                {/* REMEMBER ME */}
                <Form.Group className='mb-3'>
                    <Form.Check id='rememberme' type='checkbox' label='Recuerdame' checked />
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