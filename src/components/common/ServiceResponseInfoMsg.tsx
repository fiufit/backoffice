import { Card } from 'react-bootstrap';

interface Props {
    message: string,
}

export default function ServiceResponseInfoMsg(props: Props) {
    const { message } = props;
    return (
        <Card className="text-center">
            <Card.Body className="d-flex flex-column justify-content-left align-items-left text-left">
                <Card.Text className="fs-5" style={{textAlign: "left"}}>
                    {message}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}