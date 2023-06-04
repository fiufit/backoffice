import { User } from "@services/users";
import { usePostEnableUserMutation, useDeleteDisableUserMutation } from '@services/users';
import { delay } from "@utils/utils";
import { Col, Container, Row } from "react-bootstrap";

interface UserActionsProps {
    user: User,
    handleRefresh: Function

}

export default function UserActions(props: UserActionsProps) {

    const { user, handleRefresh } = props;

    const [enable, enableResult ] = usePostEnableUserMutation();
    const [disable, disableResult ] = useDeleteDisableUserMutation();

    const handleEnable = async () => {

        try {
            
            await enable(user.ID).unwrap();
            handleRefresh();

        } catch (err: any) {

            console.log(err);

        }

    };

    const handleDisable = async () => {

        try {
            
            await disable(user.ID).unwrap();
            handleRefresh();

        } catch (err: any) {
            console.log(err);
        }

    };


    return (
        <Container>
            <Row>
                <Col className="mx-auto text-center mt-3 mb-3">
                    {  
                        (user.Disabled) ? 

                        <button type="button" className="btn button--secondary font-large" onClick={() => handleEnable()}><b>Desbloquear</b></button> :

                        <button type="button" className="btn button--secondary font-large" onClick={() => handleDisable()}><b>Bloquear</b></button>
                    }
                </Col>
            </Row>
        </Container>
    );

}