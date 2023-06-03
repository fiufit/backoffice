import { User } from "@services/users";
import { Col, Container, Form, Row } from "react-bootstrap";

interface UserProfileProps {
    user: User
}

function renderBlockAction(user: User) {

    if (user.Disabled) {
        return (<button type="button" className="btn button--secondary font-large"><b>Desbloquear</b></button>);
    } else {
        return (<button type="button" className="btn button--secondary font-large"><b>Bloquear</b></button>);
    }
}

export default function UserActions(props: UserProfileProps) {

    const { user } = props;

    return (
        <Container>
            <Row>
                <Col className="mx-auto text-center mt-3 mb-3">
                    { renderBlockAction(user) }
                </Col>
            </Row>
        </Container>
    );

}