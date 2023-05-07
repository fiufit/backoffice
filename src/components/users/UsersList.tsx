import { Accordion } from "react-bootstrap";
import SyncLoader from "react-spinners/SyncLoader";
import ServiceResponseErrorMsg from "@components/common/ServiceResponseErrorMsg";
import UserProfile from "./UserProfile";
import ServiceResponseInfoMsg from "@components/common/ServiceResponseInfoMsg";
import { useEffect } from "react";

interface UserListProps {
    users: any[],
}

export default function UsersList(props: UserListProps) {
    return (
        <>
            {
                props.users.length > 0 ?
                /* USERS LIST */
                <Accordion>
                {
                    props.users.map((user) => {
                        return (
                            <Accordion.Item key={user.ID} eventKey={user.ID}>
                                <Accordion.Header>{`${user.Nickname}`}</Accordion.Header>
                                <Accordion.Body>
                                    <UserProfile />
                                </Accordion.Body>
                            </Accordion.Item>
                        );
                    })   
                }
                </Accordion> :
                /* NO DATA AVAILABLE */
                <ServiceResponseInfoMsg message="Lo sentimos, no se han encontrado datos"/>
            }
        </>
    );
}
