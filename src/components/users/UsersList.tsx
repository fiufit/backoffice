import { Accordion } from "react-bootstrap";
import UserProfile from "./UserProfile";
import ServiceResponseInfoMsg from "@components/common/ServiceResponseInfoMsg";
import { User } from "@services/users";

interface UserListProps {
    users: User[],
}

export default function UsersList(props: UserListProps) {

    const { users } = props;

    return (
        <>
            {
                users.length > 0 ?
                /* USERS LIST */
                <Accordion>
                {
                    users.map((user: User, index: number) => {

                        return (
                            <Accordion.Item key={user.ID+"-"+index} eventKey={user.ID+"-"+index}>
                                <Accordion.Header>{`${user.Nickname}`}</Accordion.Header>
                                <Accordion.Body>
                                    <UserProfile user={user} />
                                </Accordion.Body>
                            </Accordion.Item>
                        );
                    })   
                }
                </Accordion> :
                /* NO DATA AVAILABLE */
                <ServiceResponseInfoMsg message="No se han encontrado resultados."/>
            }
        </>
    );
}
