import { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FaLock, FaEnvelope, FaEyeSlash, FaEye } from "react-icons/fa"

export default function CreateAdminForm() {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <Form id='create-admin-form'>
            <InputGroup className="mb-3" hasValidation>
                <InputGroup.Text id="admin-email"><FaEnvelope /></InputGroup.Text>
                <Form.Control type="email" placeholder="Correo electronico" className="admin-form-input" required />
                <Form.Control.Feedback type="invalid" className='form-input-invalid' >Por favor ingrese un correo electrónico válido.</Form.Control.Feedback>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="admin-password"><FaLock /></InputGroup.Text>
                <Form.Control type={showPassword ? "text" : "password"} placeholder="Contraseña" id="admin-password" aria-label="admin-password" aria-describedby="basic-addon5" className="admin-form-input" required />
                <InputGroup.Text id="admin-password-eye" title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</InputGroup.Text>
            </InputGroup>
            <Button id="btn-form-creation" variant="primary" type="submit" className='fiufit-button-green'>
                CREAR
            </Button>
        </Form>
    );
}