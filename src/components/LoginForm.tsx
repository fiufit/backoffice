import { useAppDispatch } from '@app/hooks';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSigninMutation } from '@services/authentication';
import { setCredential } from '@state/credential';
import { Form, Button, InputGroup, Spinner, Alert } from 'react-bootstrap';
import { FaLock, FaEnvelope, FaEyeSlash, FaEye } from "react-icons/fa"
import { ErrorMessages } from 'utils/ErrorMessages';
import { ErrorCodes } from 'utils/ErrorCodes';
import { emailIsValid, passwordIsValid } from 'utils/validation';

const HOME_PAGE = "/admins";

export default function LoginForm() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [ signin, signinResult ] = useSigninMutation();
    const [ emailFeedback, setEmailFeedback ] = useState("");
    const [ passwordFeedback, setPasswordFeedback ] = useState("");
    const [ formFeedback, setFormFeedback ] = useState("");
    const [ showPassword, setShowPassword ] = useState(false);

    const checkEmailField = (field: HTMLInputElement | null): boolean => {

        if (emailIsValid(field?.value)) {
            setEmailFeedback("");
            return true;
        } else {
            setEmailFeedback(ErrorMessages.INVALID_EMAIL);
            return false
        }

    }

    const checkPasswordField = (field: HTMLInputElement | null) => {

        if (passwordIsValid(field?.value)) {
            setPasswordFeedback("");
            return true;

        } else {
            setPasswordFeedback(ErrorMessages.INVALID_PASS);
            return false
        }
    }

    const checkForm = (form: { emailField: HTMLInputElement | null; passwordField: HTMLInputElement | null; }) => {

        const { emailField, passwordField } = form;

        const isValid = [checkEmailField(emailField), checkPasswordField(passwordField)].reduce((state, current) => {
            return state && current;
        }, true);

        return isValid;
        
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

            const credential = {
                user: email!,
                accessToken: response.data.jwt,
            }
            dispatch(setCredential(credential));
            navigate(HOME_PAGE);

        } catch (err: any) {

            if (err.data.error) {

                switch (err.data.error.code) {

                    case ErrorCodes.INVALID_USER: setFormFeedback(ErrorMessages.USER_DOES_NOT_EXIST); break;
                    case ErrorCodes.INVALID_PASS: setFormFeedback(ErrorMessages.WRONG_PASS); break;
                    
                    default:
                        setFormFeedback(ErrorMessages.UNEXPECTED_ERROR);

                }
            }

        }
    }

    return (
        <>
            <h1 className='text-dark_blue--primary fs-1 text-center pb-4'>Iniciar Sesión</h1>
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
                            signinResult.isLoading ? 
                                <Spinner
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
            <Alert show={formFeedback.length > 0} onClose={() => setFormFeedback("")} variant="danger" dismissible className='mt-4'>
                {/* ERROR MESSAGE */}
                <p className='mb-0'>{formFeedback}</p>
            </Alert>
        </>
    );
};