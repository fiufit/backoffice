import { useRegistrationMutation } from '@services/registration';
import { useRef, useState } from 'react';
import { Form, Button, InputGroup, Alert } from 'react-bootstrap';
import { FaLock, FaEnvelope, FaEyeSlash, FaEye } from "react-icons/fa"
import { ErrorCodes } from 'utils/ErrorCodes';
import { ErrorMessages } from 'utils/ErrorMessages';
import { SuccessMessages } from 'utils/SuccessMessages';
import { emailIsValid, passwordIsValid } from 'utils/validation';

export default function CreateAdminForm() {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [registration, registrationResult ] = useRegistrationMutation();
    const [formFeedback, setFormFeedback] = useState("");
    const [formFeedbackStyle, setFormFeedbackStyle] = useState("");
    const [ emailFeedback, setEmailFeedback ] = useState("");
    const [ passwordFeedback, setPasswordFeedback ] = useState("");

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

    const showSuccessMessage = (response: any) => {
        
        setFormFeedback(SuccessMessages.ADMIN_CREATED);
        setFormFeedbackStyle("success");

        if (emailRef.current && passwordRef.current) {

            emailRef.current.value = "";
            passwordRef.current.value = "";

        }

    }

    const handleRegistrationSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const emailField = emailRef.current;
        const passwordField = passwordRef.current;
        const form = { emailField, passwordField };
        
        if (!checkForm(form)) return;

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const request = { body: { email, password } };

        try {
            
            const response = await registration(request).unwrap();
            showSuccessMessage(response);

        } catch (err: any) {

            console.log(err);

            if (err.data.error) {

                switch(err.data.error.code) {

                    // en realidad deberia tirar EMAIL_ALREADY_EXIST para otro Code, pero esta mal. No deja crear admin duplicados eso si
                    case ErrorCodes.SOMETHING_WRONG: setFormFeedback(ErrorMessages.EMAIL_ALREADY_EXISTS); break;
                    
                    default: setFormFeedback(ErrorMessages.UNEXPECTED_ERROR); break;

                }

                setFormFeedbackStyle("danger");
            }

        }

    }

    return (
        <>
            <Form id='create-admin-form' noValidate onSubmit={handleRegistrationSubmit}>
            {/* EMAIL */}
                <InputGroup className="input-group-lg mb-3" hasValidation>
                    <InputGroup.Text id="register-email"><FaEnvelope /></InputGroup.Text>
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
                    <InputGroup.Text id="register-password"><FaLock /></InputGroup.Text>
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

                <div className='d-flex justify-content-center'>
                    <Button variant="primary" type="submit" className='button--primary'>
                        Crear
                    </Button>
                </div>
            </Form>
            <Alert show={formFeedback.length > 0} onClose={() => setFormFeedback("")} variant={formFeedbackStyle} dismissible className='mt-3'>
                <p className='mb-0'>{formFeedback}</p>
            </Alert>
        </>
    );
}