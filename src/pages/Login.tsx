import LoginForm from '@components/LoginForm';
import { Form, Button, InputGroup } from 'react-bootstrap';

export default function Login() {

    return (
        <div id="section-login" className="jumbotron fiufit-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <h1 className="login-title">Para continuar, inicia sesión en Fiufit</h1>
                        <div id="login-form">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
    
}