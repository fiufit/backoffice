import { useAppDispatch, useAppSelector } from '@app/hooks';
import { useSigninMutation } from '@services/authentication';
import { selectCredential } from '@state/credential';
import { useRef, useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FaLock, FaEnvelope, FaEyeSlash, FaEye } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';

const HOME_PAGE = "/admins";
const EMPTY_FIELD_MESSAGE = "Por favor complete este campo.";
const INVALID_EMAIL_FIELD_MESSAGE = "Correo invalido.";

export default function LoginForm() {
    const [ showPassword, setShowPassword ] = useState(false);
    const [ emailFeedback, setEmailFeedback ] = useState("");
    const [ passwordFeedback, setPasswordFeedback ] = useState("");
    const [ formFeedback, setFormFeedback ] = useState("");
    const [ signin, { isLoading } ] = useSigninMutation();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const _credential = useAppSelector(selectCredential);
    const _dispatch = useAppDispatch();

    const checkEmailField = (field: HTMLInputElement | null) => {
        const isValid = field?.checkValidity();
        if (isValid) {
            setEmailFeedback("");
            return isValid;
        }

        const { valueMissing, typeMismatch } = field!.validity;
        if (valueMissing) {
            setEmailFeedback(EMPTY_FIELD_MESSAGE);
        } else if (typeMismatch) {
            setEmailFeedback(INVALID_EMAIL_FIELD_MESSAGE);
        }
        return isValid;
    }

    const checkPasswordField = (field: HTMLInputElement | null) => {
        const isValid = field?.checkValidity();
        if (isValid) {
            setPasswordFeedback("");
            return isValid;
        }

        const { valueMissing } = field!.validity;
        if (valueMissing) {
            setPasswordFeedback(EMPTY_FIELD_MESSAGE);
        }
        return isValid;
    }

    const checkClientSideForm = (form: { emailField: HTMLInputElement | null; passwordField: HTMLInputElement | null; }) => {
        const { emailField, passwordField } = form;
        const isValid = [checkEmailField(emailField), checkPasswordField(passwordField)].reduce((state, current) => {
            return state && current;
        }, true);
        return isValid;
    }

    const checkServerSideForm = () => {
        setFormFeedback("Correo o contrasenia invalida, por favor intentelo de nuevo");
    }

    const handleSigninSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const emailField = emailRef.current;
        const passwordField = passwordRef.current;
        const form = { emailField, passwordField };
        if (!checkClientSideForm(form)) return;

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const request = { body: { email, password } };
        try {
            const _response = await signin(request).unwrap();
            /* 
             * RESPONSE ROUTINE
             */
            navigate(HOME_PAGE);
        } catch (err) {
            // TODO: check exactly when signin rejects the promise or not to handle the errors
            // !200 ? o 300s? o 400s? o 500s?
            checkServerSideForm();
        }
    }

    return (
        <>
            <h1 id="login-title" className='text-dark_blue--primary fs-1 text-center'>Inicia sesión para continuar</h1>
            <Form noValidate onSubmit={handleSigninSubmit}>
                {/* EMAIL */}
                <InputGroup className="input-group-lg mb-3" hasValidation>
                    <InputGroup.Text id="login-email"><FaEnvelope /></InputGroup.Text>
                    <Form.Control 
                        ref={emailRef} 
                        type="email" 
                        placeholder="Correo electronico" 
                        className="fiufit-form-input"
                        isInvalid={emailFeedback ? true : false}
                        required />
                    <Form.Control.Feedback type='invalid' className='form-input-invalid'>
                        {emailFeedback}
                    </Form.Control.Feedback>
                </InputGroup>

                {/* PASSWORD */}
                <InputGroup className="input-group-lg mb-3" hasValidation>
                    <InputGroup.Text id="login-password"><FaLock /></InputGroup.Text>
                    <Form.Control 
                        ref={passwordRef} 
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        id="admin-password"
                        className="fiufit-form-input"
                        isInvalid={passwordFeedback ? true : false}
                        required />
                    <InputGroup.Text 
                        id="show-password-eye" 
                        title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} 
                        onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}
                    </InputGroup.Text>
                    <Form.Control.Feedback type='invalid' className='form-input-invalid'>
                        {passwordFeedback}
                    </Form.Control.Feedback>
                </InputGroup>

                {/* ERROR MESSAGE */}
                { formFeedback ? <p className='form-input-invalid'>{formFeedback}</p> : <></> }

                {/* REMEMBER ME */}
                <Form.Group className='mb-3'>
                    <Form.Check id='rememberme' type='checkbox' label='Recuerdame' defaultChecked />
                </Form.Group>
                
                {/* SUBMIT FORM*/}
                <div className='d-flex justify-content-center'>
                    <Button className='button--primary button--rounded w-50 d-flex justify-content-center' type='submit'>
                        Iniciar
                    </Button>
                </div>
            </Form>
        </>
    );
};