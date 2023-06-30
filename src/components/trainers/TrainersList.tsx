import { Accordion } from "react-bootstrap";
import TrainerProfile from "./TrainerProfile";
import ServiceResponseInfoMsg from "@components/common/ServiceResponseInfoMsg";
import { Certificate } from "@services/users";

interface UserListProps {
    certificates: Certificate[],
}

export default function TrainersList(props: UserListProps) {

    const { certificates } = props;

    return (
        <>
            {
                certificates.length > 0 ?

                <Accordion>
                {
                    certificates.map((certificate: Certificate, index: number) => {

                        return (
                            <Accordion.Item key={certificate.ID+"-"+index} eventKey={certificate.ID+"-"+index}>
                                <Accordion.Header>Solicitud de {`${certificate.User.Nickname}`}</Accordion.Header>
                                <Accordion.Body>
                                    <TrainerProfile certificate={certificate} />
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
