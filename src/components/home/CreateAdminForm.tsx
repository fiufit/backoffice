import { useRegistrationMutation } from '@services/registration';
import { useRef, useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FaLock, FaEnvelope, FaEyeSlash, FaEye } from "react-icons/fa"

export default function CreateAdminForm() {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [ registration, registrationResult ] = useRegistrationMutation();

    const checkRegistrationResponse = (response: any) => {
        const { data, error } = response;
        return (data); true
    }


    const handleRegistrationSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const emailField = emailRef.current;
        const passwordField = passwordRef.current;
        const form = { emailField, passwordField };
        
        //if (!checkForm(form)) return;

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const request = { body: { email, password } };

        try {
            const response = await registration(request).unwrap();
            if (checkRegistrationResponse(response)) {
                const credential = {
                    user: email!,
                    accessToken: response.data.jwt,
                }
                alert("Enviado!");
            }
        } catch (err) {
            // TODO: check exactly when signin rejects the promise or not to handle the errors
            // !200 ? o 300s? o 400s? o 500s? and how can i get it from the response? err.originalStatus
            console.log(err);
        }

    }

    return (
        <Form id='create-admin-form' onSubmit={handleRegistrationSubmit}>
            <InputGroup className="mb-3" hasValidation>
                <InputGroup.Text id="admin-email"><FaEnvelope /></InputGroup.Text>
                <Form.Control ref={emailRef} type="email" placeholder="Correo electronico" className="fiufit-form-input" required />
                <Form.Control.Feedback type="invalid" className='form-input-invalid' >Por favor ingrese un correo electrónico válido.</Form.Control.Feedback>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="admin-password"><FaLock /></InputGroup.Text>
                <Form.Control ref={passwordRef} type={showPassword ? "text" : "password"} placeholder="Contraseña" id="admin-password" aria-label="admin-password" aria-describedby="basic-addon5" className="fiufit-form-input" required />
                <InputGroup.Text id="admin-password-eye" title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</InputGroup.Text>
            </InputGroup>
            <div className='d-flex justify-content-center'>
                <Button variant="primary" type="submit" className='button--primary'>
                    Crear
                </Button>
            </div>
        </Form>
    );
}