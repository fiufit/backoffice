import { useAppDispatch } from '@app/hooks';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSigninMutation } from '@services/authentication';
import { setCredential } from '@state/credential';
import { Form, Button, InputGroup, Spinner, Alert } from 'react-bootstrap';
import { FaLock, FaEnvelope, FaEyeSlash, FaEye } from "react-icons/fa"

const HOME_PAGE = "/admins";
const EMPTY_FIELD_MESSAGE = "Campo requerido.";
const INVALID_EMAIL_FIELD_MESSAGE = "Formato de correo invalido.";
const INVALID_USER_MESSAGE = "Lo sentimos, el usuario no se encuentra registrado.";
const INVALID_PASSWORD_MESSAGE = "Contrasenia invalida, intentelo nuevamente";
const INVALID_USER_CODE = "U2";
const INVALID_PASSWORD_CODE = "U4";

export default function LoginForm() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [ signin, signinStatus ] = useSigninMutation();
    const [ emailFeedback, setEmailFeedback ] = useState("");
    const [ passwordFeedback, setPasswordFeedback ] = useState("");
    const [ formFeedback, setFormFeedback ] = useState("");
    const [ showPassword, setShowPassword ] = useState(false);

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

    const checkForm = (form: { emailField: HTMLInputElement | null; passwordField: HTMLInputElement | null; }) => {
        const { emailField, passwordField } = form;
        const isValid = [checkEmailField(emailField), checkPasswordField(passwordField)].reduce((state, current) => {
            return state && current;
        }, true);
        return isValid;
    }

    const checkSigninResponse = (response: any) => {
        const { data, error } = response;
        if (data) return true;

        if (error.code === INVALID_USER_CODE) {
            setFormFeedback(INVALID_USER_MESSAGE);
        } else if (error.code === INVALID_PASSWORD_CODE) {
            setFormFeedback(INVALID_PASSWORD_MESSAGE);
        }
        return false;
    }

    const handleSigninSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const emailField = emailRef.current;
        const passwordField = passwordRef.current;
        const form = { emailField, passwordField };
        if (!checkForm(form)) return;

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const request = { body: { email, password } };
        try {
            const response = await signin(request).unwrap();
            if (checkSigninResponse(response)) {
                const credential = {
                    user: email!,
                    accessToken: response.data.jwt,
                }
                dispatch(setCredential(credential));
                navigate(HOME_PAGE);
            }
        } catch (err) {
            // TODO: check exactly when signin rejects the promise or not to handle the errors
            // !200 ? o 300s? o 400s? o 500s? and how can i get it from the response?
            console.log(err);
        }
    }

    return (
        <>
            <h1 className='text-dark_blue--primary fs-1 text-center'>Inicio de Sesion</h1>
            <h2 className='text-dark_grey--primary fs-5 pb-4 text-center'>Inicie sesion para continuar</h2>
            <Alert show={formFeedback.length > 0} onClose={() => setFormFeedback("")} variant="danger" dismissible>
                {/* ERROR MESSAGE */}
                <p className='mb-0'>{formFeedback}</p>
            </Alert>

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
                <InputGroup className="input-group-lg mb-4" hasValidation>
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
                        className="bg-white--primary border-start-0"
                        title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}
                    </InputGroup.Text>
                    <Form.Control.Feedback type='invalid' className='form-input-invalid'>
                        {passwordFeedback}
                    </Form.Control.Feedback>
                </InputGroup>

                {/* REMEMBER ME */}
                <Form.Group className='mb-3'>
                    <Form.Check id='rememberme' type='checkbox' label='Recuerdame' defaultChecked={false} />
                </Form.Group>
                
                {/* SUBMIT FORM*/}
                <div className='d-flex justify-content-center'>
                    <Button className='button--primary button--rounded w-50 d-flex align-items-center justify-content-center' type='submit'>
                        {
                            signinStatus.isLoading ? <Spinner
                                className="me-2"
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> : <></>
                        }
                        Iniciar
                    </Button>
                </div>
            </Form>
        </>
    );
};